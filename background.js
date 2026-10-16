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

function getMessageKey(msg) {
  const role = msg.role || "user";
  const text = (msg.text || "").replace(/\s+/g, " ").trim();
  const attach = (msg.attachments || []).map(a => a.name || a.url || "").join(",");
  return `${role}:::${text}:::${attach}`;
}

function isContiguousSubarray(mainArr, subArr) {
  if (!subArr || subArr.length === 0) return true;
  if (!mainArr || subArr.length > mainArr.length) return false;
  for (let i = 0; i <= mainArr.length - subArr.length; i++) {
    let match = true;
    for (let j = 0; j < subArr.length; j++) {
      if (mainArr[i + j] !== subArr[j]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return false;
}

function mergeMessageLists(listA, listB) {
  if (!listA || listA.length === 0) return listB ? [...listB] : [];
  if (!listB || listB.length === 0) return listA ? [...listA] : [];

  const keysA = listA.map(getMessageKey);
  const keysB = listB.map(getMessageKey);

  if (keysA.length === keysB.length && keysA.every((k, i) => k === keysB[i])) {
    return listA;
  }

  if (isContiguousSubarray(keysA, keysB)) return listA;
  if (isContiguousSubarray(keysB, keysA)) return listB;

  const maxEndOverlap = Math.min(keysA.length, keysB.length);
  for (let k = maxEndOverlap; k >= 1; k--) {
    let match = true;
    for (let i = 0; i < k; i++) {
      if (keysA[keysA.length - k + i] !== keysB[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return [...listA, ...listB.slice(k)];
    }
  }

  const maxStartOverlap = Math.min(keysA.length, keysB.length);
  for (let k = maxStartOverlap; k >= 1; k--) {
    let match = true;
    for (let i = 0; i < k; i++) {
      if (keysB[keysB.length - k + i] !== keysA[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return [...listB.slice(0, listB.length - k), ...listA];
    }
  }

  let bestOverlapA = -1;
  let bestOverlapB = -1;
  for (let i = 0; i < keysA.length; i++) {
    const idxInB = keysB.indexOf(keysA[i]);
    if (idxInB !== -1) {
      bestOverlapA = i;
      bestOverlapB = idxInB;
      break;
    }
  }

  if (bestOverlapA !== -1) {
    const prefixA = listA.slice(0, bestOverlapA);
    const prefixB = listB.slice(0, bestOverlapB);
    const combinedPrefix = prefixB.length >= prefixA.length ? prefixB : prefixA;

    const suffixA = listA.slice(bestOverlapA);
    const suffixB = listB.slice(bestOverlapB);
    const mergedSuffix = mergeMessageLists(suffixA, suffixB);
    return [...combinedPrefix, ...mergedSuffix];
  }

  return [...listA, ...listB];
}

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
    customTitle: null,
    messages: []
  };

  const mergedMessages = mergeMessageLists(existing.messages || [], messages || []);

  const updatedSession = {
    ...existing,
    site,
    url,
    title: existing.customTitle || title || `${site} Chat`,
    messages: mergedMessages,
    messageCount: mergedMessages.length,
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

  return { sessionId, messageCount: mergedMessages.length };
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
