// Content Script for PromptPort
// Detects AI chat website, extracts conversations, and supports context injection

(function () {
  console.log("[PromptPort] Content script initialized on:", location.hostname);

  // Identify current site
  function detectSite() {
    const host = location.hostname.toLowerCase();
    if (host.includes("openai.com") || host.includes("chatgpt.com")) return "ChatGPT";
    if (host.includes("gemini.google.com")) return "Gemini";
    if (host.includes("claude.ai")) return "Claude";
    if (host.includes("kimi.moonshot.cn") || host.includes("kimi.ai")) return "Kimi";
    if (host.includes("grok.com") || host.includes("x.com") || host.includes("twitter.com")) return "Grok";
    if (host.includes("deepseek.com")) return "DeepSeek";
    if (host.includes("z.ai") || host.includes("chatglm.cn") || host.includes("zhipu") || host.includes("bigmodel.cn")) return "Z-AI";
    return "GenericAI";
  }

  // Broadcast current platform to side panel
  function broadcastPlatform() {
    const site = detectSite();
    chrome.runtime.sendMessage({ type: "PLATFORM_UPDATE", payload: { site } });
  }
  // Listen for navigation changes (SPA)
  window.addEventListener('popstate', broadcastPlatform);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') broadcastPlatform();
  });
  // Hook history API
  ['pushState', 'replaceState'].forEach(fn => {
    const orig = history[fn];
    history[fn] = function () {
      orig.apply(this, arguments);
      broadcastPlatform();
    };
  });
  // Respond to explicit GET_PLATFORM requests
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_PLATFORM") {
      sendResponse({ site: detectSite() });
      return true;
    }
  });
  const currentSite = detectSite();

  // Helper to extract uploaded files, images, documents, and code artifacts from message containers
  function extractAttachments(element) {
    if (!element) return [];
    const attachments = [];

    try {
      // 1. Images (user uploaded images or assistant generated images)
      const imgs = element.querySelectorAll("img");
      imgs.forEach((img) => {
        const src = img.getAttribute("src") || "";
        const alt = img.getAttribute("alt") || "";
        // Filter out small avatars, icons, emojis, badges
        if (
          !src ||
          src.startsWith("data:image/svg") ||
          img.width < 32 ||
          img.height < 32 ||
          img.closest(".avatar, [data-testid*='avatar'], .icon, nav, button")
        ) {
          return;
        }

        // Avoid duplicate src entries
        if (!attachments.some(a => a.url === src)) {
          attachments.push({
            type: "image",
            name: alt || "Uploaded Image",
            url: src,
            thumbnailUrl: src
          });
        }
      });

      // 2. Documents & Uploaded File Pills / Chips
      // Targets: ChatGPT file cards, Claude document pills/artifacts, Gemini attachment chips, DeepSeek/Z-AI file items
      const filePills = element.querySelectorAll(
        "[data-testid*='attachment'], .file-attachment, [class*='file-card'], [class*='attachment-chip'], [class*='upload-file'], [class*='file-item'], a[download], [class*='fileItem']"
      );
      filePills.forEach((pill) => {
        const nameEl = pill.querySelector("[class*='name'], [class*='title'], span, strong") || pill;
        const nameText = nameEl.innerText.trim();
        const sizeEl = pill.querySelector("[class*='size'], [class*='meta']");
        const sizeText = sizeEl ? sizeEl.innerText.trim() : "";
        const link = pill.getAttribute("href") || pill.querySelector("a")?.getAttribute("href") || "";

        if (nameText && nameText.length > 2 && !attachments.some(a => a.name === nameText)) {
          const ext = nameText.split(".").pop().toLowerCase();
          const isDoc = ["pdf", "txt", "csv", "json", "docx", "xlsx", "py", "js", "html", "md"].includes(ext);
          attachments.push({
            type: isDoc ? "doc" : "file",
            name: nameText,
            url: link || undefined,
            fileType: ext || "file",
            size: sizeText || undefined
          });
        }
      });
    } catch (err) {
      console.warn("[PromptPort] Error extracting attachments:", err);
    }

    return attachments;
  }

  // Scrapers for each platform
  const scrapers = {
    ChatGPT: function () {
      const msgs = [];
      // Modern ChatGPT uses data-message-author-role, article, or conversation-turn containers
      // Also handles direct .prose or user/assistant message bubbles
      const turns = document.querySelectorAll(
        "[data-message-author-role], article, [data-testid^='conversation-turn'], [data-testid*='turn-'], .conversation-turn"
      );

      if (turns.length > 0) {
        turns.forEach((turn) => {
          let role = turn.getAttribute("data-message-author-role");
          if (!role) {
            const innerRoleEl = turn.querySelector("[data-message-author-role]");
            if (innerRoleEl) {
              role = innerRoleEl.getAttribute("data-message-author-role");
            } else if (turn.querySelector("[data-message-author-role='user']") || turn.innerHTML.includes('data-message-author-role="user"')) {
              role = "user";
            } else if (turn.querySelector("[data-message-author-role='assistant']") || turn.innerHTML.includes('data-message-author-role="assistant"')) {
              role = "assistant";
            } else if (turn.querySelector(".whitespace-pre-wrap") && !turn.querySelector(".markdown")) {
              role = "user";
            } else {
              const textSample = turn.innerText || "";
              role = textSample.includes("You said:") ? "user" : "assistant";
            }
          }

          // In ChatGPT, assistant messages typically live in .markdown, user messages in .whitespace-pre-wrap
          const textEl = turn.querySelector(".markdown, .whitespace-pre-wrap, [data-message-id], .prose") || turn;
          const attachments = extractAttachments(turn);
          const clone = textEl.cloneNode(true);
          // Strip out action buttons, copy icons, audio buttons, edit prompts
          clone.querySelectorAll("button, svg, .sr-only, [aria-label='Copy'], [aria-label='Edit']").forEach(b => b.remove());
          let text = clone.innerText.trim();
          if (text.startsWith("You said:")) {
            text = text.replace(/^You said:\s*/i, "").trim();
          }
          if ((text && text.length > 0) || attachments.length > 0) {
            msgs.push({ role: role || "assistant", text: text || "[Attached media]", attachments, ts: Date.now() });
          }
        });

        if (msgs.length > 0) return msgs;
      }

      // ChatGPT Fallback: Query all role nodes directly
      const directRoleNodes = document.querySelectorAll("[data-message-author-role]");
      directRoleNodes.forEach((node) => {
        const role = node.getAttribute("data-message-author-role") || "assistant";
        const attachments = extractAttachments(node);
        const clone = node.cloneNode(true);
        clone.querySelectorAll("button, svg, .sr-only").forEach(b => b.remove());
        const text = clone.innerText.trim();
        if (text || attachments.length > 0) {
          msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
        }
      });

      return msgs;
    },

    Gemini: function () {
      const msgs = [];
      // Google Gemini structures
      const turns = document.querySelectorAll("user-query, model-response, .user-query-container, .response-container, [data-test-id='user-query'], [data-test-id='model-response-text']");
      if (turns.length > 0) {
        turns.forEach((turn) => {
          const isUser = turn.matches("user-query, .user-query-container, [data-test-id='user-query']") ||
            turn.querySelector(".user-query, [data-test-id='user-query']");
          const role = isUser ? "user" : "assistant";

          const textEl = turn.querySelector(".model-response-text, message-content, .markdown, .query-text") || turn;
          const attachments = extractAttachments(turn);
          const clone = textEl.cloneNode(true);
          clone.querySelectorAll("button, mat-icon, .mat-mdc-button, .response-action-bar").forEach(b => b.remove());
          const text = clone.innerText.trim();
          if ((text && text.length > 1) || attachments.length > 0) {
            msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
          }
        });
        return msgs;
      }

      // Fallback: look for query content & markdown blocks
      document.querySelectorAll(".query-content, .response-content, .markdown").forEach((node) => {
        const isUser = node.classList.contains("query-content") || node.closest(".user-query-container");
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(node);
        const text = node.innerText.trim();
        if ((text && text.length > 1) || attachments.length > 0) {
          msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
        }
      });

      return msgs;
    },

    Claude: function () {
      const msgs = [];
      // Claude message containers
      const messageContainers = document.querySelectorAll("[data-testid='user-message'], .font-user-message, [data-is-streaming]");
      if (messageContainers.length > 0) {
        messageContainers.forEach((el) => {
          const isUser = el.matches("[data-testid='user-message'], .font-user-message") || el.closest("[data-testid='user-message']");
          const role = isUser ? "user" : "assistant";
          const attachments = extractAttachments(el);
          const text = el.innerText.trim();
          if (text || attachments.length > 0) msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
        });
        return msgs;
      }

      // Alternative selector
      document.querySelectorAll(".group.relative").forEach((el) => {
        const isUser = el.querySelector("[data-testid='user-message']") !== null;
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(el);
        const text = el.innerText.trim();
        if (text || attachments.length > 0) msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
      });

      return msgs;
    },

    DeepSeek: function () {
      const msgs = [];
      // DeepSeek message items
      const items = document.querySelectorAll(".chat-message, [class*='message'], [class*='chatItem']");
      items.forEach((item) => {
        const isUser = item.classList.value.includes("user") || item.querySelector("[class*='user']");
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(item);
        const text = item.innerText.trim();
        if (text || attachments.length > 0) msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
      });
      return msgs;
    },

    Kimi: function () {
      const msgs = [];
      document.querySelectorAll("[class*='chatMessage'], [class*='messageItem']").forEach((el) => {
        const isUser = el.classList.value.includes("user") || el.querySelector("[class*='user']");
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(el);
        const text = el.innerText.trim();
        if (text || attachments.length > 0) msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
      });
      return msgs;
    },

    Grok: function () {
      const msgs = [];
      document.querySelectorAll("[data-testid*='message'], [class*='message-bubble']").forEach((el) => {
        const isUser = el.classList.value.includes("user");
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(el);
        const text = el.innerText.trim();
        if (text || attachments.length > 0) msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
      });
      return msgs;
    },

    // Z-AI (z.ai, chatglm.cn, bigmodel.cn) scraper
    "Z-AI": function () {
      const msgs = [];
      const candidateSelectors = [
        ".chat-item",
        ".message-item",
        ".conversation-item",
        "[class*='chat-item']",
        "[class*='messageItem']",
        "[class*='chat_item']",
        "[class*='message_item']",
        ".msg-item",
        ".bubble-container",
        "[data-role]",
        "[class*='question-answer']"
      ];

      const turns = document.querySelectorAll(candidateSelectors.join(","));
      if (turns.length > 0) {
        turns.forEach((turn) => {
          const roleAttr = turn.getAttribute("data-role") || turn.getAttribute("data-message-author-role");
          const classStr = (turn.className || "").toString().toLowerCase();
          const isUser = roleAttr === "user" ||
            classStr.includes("user") ||
            classStr.includes("question") ||
            turn.querySelector("[class*='user']") !== null ||
            turn.querySelector(".bubble-user") !== null ||
            turn.innerText.trim().startsWith("You:");

          const role = isUser ? "user" : "assistant";
          const attachments = extractAttachments(turn);
          const clone = turn.cloneNode(true);
          clone.querySelectorAll("button, svg, .sr-only, .tools, .actions, [class*='action']").forEach(b => b.remove());
          const text = clone.innerText.trim();
          if ((text && text.length > 0) || attachments.length > 0) {
            msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
          }
        });
        if (msgs.length > 0) return msgs;
      }

      // Secondary Z-AI pattern: Markdown / bubble elements
      const bubbles = document.querySelectorAll(".markdown, .bubble, [class*='bubble'], [class*='content']");
      bubbles.forEach((b) => {
        const classStr = (b.className || "").toString().toLowerCase();
        const parentClass = (b.parentElement ? b.parentElement.className : "").toString().toLowerCase();
        if (classStr.includes("button") || classStr.includes("input") || classStr.includes("header")) return;

        const isUser = classStr.includes("user") || parentClass.includes("user");
        const role = isUser ? "user" : "assistant";
        const attachments = extractAttachments(b);
        const clone = b.cloneNode(true);
        clone.querySelectorAll("button, svg, .sr-only").forEach(el => el.remove());
        const text = clone.innerText.trim();
        if ((text && text.length > 1) || attachments.length > 0) {
          msgs.push({ role, text: text || "[Attached media]", attachments, ts: Date.now() });
        }
      });

      return msgs;
    },

    GenericAI: function () {
      return [];
    }
  };

  // Generic fallback if site-specific scraper yields nothing
  function genericFallbackScraper() {
    const msgs = [];
    
    // 1. Standard role attributes
    const roleNodes = document.querySelectorAll("[data-message-author-role], [data-role]");
    if (roleNodes.length > 0) {
      roleNodes.forEach((node) => {
        const role = node.getAttribute("data-message-author-role") || node.getAttribute("data-role") || "assistant";
        const clone = node.cloneNode(true);
        clone.querySelectorAll("button, svg, .sr-only").forEach(b => b.remove());
        const text = clone.innerText.trim();
        if (text && text.length > 0) msgs.push({ role, text, ts: Date.now() });
      });
      if (msgs.length > 0) return msgs;
    }

    // 2. Class-based message bubbles across generic AI websites
    const msgNodes = document.querySelectorAll(
      ".chat-message, .message, .chat-item, [class*='chatMessage'], [class*='message-bubble'], [class*='messageBubble'], [class*='messageItem'], .prose, [class*='turn-'], [class*='dialog-']"
    );
    if (msgNodes.length > 0) {
      msgNodes.forEach((node) => {
        const classStr = (node.className || "").toString().toLowerCase();
        const isUser = classStr.includes("user") ||
          classStr.includes("human") ||
          classStr.includes("question") ||
          node.querySelector("[class*='user']") !== null;
        const role = isUser ? "user" : "assistant";
        const clone = node.cloneNode(true);
        clone.querySelectorAll("button, svg, .sr-only, [class*='action']").forEach(b => b.remove());
        const text = clone.innerText.trim();
        if (text && text.length > 0) {
          msgs.push({ role, text, ts: Date.now() });
        }
      });
      if (msgs.length > 0) return msgs;
    }

    // 3. Fallback: Scan main / article container for alternating text blocks
    const mainContainer = document.querySelector("main, #main, [role='main'], .chat-container, #chat-container");
    if (mainContainer) {
      const candidates = mainContainer.querySelectorAll("p, .whitespace-pre-wrap, .markdown");
      candidates.forEach((el) => {
        const txt = el.innerText.trim();
        if (txt.length > 5 && !el.closest("button, nav, header, footer")) {
          const isUser = el.closest("[class*='user']") !== null;
          msgs.push({ role: isUser ? "user" : "assistant", text: txt, ts: Date.now() });
        }
      });
    }

    return msgs;
  }

  function extractAllMessages() {
    let messages = [];
    // Try site-specific scraper
    const scraperFn = scrapers[currentSite];
    if (scraperFn) {
      try {
        messages = scraperFn();
        console.log(`[PromptPort] Scraper for ${currentSite} retrieved ${messages ? messages.length : 0} messages`);
      } catch (err) {
        console.warn(`[PromptPort] Scraper for ${currentSite} encountered error:`, err);
      }
    }

    // Fall back to generic scraper if 0 messages
    if (!messages || messages.length === 0) {
      console.log("[PromptPort] Site scraper found 0 messages. Running genericFallbackScraper...");
      messages = genericFallbackScraper();
      console.log(`[PromptPort] genericFallbackScraper retrieved ${messages ? messages.length : 0} messages`);
    }

    // Deduplicate consecutive identical messages if any
    const clean = [];
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (clean.length > 0 && clean[clean.length - 1].text === m.text) {
        continue;
      }
      clean.push(m);
    }
    return coalesceMessages(clean);
  }

  function coalesceMessages(rawMsgs) {
    if (!Array.isArray(rawMsgs)) return [];
    const consolidated = [];
    for (const msg of rawMsgs) {
      if (!msg) continue;
      const trimmedText = (msg.text || "").trim();
      const hasAttachments = msg.attachments && msg.attachments.length > 0;
      if (!trimmedText && !hasAttachments) continue;

      const last = consolidated[consolidated.length - 1];
      if (last && last.role === msg.role) {
        if (trimmedText && trimmedText !== "[Attached media]") {
          last.text = last.text ? `${last.text}\n\n${trimmedText}` : trimmedText;
        }
        if (hasAttachments) {
          last.attachments = [...(last.attachments || []), ...msg.attachments];
        }
      } else {
        consolidated.push({
          role: msg.role || "assistant",
          text: trimmedText || (hasAttachments ? "[Attached media]" : ""),
          attachments: [...(msg.attachments || [])]
        });
      }
    }
    return consolidated;
  }

  // Send updates to background worker
  let lastMessageCount = 0;
  let debounceTimeout = null;

  async function syncMessages() {
    const messages = extractAllMessages();
    if (messages.length === 0) return { count: 0, site: currentSite };

    lastMessageCount = messages.length;
    console.log(`[PromptPort] Captured ${messages.length} messages from ${currentSite}`);

    const chatTitle = document.title || `${currentSite} Chat`;
    const payload = {
      site: currentSite,
      url: location.href,
      title: chatTitle,
      messages: messages
    };

    // Save directly into chrome.storage.local for instantaneous availability
    try {
      const { chatSessions = {} } = await chrome.storage.local.get("chatSessions");
      const sessionId = `${currentSite}__${encodeURIComponent(location.href.split("?")[0])}`;
      const existing = chatSessions[sessionId] || {
        id: sessionId,
        created: Date.now(),
        isFavorite: false,
        customTitle: null
      };
      const updatedSession = {
        ...existing,
        site: currentSite,
        url: location.href,
        title: existing.customTitle || chatTitle,
        messages: messages,
        messageCount: messages.length,
        updated: Date.now()
      };
      chatSessions[sessionId] = updatedSession;
      await chrome.storage.local.set({ chatSessions });

      // Notify any listening components
      chrome.runtime.sendMessage({
        type: "SESSION_UPDATED",
        sessionId,
        session: updatedSession
      }).catch(() => {});
    } catch (storageErr) {
      console.warn("[PromptPort] Direct storage save error, sending to background:", storageErr);
      chrome.runtime.sendMessage({
        type: "CHAT_CAPTURED",
        payload: payload
      }).catch(() => {});
    }

    return { count: messages.length, site: currentSite, title: chatTitle };
  }

  function scheduleSync() {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(syncMessages, 1500);
  }

  // Observer to track dynamic additions in conversation
  const observer = new MutationObserver(() => {
    scheduleSync();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initial sync attempt
  setTimeout(syncMessages, 2500);

  // Listen for paste request from side panel
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "PASTE_INTO_INPUT") {
      const success = injectTextIntoChatInput(req.text);
      sendResponse({ success });
      return true;
    }
    if (req.type === "FORCE_SYNC") {
      syncMessages().then((res) => {
        sendResponse({ success: true, count: typeof res === "object" ? res.count : res, site: currentSite });
      }).catch((err) => {
        sendResponse({ success: false, error: err.message });
      });
      return true;
    }
  });

  // Inject text into various AI chat input boxes
  function injectTextIntoChatInput(text) {
    const selectors = [
      // ChatGPT
      "#prompt-textarea",
      "textarea[data-id='root']",
      // Claude
      "div[contenteditable='true'].ProseMirror",
      "div.ProseMirror",
      // Gemini
      ".ql-editor",
      "rich-textarea textarea",
      "rich-textarea [contenteditable='true']",
      // DeepSeek
      "textarea[placeholder*='DeepSeek']",
      "textarea",
      // General fallbacks
      "[contenteditable='true']",
      "input[type='text']"
    ];

    let targetInput = null;
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) { // Check if visible
        targetInput = el;
        break;
      }
    }

    if (!targetInput) {
      console.warn("[PromptPort] Chat input field not found automatically. Copying context to clipboard.");
      navigator.clipboard.writeText(text);
      const captureText = document.querySelector("#ai-bridge-tray-widget #ai-bridge-capture-text");
      if (captureText) {
        captureText.textContent = "📋 Copied (paste manually)";
        setTimeout(() => { captureText.textContent = "Capture Conversation"; }, 2500);
      }
      return false;
    }

    targetInput.focus();

    if (targetInput.isContentEditable) {
      // For rich-text editable div (Claude, Gemini)
      targetInput.innerText = text;
      targetInput.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true }));
    } else {
      // For textareas / inputs (ChatGPT, DeepSeek)
      targetInput.value = text;
      targetInput.dispatchEvent(new Event("input", { bubbles: true }));
      targetInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Smooth scroll to input
    targetInput.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  // ==========================================
  // FLOATING CHATBOX TRAY BUTTON & QUICK POPUP
  // ==========================================

  let capturedMessageCount = 0;
  let trayWidgetContainer = null;

  function findChatInputContainer() {
    // Look for form or container wrapping chat input
    const inputSelectors = [
      "#prompt-textarea",
      "textarea[data-id='root']",
      "div[contenteditable='true'].ProseMirror",
      "div.ProseMirror",
      ".ql-editor",
      "rich-textarea textarea",
      "rich-textarea [contenteditable='true']",
      "textarea[placeholder*='DeepSeek']",
      "textarea"
    ];

    for (const sel of inputSelectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) {
        // Return parent form, action bar, or container
        const container = el.closest("form") ||
          el.closest("[class*='input-container']") ||
          el.closest("[class*='chat-input']") ||
          el.closest("[class*='composer']") ||
          el.parentElement;
        if (container) return { inputEl: el, container };
      }
    }
    return null;
  }

  async function injectTrayWidget() {
    if (document.getElementById("ai-bridge-tray-widget")) return;

    let showFloatingBtn = true;
    let fabPosition = "right";
    try {
      const data = await chrome.storage.local.get(["showFloatingBtn", "fabPosition"]);
      if (data.showFloatingBtn !== undefined) showFloatingBtn = data.showFloatingBtn;
      if (data.fabPosition) fabPosition = data.fabPosition;
      if (!showFloatingBtn) return;
    } catch (e) {}

    const found = findChatInputContainer();
    if (!found) return;

    const widget = document.createElement("div");
    widget.id = "ai-bridge-tray-widget";
    const isLeft = fabPosition === "left" || fabPosition === "bottom-left";
    widget.className = isLeft ? "pos-left" : "pos-right";
    widget.innerHTML = `
      <style>
        #ai-bridge-tray-widget {
          position: fixed;
          bottom: 24px;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          user-select: none;
        }
        #ai-bridge-tray-widget.pos-left {
          left: 24px;
          right: auto;
        }
        #ai-bridge-tray-widget.pos-right {
          right: 24px;
          left: auto;
        }
        #ai-bridge-tray-widget.pos-left .ai-bridge-popup {
          left: 0;
          right: auto;
        }
        #ai-bridge-tray-widget.pos-right .ai-bridge-popup {
          right: 0;
          left: auto;
        }
        .ai-bridge-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #373634;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(55, 54, 52, 0.35);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1.5px solid rgba(220, 235, 125, 0.4);
          position: relative;
        }
        .ai-bridge-circle-btn:hover {
          background: #232220;
          transform: scale(1.08);
          border-color: #DCEB7D;
          box-shadow: 0 6px 16px rgba(55, 54, 52, 0.45);
        }
        .ai-bridge-circle-btn.recapture {
          background: #373634;
          border-color: #DCEB7D;
          box-shadow: 0 4px 12px rgba(220, 235, 125, 0.35);
        }
        .ai-bridge-circle-btn.recapture:hover {
          background: #232220;
        }
        .ai-bridge-badge-count {
          position: absolute;
          top: -4px;
          right: -6px;
          background: #ef4444;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 10px;
          border: 1.5px solid #ffffff;
          display: none;
        }
        .ai-bridge-badge-count.show {
          display: inline-block;
        }
        .ai-bridge-popup {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: #ffffff;
          color: #1f2937;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          display: none;
          flex-direction: column;
          gap: 6px;
        }
        .ai-bridge-popup.open {
          display: flex;
        }
        .ai-bridge-popup-header {
          font-size: 11px;
          font-weight: 700;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ai-bridge-popup-header span.badge {
          background: #eff6ff;
          color: #2563eb;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
        }
        .ai-bridge-action-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          font-weight: 500;
          transition: all 0.15s ease;
        }
        .ai-bridge-action-item:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #1d4ed8;
        }
        .ai-bridge-action-item.success {
          background: #ecfdf5;
          color: #059669;
          border-color: #a7f3d0;
        }
      </style>
      <div id="ai-bridge-main-btn" class="ai-bridge-circle-btn" title="PromptPort (Click for Quick Actions)">
        <span id="ai-bridge-btn-icon" style="display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.21866 6.78133C8.17733 5.74032 6.48933 5.74032 5.448 6.78133L2.78133 9.448C2.08811 10.1175 1.8101 11.109 2.05414 12.0414C2.29818 12.9737 3.0263 13.7018 3.95864 13.9459C4.89099 14.1899 5.88247 13.9119 6.552 13.2187L7.28666 12.4847M6.78133 9.21867C7.82266 10.2597 9.51067 10.2597 10.552 9.21867L13.2187 6.552C14.2293 5.50566 14.2148 3.84244 13.1862 2.81382C12.1576 1.78519 10.4943 1.77074 9.448 2.78133L8.71466 3.51467" stroke="#DCEB7D" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span id="ai-bridge-new-badge" class="ai-bridge-badge-count">0</span>
      </div>
      <div id="ai-bridge-popup-menu" class="ai-bridge-popup">
        <div class="ai-bridge-popup-header">
          <span>PromptPort</span>
          <span class="badge" id="ai-bridge-site-badge">${escapeHtml(currentSite)}</span>
        </div>
        <div id="ai-bridge-action-capture" class="ai-bridge-action-item">
          <span id="ai-bridge-capture-icon">📸</span>
          <span id="ai-bridge-capture-text">Capture Conversation</span>
        </div>
        <div id="ai-bridge-action-panel" class="ai-bridge-action-item">
          <span>📂</span>
          <span>Open PromptPort Side Panel</span>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
    trayWidgetContainer = widget;

    const mainBtn = widget.querySelector("#ai-bridge-main-btn");
    const popup = widget.querySelector("#ai-bridge-popup-menu");
    const captureItem = widget.querySelector("#ai-bridge-action-capture");
    const panelItem = widget.querySelector("#ai-bridge-action-panel");

    // Toggle menu
    mainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!widget.contains(e.target)) {
        popup.classList.remove("open");
      }
    });

    // Action: Capture / Re-Capture
    captureItem.addEventListener("click", async () => {
      const captureText = widget.querySelector("#ai-bridge-capture-text");
      captureText.textContent = "Capturing...";
      
      const res = await syncMessages();
      const count = res ? res.count : 0;
      capturedMessageCount = count;

      if (count > 0) {
        captureText.textContent = `✅ Saved ${count} msgs!`;
        captureItem.classList.add("success");
        updateButtonToRecaptureState(count);

        setTimeout(() => {
          captureText.textContent = `🔄 Re-capture (${count} saved)`;
          captureItem.classList.remove("success");
          popup.classList.remove("open");
        }, 1500);
      } else {
        captureText.textContent = "⚠️ Found 0 msgs";
        setTimeout(() => {
          captureText.textContent = "Capture Conversation";
        }, 2000);
      }
    });

    // Action: Open Side Panel
    panelItem.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "OPEN_SIDE_PANEL" });
      popup.classList.remove("open");
    });

    // Listen for live position & visibility changes
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local") {
        const el = document.getElementById("ai-bridge-tray-widget");
        if (changes.fabPosition && el) {
          const pos = changes.fabPosition.newValue || "right";
          const isLeft = pos === "left" || pos === "bottom-left";
          el.classList.toggle("pos-left", isLeft);
          el.classList.toggle("pos-right", !isLeft);
        }
        if (changes.showFloatingBtn && el) {
          el.style.display = changes.showFloatingBtn.newValue === false ? "none" : "";
        }
      }
    });
  }

  function updateButtonToRecaptureState(count) {
    const mainBtn = document.getElementById("ai-bridge-main-btn");
    const badge = document.getElementById("ai-bridge-new-badge");
    if (!mainBtn) return;

    mainBtn.classList.add("recapture");
    if (badge) {
      badge.textContent = "0";
      badge.classList.remove("show");
    }
  }

  // Automatically check if new messages were added after a capture
  function checkForNewMessages() {
    if (capturedMessageCount > 0) {
      const currentMsgs = extractAllMessages();
      if (currentMsgs.length > capturedMessageCount) {
        const diff = currentMsgs.length - capturedMessageCount;
        const badge = document.getElementById("ai-bridge-new-badge");
        const captureText = document.querySelector("#ai-bridge-capture-text");
        if (badge) {
          badge.textContent = `+${diff}`;
          badge.classList.add("show");
        }
        if (captureText) {
          captureText.textContent = `🔄 Re-capture (+${diff} new messages)`;
        }
      }
    }
  }

  // Periodic injection & update check
  setInterval(() => {
    injectTrayWidget();
    checkForNewMessages();
  }, 1800);

  // Escaping utility for content script
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();

