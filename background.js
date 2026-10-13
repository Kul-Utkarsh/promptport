// Service Worker for PromptPort

// Open side panel when the toolbar icon is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting panel behavior:", error));

let isSidePanelOpen = false;

// Track open side panel port for robust auto-hide/show of on-page floating button
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "side_panel") {
    isSidePanelOpen = true;
    // Notify all tabs that side panel opened
    broadcastToAllTabs({ type: "SIDE_PANEL_STATE", open: true });

    port.onDisconnect.addListener(() => {
      isSidePanelOpen = false;
      // Notify all tabs that side panel closed
      broadcastToAllTabs({ type: "SIDE_PANEL_STATE", open: false });
    });
  }
});

function broadcastToAllTabs(msg) {
  chrome.tabs.query({}).then((tabs) => {
    for (const t of tabs) {
      if (t.id) {
        chrome.tabs.sendMessage(t.id, msg).catch(() => {});
      }
    }
  }).catch(() => {});
}

// Listen for messages from content script or side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHAT_CAPTURED") {
    handleChatCaptured(message.payload, sender.tab)
      .then((res) => sendResponse({ success: true, ...res }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // Keep message channel open for async response
  }

  if (message.type === "INJECT_CONTEXT") {
    handleInjectContext(message.tabId, message.text)
      .then((res) => sendResponse({ success: true, ...res }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === "OPEN_SIDE_PANEL") {
    const windowId = sender.tab?.windowId;
    const tabId = sender.tab?.id;
    if (chrome.sidePanel && chrome.sidePanel.open) {
      if (windowId) {
        chrome.sidePanel.open({ windowId }).catch((err) => {
          console.warn("[PromptPort] sidePanel.open({ windowId }) failed, trying tabId:", err);
          if (tabId) {
            chrome.sidePanel.open({ tabId }).catch((err2) => {
              console.error("[PromptPort] sidePanel.open({ tabId }) failed:", err2);
            });
          }
        });
      } else if (tabId) {
        chrome.sidePanel.open({ tabId }).catch((err) => {
          console.error("[PromptPort] sidePanel.open({ tabId }) failed:", err);
        });
      }
    }
    sendResponse({ success: true });
    return true;
  }

  if (message.type === "GET_SIDE_PANEL_STATE") {
    sendResponse({ open: isSidePanelOpen });
    return true;
  }

  if (message.type === "SIDE_PANEL_STATE") {
    isSidePanelOpen = message.open === true;
    broadcastToAllTabs(message);
    sendResponse({ success: true });
    return true;
  }
});

// Save or update chat session in chrome.storage.local
async function handleChatCaptured(payload, tab) {
  const { site, url, title, messages } = payload;
  if (!messages || messages.length === 0) {
    return { skipped: true, reason: "No messages" };
  }

  const { chatSessions = {} } = await chrome.storage.local.get("chatSessions");
  
  // Use a unique session ID based on site and url/tab
  const sessionId = `${site}__${encodeURIComponent(url.split("?")[0])}`;
  
  const existing = chatSessions[sessionId] || {
    id: sessionId,
    created: Date.now(),
    isFavorite: false,
    customTitle: null
  };

  const updatedSession = {
    ...existing,
    site,
    url,
    title: existing.customTitle || title || `${site} Chat`,
    messages,
    messageCount: messages.length,
    updated: Date.now()
  };

  chatSessions[sessionId] = updatedSession;
  await chrome.storage.local.set({ chatSessions });

  // Notify side panel if it's currently open
  chrome.runtime.sendMessage({
    type: "SESSION_UPDATED",
    sessionId,
    session: updatedSession
  }).catch(() => {
    // Ignore error if side panel is closed
  });

  return { sessionId, messageCount: messages.length };
}

// Injects imported text into active AI chat input
async function handleInjectContext(tabId, text) {
  let targetTabId = tabId;
  if (!targetTabId) {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!activeTab) throw new Error("No active tab found");
    targetTabId = activeTab.id;
  }

  const results = await chrome.tabs.sendMessage(targetTabId, {
    type: "PASTE_INTO_INPUT",
    text
  });
  return results;
}
