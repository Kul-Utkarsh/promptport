// Service Worker for PromptPort

// Open side panel when the toolbar icon is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting panel behavior:", error));

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
    const tabId = sender.tab?.id;
    if (tabId && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.sidePanel.open({ tabId }).catch((err) => console.log("sidePanel.open error:", err));
    }
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
