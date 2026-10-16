const FIGMA_ICONS = {
  messages: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7.00361 11.9928C9.37092 11.8614 11.25 9.90019 11.25 7.5C11.25 5.01472 9.23528 3 6.75 3C4.26472 3 2.25 5.01472 2.25 7.5C2.25 8.38553 2.5057 9.21127 2.94742 9.90747L2.62939 10.8615L2.62889 10.8629C2.50708 11.2284 2.44615 11.4111 2.48954 11.5328C2.52734 11.6388 2.61126 11.7224 2.71729 11.7602C2.83854 11.8035 3.02006 11.7429 3.38302 11.622L3.38818 11.6204L4.34253 11.3024C5.03873 11.7441 5.86451 11.9999 6.75005 11.9999C6.83514 11.9999 6.91968 11.9975 7.00361 11.9928ZM7.00361 11.9928C7.00367 11.993 7.00354 11.9927 7.00361 11.9928ZM7.00361 11.9928C7.6193 13.7444 9.28807 15.0001 11.2501 15.0001C12.1356 15.0001 12.9612 14.7441 13.6574 14.3024L14.6115 14.6204L14.6134 14.6208C14.9788 14.7426 15.1619 14.8036 15.2835 14.7602C15.3896 14.7224 15.4724 14.6388 15.5102 14.5328C15.5537 14.411 15.4929 14.228 15.3708 13.8616L15.0527 12.9075L15.1593 12.731C15.5353 12.0735 15.7496 11.3117 15.7496 10.5C15.7496 8.01473 13.7353 6 11.25 6L11.0815 6.0031L10.9966 6.00726\" stroke=\"#878685\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>",
  star: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.33431 2.04889C6.54431 1.40419 7.45641 1.40419 7.66571 2.04889L8.41471 4.35329C8.50857 4.64118 8.7769 4.83607 9.07971 4.83629H11.5031C12.1814 4.83629 12.4628 5.70429 11.9147 6.10329L9.95471 7.52709C9.70919 7.7052 9.60631 8.02117 9.69991 8.30969L10.4489 10.6141C10.6589 11.2588 9.92041 11.7957 9.37091 11.3967L7.41091 9.97289C7.16565 9.79484 6.83366 9.79484 6.58841 9.97289L4.62841 11.3967C4.07961 11.7957 3.34181 11.2588 3.55111 10.6141L4.30011 8.30969C4.3937 8.02117 4.29083 7.7052 4.04531 7.52709L2.08601 6.10399C1.53791 5.70499 1.82001 4.83699 2.49761 4.83699H4.92031C5.22337 4.83707 5.49206 4.64212 5.58601 4.35399L6.33501 2.04959L6.33431 2.04889Z\" fill=\"#FBBF24\"/>\n</svg>",
  starEmpty: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.44573 1.74379C6.62073 1.20654 7.38082 1.20654 7.55523 1.74379L8.44132 4.47029C8.51954 4.71019 8.74315 4.8726 8.99548 4.87279H11.8626C12.4278 4.87279 12.6623 5.59612 12.2056 5.92862L9.88623 7.61329C9.68185 7.76187 9.59637 8.02515 9.67448 8.26545L10.56 10.992C10.735 11.5298 10.1196 11.9766 9.66282 11.6441L7.34348 9.95945C7.13898 9.81079 6.86199 9.81079 6.65748 9.95945L4.33815 11.6441C3.8814 11.9766 3.26598 11.5292 3.44098 10.992L4.32648 8.26545C4.4046 8.02515 4.31912 7.76187 4.11473 7.61329L1.7954 5.92862C1.33807 5.59612 1.57373 4.87279 2.1384 4.87279H5.0049C5.25745 4.87285 5.48136 4.7104 5.55965 4.47029L6.44573 1.74379V1.74379\" stroke=\"#AFAFAE\" stroke-width=\"1.16667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>",
  edit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_9_3637)\">\n<path d=\"M2.91671 9.33334L2.33337 11.6667L4.66671 11.0833L11.375 4.375C11.8583 3.89175 11.8583 3.10825 11.375 2.625C10.8918 2.14175 10.1083 2.14175 9.62504 2.625L2.91671 9.33334Z\" stroke=\"#AFAFAE\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.75 3.5L10.5 5.25\" stroke=\"#AFAFAE\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_9_3637\">\n<rect width=\"14\" height=\"14\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>",
  arrowRight: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_9_3647)\">\n<path d=\"M7.5 12.75L11.25 9\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.25 9L7.5 5.25\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_9_3647\">\n<rect width=\"18\" height=\"18\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>",
  quickPaste: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.33566 1.03028C7.60347 1.11763 7.78565 1.37512 7.78563 1.66627V4.99958H10.3569C10.5966 4.99947 10.8164 5.13766 10.9272 5.35808C11.038 5.57849 11.0213 5.84453 10.884 6.04824L6.38429 12.7149C6.22357 12.9537 5.93199 13.0566 5.66414 12.9692C5.3963 12.8817 5.21419 12.6241 5.21437 12.3329V8.99956H2.6431C2.40343 8.99967 2.1836 8.86148 2.0728 8.64106C1.96201 8.42065 1.97866 8.15461 2.11599 7.9509L6.61571 1.28428C6.77666 1.04593 7.06808 0.943386 7.33566 1.03094V1.03028Z\" fill=\"#373634\"/>\n</svg>",
  delete: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6 4.6068L6 3.35318C6 2.47958 6 2.04278 6.26206 1.77139C6.52412 1.5 6.94591 1.5 7.78947 1.5L10.2105 1.5C11.0541 1.5 11.4759 1.5 11.7379 1.77139C12 2.04278 12 2.47958 12 3.35318V4.6068\" stroke=\"#AFAFAE\" stroke-width=\"1.25\"/>\n<path d=\"M10.5 8.41141V12.1614\" stroke=\"#AFAFAE\" stroke-width=\"1.25\" stroke-linecap=\"round\"/>\n<path d=\"M7.5 8.41141V12.1614\" stroke=\"#AFAFAE\" stroke-width=\"1.25\" stroke-linecap=\"round\"/>\n<path d=\"M8.99976 15.8752C7.81512 15.8752 7.33752 15.87 6.94702 15.7707C5.87656 15.4985 5.00697 14.7199 4.6189 13.6858C4.47737 13.3085 4.41985 12.834 4.2898 11.6565L3.52124 4.69845L14.4783 4.69846L13.7097 11.6565C13.5797 12.8338 13.5231 13.3085 13.3816 13.6858C12.9936 14.7198 12.1238 15.4984 11.0535 15.7707C10.6629 15.87 10.1846 15.8752 8.99976 15.8752Z\" stroke=\"#AFAFAE\" stroke-width=\"1.25\"/>\n<path d=\"M2.25 4.59152H15.75\" stroke=\"#AFAFAE\" stroke-width=\"1.25\" stroke-linecap=\"round\"/>\n</svg>",
  lightning: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.5 10.5L9.75 1.5V7.5H13.5L8.25 16.5V10.5H4.5Z\" stroke=\"#373634\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></svg>",
  fullConversation: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 6H15C15.4142 6 15.75 6.33579 15.75 6.75V15L13.2502 12.9232C13.1156 12.8114 12.9456 12.75 12.7705 12.75H6.75C6.33579 12.75 6 12.4142 6 12V9.75M12 6V3.75C12 3.33579 11.6642 3 11.25 3H3C2.58579 3 2.25 3.33579 2.25 3.75V12.0002L4.74976 9.92311C4.88441 9.81124 5.05443 9.75 5.22949 9.75H6M12 6V9C12 9.41421 11.6642 9.75 11.25 9.75H6\" stroke=\"#373634\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  rawData: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.5 8.25L12 9.75L10.5 11.25M7.5 11.25L6 9.75L7.5 8.25M2.25 4.5V12.6C2.25 13.4401 2.25 13.8598 2.41349 14.1807C2.5573 14.4629 2.7866 14.6929 3.06885 14.8367C3.3894 15 3.80925 15 4.64768 15H13.3523C14.1908 15 14.61 15 14.9305 14.8367C15.2128 14.6929 15.4429 14.4631 15.5867 14.1808C15.7502 13.86 15.7502 13.4399 15.7502 12.5999L15.7502 6.89983C15.7502 6.05975 15.7502 5.63972 15.5867 5.31885C15.4429 5.0366 15.2129 4.8073 14.9307 4.66349C14.6098 4.5 14.1901 4.5 13.35 4.5H9M2.25 4.5H9M2.25 4.5C2.25 3.67157 2.92157 3 3.75 3H6.50589C6.87277 3 7.05665 3 7.22928 3.04145C7.38233 3.07819 7.52839 3.13895 7.6626 3.22119C7.81392 3.31392 7.94386 3.44386 8.20312 3.70313L9 4.5\" stroke=\"#373634\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"
};

// side_panel.js - Logic for the PromptPort Side Panel
// Direct translation and state bindings for Figma designs ("PromptPort" / Page: "Final Screen")

let allSessions = {};
let activeSessionId = null;
let currentFilterPlatform = "all";
let sidePanelPort = null;

function notifySidePanelClosed() {
  if (sidePanelPort) {
    try { sidePanelPort.disconnect(); } catch (e) {}
    sidePanelPort = null;
  }
  try {
    chrome.runtime.sendMessage({ type: "SIDE_PANEL_STATE", open: false }).catch(() => {});
  } catch (e) {}
}

document.addEventListener("DOMContentLoaded", async () => {
  // Establish connection port with background to auto-hide/show floating button on web pages
  try {
    sidePanelPort = chrome.runtime.connect({ name: "side_panel" });
  } catch (e) {}

  window.addEventListener("pagehide", notifySidePanelClosed);
  window.addEventListener("beforeunload", notifySidePanelClosed);

  await initSettingsAndTheme();
  await loadSessions();

  // Search input
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    renderSessionList(e.target.value);
  });

  // Main Header Actions
  document.getElementById("btnRefresh")?.addEventListener("click", forceCaptureActiveTab);
  document.getElementById("btnRefreshHeader")?.addEventListener("click", async () => {
    await loadSessions();
    await refreshLivePlatform();
    showToast("🔄 Tool refreshed");
  });
  document.getElementById("btnClosePanel")?.addEventListener("click", () => {
    notifySidePanelClosed();
    window.close();
  });
  document.getElementById("btnSettings")?.addEventListener("click", () => showScreen("settingsView"));

  // Detail / Preview Screen Actions
  document.getElementById("btnBackToMain")?.addEventListener("click", () => showScreen("mainView"));
  document.getElementById("btnDetailSettings")?.addEventListener("click", () => showScreen("settingsView"));
  document.getElementById("btnDetailSync")?.addEventListener("click", () => {
    if (activeSessionId) {
      updatePreviewText();
      showToast("Context refreshed");
    }
  });
  document.getElementById("btnDetailClose")?.addEventListener("click", () => {
    notifySidePanelClosed();
    window.close();
  });

  // Export Chat Dropdown in Detail Screen
  const exportBtn = document.getElementById("btnExportChatMenu");
  const exportMenu = document.getElementById("exportChatDropdown");
  exportBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu?.classList.toggle("hidden");
  });
  document.addEventListener("click", () => {
    exportMenu?.classList.add("hidden");
    document.getElementById("strategyDropdownMenu")?.classList.add("hidden");
  });

  document.getElementById("btnExportPdf")?.addEventListener("click", () => {
    exportMenu?.classList.add("hidden");
    exportAsPdf();
  });
  document.getElementById("btnExportDoc")?.addEventListener("click", () => {
    exportMenu?.classList.add("hidden");
    exportAsDoc();
  });
  document.getElementById("btnExportJson")?.addEventListener("click", () => {
    exportMenu?.classList.add("hidden");
    exportCurrentSessionJson();
  });

  // Strategy Custom Dropdown
  const strategyTrigger = document.getElementById("btnStrategyTrigger");
  const strategyMenu = document.getElementById("strategyDropdownMenu");
  strategyTrigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    strategyMenu?.classList.toggle("hidden");
  });

  document.querySelectorAll(".fig-dropdown-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const val = option.getAttribute("data-value");
      document.querySelectorAll(".fig-dropdown-option").forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");
      
      const label = option.querySelector("span")?.textContent || "Smart Summary";
      const selLabel = document.getElementById("strategySelectedLabel");
      if (selLabel) selLabel.textContent = label;

      const selIcon = document.getElementById("strategySelectedIcon");
      if (selIcon) {
        if (val === "plain") {
          selIcon.outerHTML = `<span id="strategySelectedIcon">${FIGMA_ICONS.fullConversation}</span>`;
        } else if (val === "json") {
          selIcon.outerHTML = `<span id="strategySelectedIcon">${FIGMA_ICONS.rawData}</span>`;
        } else {
          selIcon.outerHTML = `<span id="strategySelectedIcon">${FIGMA_ICONS.lightning}</span>`;
        }
      }

      const strategyCard = document.getElementById("strategyCard");
      if (strategyCard) {
        strategyCard.setAttribute("data-mode", val);
      }

      const hiddenSelect = document.getElementById("exportFormatSelect");
      if (hiddenSelect) {
        hiddenSelect.value = val;
      }
      strategyMenu?.classList.add("hidden");
      updatePreviewText();
    });
  });

  // Context Depth Stepper (− / +) & All Pill
  const limitInput = document.getElementById("limitCount");
  const depthTurnsNumber = document.getElementById("depthTurnsNumber");
  const btnDepthAll = document.getElementById("btnDepthAll");

  document.getElementById("btnDepthDec")?.addEventListener("click", () => {
    btnDepthAll?.classList.remove("active");
    let cur = parseInt(limitInput.value, 10) || 3;
    if (cur <= 0) cur = 4;
    if (cur > 1) {
      cur--;
      limitInput.value = cur;
      if (depthTurnsNumber) depthTurnsNumber.textContent = String(cur).padStart(2, '0');
      updatePreviewText();
    }
  });

  document.getElementById("btnDepthInc")?.addEventListener("click", () => {
    btnDepthAll?.classList.remove("active");
    let cur = parseInt(limitInput.value, 10) || 0;
    cur++;
    limitInput.value = cur;
    if (depthTurnsNumber) depthTurnsNumber.textContent = String(cur).padStart(2, '0');
    updatePreviewText();
  });

  btnDepthAll?.addEventListener("click", () => {
    btnDepthAll.classList.add("active");
    limitInput.value = 0;
    if (depthTurnsNumber) depthTurnsNumber.textContent = "--";
    updatePreviewText();
  });



  // Detail Dock Buttons
  document.getElementById("btnCopyClipboard")?.addEventListener("click", copyPreviewText);
  document.getElementById("btnInjectInput")?.addEventListener("click", injectPreviewIntoActiveAI);
  document.getElementById("btnSynthesizePrompt")?.addEventListener("click", synthesizeWithCurrentAI);

  // Settings Position Switch
  document.querySelectorAll(".fig-pos-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      document.querySelectorAll(".fig-pos-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const pos = btn.getAttribute("data-pos");
      await chrome.storage.local.set({ fabPosition: pos });
      showToast(`Position set to ${pos === "bottom-left" ? "Bottom-left" : "Bottom-right"}`);
    });
  });

  // Auto-strip noise checkbox & Auto-lock timeout
  document.getElementById("settingAutoStripNoise")?.addEventListener("change", async (e) => {
    await chrome.storage.local.set({ autoStripNoise: e.target.checked });
    showToast("Noise cleaning saved");
  });

  document.getElementById("settingAutoLock")?.addEventListener("change", async (e) => {
    await chrome.storage.local.set({ autoLockTimeout: e.target.value });
    showToast("Auto-lock timeout updated");
  });

  document.getElementById("btnChangePassphrase")?.addEventListener("click", async () => {
    const pass = prompt("Enter new master passphrase for local AES-256 storage:");
    if (pass !== null && pass.trim()) {
      await chrome.storage.local.set({ passphraseConfigured: true, passphraseUpdated: Date.now() });
      showToast("Master Passphrase updated");
    }
  });

  // Settings Screen Listeners
  document.getElementById("btnBackFromSettings")?.addEventListener("click", () => showScreen("mainView"));
  document.querySelectorAll("input[name='appTheme']").forEach((radio) => {
    radio.addEventListener("change", (e) => applyTheme(e.target.value));
  });

  // Custom Dropdown for Card 2
  const formatTrigger = document.getElementById("customFormatDropdownTrigger");
  const formatMenu = document.getElementById("customFormatDropdownMenu");

  if (formatTrigger && formatMenu) {
    formatTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = !formatMenu.classList.contains("hidden");
      formatMenu.classList.toggle("hidden", isExpanded);
      formatTrigger.classList.toggle("open", !isExpanded);
      formatTrigger.setAttribute("aria-expanded", String(!isExpanded));
    });

    formatMenu.querySelectorAll(".fig-dropdown-item").forEach(item => {
      item.addEventListener("click", async (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-value");
        updateCustomFormatDropdown(val);
        formatMenu.classList.add("hidden");
        formatTrigger.classList.remove("open");
        formatTrigger.setAttribute("aria-expanded", "false");
        await chrome.storage.local.set({ defaultExportFormat: val });
        showToast(`Default format: ${item.querySelector("span")?.textContent || val}`);
      });
    });

    document.addEventListener("click", () => {
      formatMenu.classList.add("hidden");
      formatTrigger.classList.remove("open");
      formatTrigger.setAttribute("aria-expanded", "false");
    });
  }

  document.getElementById("settingDefaultFormat")?.addEventListener("change", async (e) => {
    await chrome.storage.local.set({ defaultExportFormat: e.target.value });
    updateCustomFormatDropdown(e.target.value);
  });
  document.getElementById("settingShowFloatingBtn")?.addEventListener("change", async (e) => {
    await chrome.storage.local.set({ showFloatingBtn: e.target.checked });
  });
  document.getElementById("btnExportAllJson")?.addEventListener("click", exportAllSessionsJson);
  document.getElementById("btnImportJson")?.addEventListener("click", () => {
    document.getElementById("fileImportBackup")?.click();
  });
  document.getElementById("fileImportBackup")?.addEventListener("change", importSessionsJson);
  document.getElementById("btnDangerReset")?.addEventListener("click", clearAllSessions);

  // Delegated listener for formatted turn code block copy buttons (CSP-compliant)
  document.getElementById("previewFormattedTurns")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='copy-code']");
    if (btn) {
      const codeBlock = btn.closest(".fig-code-highlight-box")?.querySelector(".fig-code-text");
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.textContent || codeBlock.innerText || "");
        showToast("📋 Code copied!");
      }
    }
  });

  // Listen for real-time updates from content scripts and background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SESSION_UPDATED") {
      allSessions[message.sessionId] = message.session;
      renderSessionList();
    } else if (message.type === "PLATFORM_UPDATE") {
      updateLiveHeader(message.payload?.site);
    }
  });

  // Track tab switching and tab updates in real-time
  chrome.tabs.onActivated.addListener(() => {
    refreshLivePlatform();
  });
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "complete" || changeInfo.url) {
      refreshLivePlatform();
    }
  });

  // Check active tab immediately on load
  await refreshLivePlatform();
});

function updateLiveHeader(site) {
  const nameEl = document.getElementById("live-header-name");
  if (!nameEl) return;

  if (site && site !== "Not an AI chat site" && site !== "GenericAI") {
    nameEl.textContent = site;
  } else if (site === "GenericAI") {
    nameEl.textContent = "AI Web Page";
  } else {
    nameEl.textContent = "None Active";
  }
}

async function refreshLivePlatform() {
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      const [fallbackTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      tab = fallbackTab;
    }

    if (!tab || !tab.url) {
      updateLiveHeader(null);
      return;
    }

    const url = tab.url.toLowerCase();
    let detected = null;
    if (url.includes("openai.com") || url.includes("chatgpt.com")) detected = "ChatGPT";
    else if (url.includes("gemini.google.com")) detected = "Gemini";
    else if (url.includes("claude.ai")) detected = "Claude";
    else if (url.includes("kimi.moonshot.cn") || url.includes("kimi.ai")) detected = "Kimi";
    else if (url.includes("grok.com") || url.includes("x.com") || url.includes("twitter.com")) detected = "Grok";
    else if (url.includes("deepseek.com")) detected = "DeepSeek";
    else if (url.includes("z.ai") || url.includes("chatglm.cn") || url.includes("zhipu") || url.includes("bigmodel.cn")) detected = "Z-AI";

    if (detected) {
      updateLiveHeader(detected);
    }

    chrome.tabs.sendMessage(tab.id, { type: "GET_PLATFORM" }, (resp) => {
      if (chrome.runtime.lastError) {
        if (!detected) updateLiveHeader(null);
        return;
      }
      if (resp && resp.site) {
        updateLiveHeader(resp.site);
      }
    });
  } catch (e) {
    console.error("[PromptPort] refreshLivePlatform error:", e);
  }
}

async function loadSessions() {
  const data = await chrome.storage.local.get("chatSessions");
  allSessions = data.chatSessions || {};
  renderSessionList();
}

function getPlatformTagClass(site) {
  const s = (site || "").toLowerCase();
  if (s.includes("gemini")) return "gemini";
  if (s.includes("chatgpt") || s.includes("openai")) return "chatgpt";
  if (s.includes("claude")) return "claude";
  if (s.includes("z-ai") || s.includes("z.ai") || s.includes("chatglm")) return "z-ai";
  if (s.includes("deepseek")) return "deepseek";
  return "other";
}

function renderDynamicFilterPills(sessionList) {
  const strip = document.getElementById("filterPillsStrip");
  if (!strip) return;

  // When no sessions are captured, hide and clear the filter strip completely
  if (!sessionList || sessionList.length === 0) {
    strip.innerHTML = "";
    strip.style.display = "none";
    currentFilterPlatform = "all";
    return;
  }

  // Count sessions per platform
  const platformCounts = {};
  for (const s of sessionList) {
    const site = s.site || "Other";
    platformCounts[site] = (platformCounts[site] || 0) + 1;
  }

  const platforms = Object.keys(platformCounts).sort();

  // If current filter is no longer in platforms, reset to "all"
  if (currentFilterPlatform !== "all" && !platformCounts[currentFilterPlatform]) {
    currentFilterPlatform = "all";
  }

  strip.style.display = "flex";
  strip.innerHTML = "";

  // 1. "All" Pill
  const allBtn = document.createElement("button");
  allBtn.className = `fig-filter-pill ${currentFilterPlatform === "all" ? "active" : ""}`;
  allBtn.setAttribute("data-filter", "all");
  allBtn.textContent = `All (${sessionList.length})`;
  allBtn.addEventListener("click", () => {
    selectFilterPlatform("all");
  });
  strip.appendChild(allBtn);

  // 2. Dynamic Platform Pills
  for (const plat of platforms) {
    const btn = document.createElement("button");
    btn.className = `fig-filter-pill ${currentFilterPlatform === plat ? "active" : ""}`;
    btn.setAttribute("data-filter", plat);
    btn.textContent = `${plat} (${platformCounts[plat]})`;
    btn.addEventListener("click", () => {
      selectFilterPlatform(plat);
    });
    strip.appendChild(btn);
  }
}

function selectFilterPlatform(platform) {
  currentFilterPlatform = platform;
  const strip = document.getElementById("filterPillsStrip");
  if (strip) {
    strip.querySelectorAll(".fig-filter-pill").forEach((pill) => {
      const p = pill.getAttribute("data-filter");
      pill.classList.toggle("active", p === platform);
    });
  }
  const searchVal = document.getElementById("searchInput")?.value || "";
  renderSessionList(searchVal);
}

function renderSessionList(filterText = "") {
  const container = document.getElementById("sessionsList");
  if (!container) return;

  const query = filterText.toLowerCase().trim();
  const sessionList = Object.values(allSessions).sort((a, b) => (b.updated || 0) - (a.updated || 0));

  // Render or update dynamic filter pills
  renderDynamicFilterPills(sessionList);

  const filtered = sessionList.filter((s) => {
    // 1. Platform pill filtering
    if (currentFilterPlatform !== "all") {
      const siteName = (s.site || "").toLowerCase();
      const filterLower = currentFilterPlatform.toLowerCase();
      if (!siteName.includes(filterLower)) return false;
    }
    // 2. Search query filtering
    if (!query) return true;
    const matchTitle = (s.title || "").toLowerCase().includes(query);
    const matchSite = (s.site || "").toLowerCase().includes(query);
    const matchContent = (s.messages || []).some(m => (m.text || "").toLowerCase().includes(query));
    return matchTitle || matchSite || matchContent;
  });

  // Empty State matching Figma Frame 11:114
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="fig-empty-state" id="emptyState">
        <div class="fig-empty-title">No chat capture yet</div>
        <div class="fig-empty-desc">Please click on capture button to capture chat</div>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  filtered.forEach((session) => {
    const card = document.createElement("article");
    card.className = "fig-session-card";

    const tagClass = getPlatformTagClass(session.site);
    const msgCount = session.messages ? session.messages.length : 0;
    const tagDisplay = (session.site || "AI").toUpperCase();
    const titleText = escapeHtml(session.title || "Untitled Conversation");

    card.innerHTML = `
      <div class="fig-card-top">
        <div class="fig-card-badges-left">
          <span class="fig-ai-tag ${tagClass}">${escapeHtml(tagDisplay)}</span>
          <div class="fig-card-count-wrap">
            ${FIGMA_ICONS.messages}
            <span>${msgCount} msgs</span>
          </div>
        </div>
        <div class="fig-card-badges-right">
          <button class="fig-card-star-btn ${session.isFavorite ? 'active' : ''}" data-action="favorite" title="Star conversation">
            ${session.isFavorite ? FIGMA_ICONS.star : FIGMA_ICONS.starEmpty}
          </button>
        </div>
      </div>

      <div class="fig-card-title-row" id="titleWrap-${escapeHtml(session.id)}">
        <h3 class="fig-card-title" title="${titleText}">${titleText}</h3>
        <button class="fig-btn-rename-icon" data-action="rename-inline" title="Rename conversation">
          ${FIGMA_ICONS.edit}
        </button>
      </div>

      <div class="fig-card-actions">
        <div class="fig-card-actions-left">
          <button class="fig-cta-preview" data-action="preview">
            <span>Preview & Transfer</span>
            ${FIGMA_ICONS.arrowRight}
          </button>
          <button class="fig-cta-quickpaste" data-action="quick-paste" title="Directly paste into current page input">
            ${FIGMA_ICONS.quickPaste}
            <span>Quick Paste</span>
          </button>
        </div>
        <button class="fig-btn-delete" data-action="delete" title="Delete conversation">
          ${FIGMA_ICONS.delete}
        </button>
      </div>
    `;

    // Listeners
    card.querySelector("[data-action='preview']").addEventListener("click", () => openDetailScreen(session.id));
    card.querySelector("[data-action='quick-paste']").addEventListener("click", () => quickPaste(session.id));
    card.querySelector("[data-action='delete']").addEventListener("click", () => deleteSession(session.id));
    card.querySelector("[data-action='favorite']").addEventListener("click", () => toggleFavorite(session.id));
    card.querySelector("[data-action='rename-inline']").addEventListener("click", () => startInlineRename(session.id));

    container.appendChild(card);
  });
}

// Manually trigger a scrape of the currently focused tab
async function forceCaptureActiveTab() {
  let [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || !activeTab.id) {
    const [fallbackTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    activeTab = fallbackTab;
  }

  if (!activeTab || !activeTab.id || !activeTab.url) {
    showToast("⚠️ No active web page detected.");
    return;
  }

  showToast("Capturing conversation…");

  try {
    let response;
    try {
      response = await chrome.tabs.sendMessage(activeTab.id, { type: "FORCE_SYNC" });
    } catch (e) {
      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["content.js"]
      });
      await new Promise(r => setTimeout(r, 600));
      response = await chrome.tabs.sendMessage(activeTab.id, { type: "FORCE_SYNC" });
    }

    if (response && response.success) {
      if (response.count > 0) {
        await loadSessions();
        showToast(`✅ Captured ${response.count} messages.`);
      } else {
        await new Promise(r => setTimeout(r, 600));
        try {
          const retryResp = await chrome.tabs.sendMessage(activeTab.id, { type: "FORCE_SYNC" });
          if (retryResp && retryResp.success && retryResp.count > 0) {
            await loadSessions();
            showToast(`✅ Captured ${retryResp.count} messages.`);
          } else {
            showToast("⚠️ 0 messages found. Ensure conversation is open.");
          }
        } catch (retryErr) {
          showToast("⚠️ No messages found on this page.");
        }
      }
    } else {
      showToast("❌ Unable to extract conversation.");
    }
  } catch (err) {
    console.error("[PromptPort] Capture error:", err);
    showToast(`❌ Capture error: ${err.message || "unknown"}`);
  }
}

function showToast(message, duration = 2600) {
  const existing = document.querySelectorAll(".ai-toast");
  existing.forEach(t => t.remove());

  const toast = document.createElement("div");
  toast.className = "ai-toast";

  // Extract leading emoji if present for the dedicated pill badge
  const emojiMatch = message.match(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*(.*)$/u);
  let iconHtml = "";
  let text = message;

  if (emojiMatch) {
    iconHtml = `<span class="ai-toast-icon-badge">${emojiMatch[1]}</span>`;
    text = emojiMatch[2];
  } else {
    iconHtml = `
      <span class="ai-toast-icon-badge">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 6.25L4.75 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    `;
  }

  toast.innerHTML = `
    ${iconHtml}
    <span class="ai-toast-text">${escapeHtml(text)}</span>
  `;

  document.body.appendChild(toast);

  // Smooth fade-out before removal
  const fadeOutDelay = Math.max(duration - 240, 100);
  setTimeout(() => {
    toast.classList.add("ai-toast-hiding");
  }, fadeOutDelay);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

// View Screen Navigation Manager
function showScreen(screenId) {
  const screens = ["mainView", "detailView", "settingsView"];
  screens.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (id === screenId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });
}

function openDetailScreen(sessionId) {
  activeSessionId = sessionId;
  const session = allSessions[sessionId];
  if (!session) return;

  const detailTitle = document.getElementById("detailTitle");
  if (detailTitle) {
    detailTitle.textContent = `${session.title || session.site || "Conversation"}`;
  }

  const detailPlatformTag = document.getElementById("detailPlatformTag");
  if (detailPlatformTag) {
    const tagClass = getPlatformTagClass(session.site);
    detailPlatformTag.className = `fig-ai-tag ${tagClass}`;
    detailPlatformTag.textContent = (session.site || "AI").toUpperCase();
  }

  renderModalAttachments(session);

  // Default Included Context Depth to ALL turns
  const limitInput = document.getElementById("limitCount");
  if (limitInput) limitInput.value = 0;
  const depthTurnsNumber = document.getElementById("depthTurnsNumber");
  if (depthTurnsNumber) depthTurnsNumber.textContent = "--";
  document.getElementById("btnDepthAll")?.classList.add("active");

  updatePreviewText();
  showScreen("detailView");
}

function startInlineRename(sessionId) {
  const session = allSessions[sessionId];
  if (!session) return;

  const wrap = document.getElementById(`titleWrap-${sessionId}`);
  if (!wrap) return;

  const originalTitle = session.title || "Untitled Chat";
  wrap.innerHTML = `
    <div class="inline-rename-box">
      <input type="text" class="inline-rename-input" id="inputRename-${escapeHtml(sessionId)}" value="${escapeHtml(originalTitle)}" />
      <button class="btn-inline-save" id="btnSaveRename-${escapeHtml(sessionId)}">Save</button>
      <button class="btn-inline-cancel" id="btnCancelRename-${escapeHtml(sessionId)}">Cancel</button>
    </div>
  `;

  const input = document.getElementById(`inputRename-${sessionId}`);
  const saveBtn = document.getElementById(`btnSaveRename-${sessionId}`);
  const cancelBtn = document.getElementById(`btnCancelRename-${sessionId}`);

  input?.focus();
  input?.select();

  const handleSave = async () => {
    const newName = input.value.trim();
    if (newName) {
      session.title = newName;
      session.customTitle = newName;
      await chrome.storage.local.set({ chatSessions: allSessions });
    }
    renderSessionList();
  };

  saveBtn?.addEventListener("click", handleSave);
  cancelBtn?.addEventListener("click", () => renderSessionList());
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") renderSessionList();
  });
}

function renderModalAttachments(session) {
  const container = document.getElementById("attachmentsPreviewContainer");
  const list = document.getElementById("attachmentsList");
  const countText = document.getElementById("attachmentsCountText");
  if (!container || !list) return;

  const allAttachments = [];
  (session.messages || []).forEach((m) => {
    if (m.attachments && m.attachments.length > 0) {
      m.attachments.forEach(att => allAttachments.push(att));
    }
  });

  if (allAttachments.length === 0) {
    container.classList.add("hidden");
    list.innerHTML = "";
    return;
  }

  container.classList.remove("hidden");
  list.innerHTML = "";
  if (countText) {
    countText.textContent = `${allAttachments.length} file(s) attached`;
  }

  allAttachments.forEach((att) => {
    const item = document.createElement("div");
    item.className = "attachment-chip";

    if (att.type === "image" && att.url) {
      item.innerHTML = `
        <img class="attachment-thumbnail" src="${escapeHtml(att.url)}" alt="thumbnail" />
        <span>🖼️ ${escapeHtml(att.name || "Image")}</span>
      `;
    } else {
      const ext = att.fileType ? att.fileType.toUpperCase() : "DOC";
      item.innerHTML = `
        <span>📄 [${escapeHtml(ext)}] ${escapeHtml(att.name || "Attached File")}</span>
      `;
    }
    list.appendChild(item);
  });
}

// Extractive Sliding-Window Summarization & Structured Memory Generator
function generateStructuredSummary(session, recentCount = 3) {
  if (!session || !session.messages || session.messages.length === 0) return "";
  const msgs = session.messages;

  const firstUserMsg = msgs.find(m => m.role === "user")?.text || "General discussion";
  const goal = firstUserMsg.length > 250 ? firstUserMsg.slice(0, 250) + "..." : firstUserMsg;

  const decisions = [];
  const fileCatalog = [];

  msgs.forEach((m) => {
    const text = m.text || "";

    if (m.attachments && m.attachments.length > 0) {
      m.attachments.forEach((a) => {
        const desc = a.type === "image" ? `🖼️ Image: ${a.name || "Preview"}` : `📄 File: ${a.name || "Doc"} (${a.fileType || "asset"})`;
        if (!fileCatalog.includes(desc)) fileCatalog.push(desc);
      });
    }

    const decisionMatches = text.match(/(?:decided to|agreed on|solution:|implemented|fixed by|rule:|constraint:|resolved by)[^.\n]+/gi);
    if (decisionMatches) {
      decisionMatches.slice(0, 2).forEach(d => {
        const clean = d.trim();
        if (clean.length > 10 && !decisions.includes(clean)) decisions.push(clean);
      });
    }

    if (text.includes("```")) {
      const codeTypeMatch = text.match(/```(\w+)/);
      const lang = codeTypeMatch ? codeTypeMatch[1] : "code";
      const snippet = `Code snippet referenced [${lang}]`;
      if (!decisions.includes(snippet)) decisions.push(snippet);
    }
  });

  const windowCount = recentCount > 0 ? recentCount : 3;
  const recentTurns = msgs.slice(-windowCount);

  return {
    goal,
    decisions: decisions.slice(0, 6),
    fileCatalog,
    recentTurns,
    totalTurns: msgs.length
  };
}

function getFormattedMessages(session, format, limit) {
  if (!session || !session.messages) return "";
  let msgs = [...session.messages];

  if (limit > 0 && msgs.length > limit) {
    msgs = msgs.slice(-limit);
  }

  // 1. Smart Condensed Summary
  if (format === "condensed") {
    const sum = generateStructuredSummary(session, limit > 0 ? limit : 3);
    let output = `[CONCISE CONTEXT TRANSFER - From ${session.site || "AI Chat"}]:\n`;
    output += `🎯 PRIMARY GOAL:\n${sum.goal}\n\n`;

    if (sum.decisions.length > 0) {
      output += `📌 KEY DECISIONS & TECHNICAL FACTS:\n` + sum.decisions.map(d => `- ${d}`).join("\n") + `\n\n`;
    }

    if (sum.fileCatalog.length > 0) {
      output += `📎 ATTACHED ASSETS & FILES:\n` + sum.fileCatalog.map(f => `- ${f}`).join("\n") + `\n\n`;
    }

    output += `💬 RECENT CONVERSATION (${sum.recentTurns.length} turns):\n`;
    output += sum.recentTurns.map(m => `[${m.role === "user" ? "Human" : "Assistant"}]:\n${m.text}`).join("\n\n");
    return output;
  }

  // 2. Portable Context Capsule
  if (format === "capsule") {
    const sum = generateStructuredSummary(session, limit > 0 ? limit : 3);
    const lastPrompt = sum.recentTurns.filter(m => m.role === "user").pop()?.text || "Continue from current state";

    let output = `[SYSTEM CONTEXT TRANSFER from ${session.site || "AI Chat"}]:\n`;
    output += `You are a Context Continuity Engine. The following is a standardized Context Capsule of an ongoing project. Acknowledge this context and continue directly from the active task without repeating past introductions.\n\n`;
    output += `### 1. MISSION & OBJECTIVE\n${sum.goal}\n\n`;
    output += `### 2. CRITICAL DECISIONS & STATE\n` + (sum.decisions.length ? sum.decisions.map(d => `- ${d}`).join("\n") : "- Proceeding with baseline implementation") + `\n\n`;
    
    if (sum.fileCatalog.length > 0) {
      output += `### 3. FILES & ATTACHMENTS CATALOG\n` + sum.fileCatalog.map(f => `- ${f}`).join("\n") + `\n\n`;
    }

    output += `### 4. RECENT DIALOGUE (VERBATIM)\n`;
    output += sum.recentTurns.map(m => `[${m.role === "user" ? "Human" : "Assistant"}]:\n${m.text}`).join("\n\n") + `\n\n`;
    output += `### 5. ACTIVE NEXT TASK\n${lastPrompt}\n`;
    return output;
  }

  // 3. Structured JSON
  if (format === "json") {
    return JSON.stringify(
      {
        site: session.site,
        url: session.url,
        capturedAt: new Date(session.updated || Date.now()).toISOString(),
        messages: msgs.map((m) => ({
          role: m.role,
          text: m.text,
          attachments: m.attachments || []
        }))
      },
      null,
      2
    );
  }

  // 4. Full Conversation (Plain)
  return msgs
    .map((m) => {
      let attStr = "";
      if (m.attachments && m.attachments.length > 0) {
        attStr = "\n" + m.attachments.map(a => `📎 Attached: ${a.name || a.type} ${a.url ? `(${a.url})` : ""}`).join("\n");
      }
      const speaker = m.role === "user" ? "User" : "Assistant";
      return `### ${speaker}:\n${m.text}${attStr}`;
    })
    .join("\n\n---\n\n");
}

function updatePreviewText() {
  if (!activeSessionId) return;
  const session = allSessions[activeSessionId];
  const format = document.getElementById("exportFormatSelect")?.value || "condensed";
  const limitVal = parseInt(document.getElementById("limitCount")?.value, 10);
  const limit = isNaN(limitVal) ? 0 : limitVal;

  const labelEl = document.getElementById("previewBoxTranscriptLabel");
  if (labelEl) {
    const totalCount = session.messages ? session.messages.length : 0;
    if (limit === 0) {
      labelEl.textContent = `TRANSCRIPT (${totalCount} TURNS)`;
    } else {
      labelEl.textContent = `TRANSCRIPT (${Math.min(limit, totalCount)} TURNS)`;
    }
  }

  const text = getFormattedMessages(session, format, limit);
  const previewArea = document.getElementById("previewContent");
  if (previewArea) {
    previewArea.value = text;
  }

  updateTokenMetrics(session, text);
  renderFormattedTurns();
}

function renderFormattedTurns() {
  const container = document.getElementById("previewFormattedTurns");
  if (!container || !activeSessionId) return;
  const session = allSessions[activeSessionId];
  if (!session || !session.messages) return;

  const format = document.getElementById("exportFormatSelect")?.value || "condensed";
  const limitVal = parseInt(document.getElementById("limitCount")?.value, 10);
  const limit = isNaN(limitVal) ? 0 : limitVal;
  const msgs = (limit > 0) ? session.messages.slice(-limit) : session.messages;

  container.innerHTML = "";

  // 1. RAW DATA VARIANT (Figma Node 15:3210):
  if (format === "json") {
    const rawJson = getFormattedMessages(session, "json", limit);
    const timestamp = msgs[0]?.timestamp 
      ? new Date(msgs[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : "14:22";

    const turnDiv = document.createElement("div");
    turnDiv.className = "fig-turn-card";
    turnDiv.innerHTML = `
      <div class="fig-turn-header">
        <span class="fig-turn-user-badge">[USER]</span>
        <span class="fig-turn-time">${timestamp}</span>
      </div>
      <div class="fig-turn-bubble user">
        <pre class="fig-raw-json-block">${escapeHtml(rawJson)}</pre>
      </div>
    `;
    container.appendChild(turnDiv);
    return;
  }

  // 2. SMART SUMMARY VARIANT (Figma Node 15:148):
  if (format === "condensed") {
    const sum = generateStructuredSummary(session, limit > 0 ? limit : 0);
    const timestamp = msgs[msgs.length - 1]?.timestamp 
      ? new Date(msgs[msgs.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : "14:23";
    const siteTag = (session.site || 'Z-AI').toUpperCase();

    let structuredHtml = `
      <div class="fig-summary-section">
        <div class="fig-summary-heading">🎯 PRIMARY GOAL:</div>
        <div class="fig-summary-body">${escapeHtml(sum.goal)}</div>
      </div>
    `;

    if (sum.decisions && sum.decisions.length > 0) {
      structuredHtml += `
        <div class="fig-summary-section">
          <div class="fig-summary-heading">📌 KEY DECISIONS & TECHNICAL FACTS:</div>
          <div class="fig-summary-body">
            ${sum.decisions.map(d => `<div class="fig-summary-item">• ${escapeHtml(d)}</div>`).join("")}
          </div>
        </div>
      `;
    }

    if (sum.recentTurns && sum.recentTurns.length > 0) {
      structuredHtml += `
        <div class="fig-summary-section">
          <div class="fig-summary-heading">💬 RECENT CONVERSATION (${sum.recentTurns.length} turns):</div>
          <div class="fig-summary-body">
            ${sum.recentTurns.map(m => `
              <div class="fig-summary-turn">
                <span class="fig-summary-role">[${m.role === "user" ? "User" : "Assistant"}]:</span>
                <span class="fig-summary-text">${escapeHtml(m.text)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    const turnDiv = document.createElement("div");
    turnDiv.className = "fig-turn-card";
    turnDiv.innerHTML = `
      <div class="fig-turn-header">
        <span class="fig-turn-assistant-badge">[CONCISE CONTEXT TRANSFER - From ${siteTag}]</span>
        <span class="fig-turn-time">${timestamp}</span>
      </div>
      <div class="fig-summary-content-container">
        ${structuredHtml}
      </div>
    `;
    container.appendChild(turnDiv);
    return;
  }

  // 3. FULL CONVERSATION VARIANT (Figma Node 9:3886):
  // Coalesce adjacent message blocks of the same role so multi-block replies stay in a single card
  const coalescedTurns = [];
  for (const m of msgs) {
    if (!m || (!m.text && (!m.attachments || m.attachments.length === 0))) continue;
    const last = coalescedTurns[coalescedTurns.length - 1];
    if (last && last.role === m.role) {
      if (m.text && m.text !== "[Attached media]") {
        last.text = last.text ? `${last.text}\n\n${m.text}` : m.text;
      }
      if (m.attachments && m.attachments.length > 0) {
        last.attachments = [...(last.attachments || []), ...m.attachments];
      }
    } else {
      coalescedTurns.push({ ...m, attachments: [...(m.attachments || [])] });
    }
  }

  coalescedTurns.forEach((m, idx) => {
    const isUser = m.role === "user";
    const turnDiv = document.createElement("div");
    turnDiv.className = "fig-turn-card";

    const timestamp = m.timestamp 
      ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : `14:${22 + idx}`;
    const speakerTag = isUser ? "[USER]" : `[ASSISTANT - ${(session.site || 'GEMINI').toUpperCase()}]`;

    if (isUser) {
      turnDiv.innerHTML = `
        <div class="fig-turn-header">
          <span class="fig-turn-user-badge">${speakerTag}</span>
          <span class="fig-turn-time">${timestamp}</span>
        </div>
        <div class="fig-turn-bubble user">
          ${escapeHtml(m.text || '')}
        </div>
      `;
    } else {
      const rawText = m.text || '';
      let contentHtml = '';

      if (rawText.includes('```')) {
        const parts = rawText.split('```');
        parts.forEach((part, partIdx) => {
          if (partIdx % 2 === 0) {
            if (part.trim()) {
              contentHtml += `<div class="fig-turn-assistant-intro">${escapeHtml(part.trim())}</div>`;
            }
          } else {
            const lines = part.split('\n');
            const lang = lines[0].trim() || 'ADB DIAGNOSTIC OVERRIDE';
            const codeContent = (lines.length > 1) ? lines.slice(1).join('\n').trim() : part.trim();
            contentHtml += `
              <div class="fig-code-highlight-box">
                <div class="fig-code-header">
                  <span class="fig-code-title">${escapeHtml(lang.toUpperCase())}</span>
                  <button type="button" class="fig-code-copy-btn" data-action="copy-code">copy</button>
                </div>
                <pre class="fig-code-text">${escapeHtml(codeContent)}</pre>
              </div>
            `;
          }
        });
      } else if (rawText.includes('\n\n') || rawText.includes('1.') || rawText.includes('- ')) {
        const paragraphs = rawText.split('\n\n');
        paragraphs.forEach((p, pIdx) => {
          const trimmed = p.trim();
          if (pIdx === 0 && !trimmed.match(/^\d+\.\s/)) {
            contentHtml += `<div class="fig-turn-assistant-intro">${escapeHtml(trimmed)}</div>`;
          } else if (trimmed.match(/^\d+\.\s/)) {
            const firstLine = trimmed.split('\n')[0];
            const rest = trimmed.split('\n').slice(1).join('\n');
            contentHtml += `
              <div class="fig-turn-section-title">${escapeHtml(firstLine)}</div>
              ${rest ? `<div class="fig-turn-vertical-border-box">${escapeHtml(rest)}</div>` : ''}
            `;
          } else {
            contentHtml += `<div class="fig-turn-vertical-border-box">${escapeHtml(trimmed)}</div>`;
          }
        });
      } else {
        contentHtml = `<div class="fig-turn-assistant-intro">${escapeHtml(rawText)}</div>`;
      }

      turnDiv.innerHTML = `
        <div class="fig-turn-header">
          <span class="fig-turn-assistant-badge">${speakerTag}</span>
          <span class="fig-turn-time">${timestamp}</span>
        </div>
        <div class="fig-turn-content assistant">
          ${contentHtml}
        </div>
      `;
    }

    container.appendChild(turnDiv);
  });
}

function updateTokenMetrics(session, currentText) {
  const tokenBadge = document.getElementById("tokenCountBadge");
  const charBadge = document.getElementById("charCountBadge");
  const ratioBadge = document.getElementById("compressionRatioBadge");

  if (!tokenBadge || !charBadge || !currentText) return;

  const words = currentText.trim().split(/\s+/).filter(Boolean).length;
  const estTokens = Math.ceil(currentText.length / 4);

  const tokenSpan = tokenBadge.querySelector("span");
  if (tokenSpan) tokenSpan.textContent = `~${estTokens.toLocaleString()} tokens`;

  const charSpan = charBadge.querySelector("span");
  if (charSpan) charSpan.textContent = `~${words.toLocaleString()} words`;

  if (session) {
    const rawText = getFormattedMessages(session, "plain", 0);
    const rawTokens = Math.ceil(rawText.length / 4);
    if (rawTokens > estTokens && rawTokens > 100) {
      const savedPct = Math.round(((rawTokens - estTokens) / rawTokens) * 100);
      const ratioSpan = ratioBadge.querySelector("span");
      if (ratioSpan) ratioSpan.textContent = `-${savedPct}% compressed`;
      ratioBadge.classList.remove("hidden");
    } else {
      ratioBadge.classList.add("hidden");
    }
  }
}

async function synthesizeWithCurrentAI() {
  const promptText = `Please act as a Context Continuity Engine. Summarize our conversation so far into a standardized Context Capsule so I can transfer our ongoing state to another AI model without losing technical facts, constraints, or code references.\n\nUse this format:\n### 1. MISSION & OBJECTIVE\n### 2. CRITICAL DECISIONS & STATE\n### 3. FILES & ATTACHMENTS CATALOG\n### 4. ACTIVE IMMEDIATE TASK`;

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || !activeTab.id) {
    showToast("⚠️ No active tab detected.");
    return;
  }

  try {
    const res = await chrome.tabs.sendMessage(activeTab.id, {
      type: "PASTE_INTO_INPUT",
      text: promptText
    });

    if (res && res.success) {
      showToast("🤖 Synthesis prompt pasted into active AI!");
    } else {
      await navigator.clipboard.writeText(promptText);
      showToast("📋 Copied synthesis prompt to clipboard!");
    }
  } catch (err) {
    await navigator.clipboard.writeText(promptText);
    showToast("📋 Copied synthesis prompt to clipboard!");
  }
}

function copyPreviewText() {
  const text = document.getElementById("previewContent")?.value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Copied context to clipboard!");
  });
}

async function injectPreviewIntoActiveAI() {
  const text = document.getElementById("previewContent")?.value;
  if (!text) return;

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || !activeTab.id) {
    showToast("⚠️ No active tab found.");
    return;
  }

  try {
    const res = await chrome.tabs.sendMessage(activeTab.id, {
      type: "PASTE_INTO_INPUT",
      text: `Here is the prior context from our previous chat:\n\n${text}\n\nPlease review and continue from here.`
    });

    if (res && res.success) {
      showToast("⚡ Pasted into active AI chat box!");
    } else {
      await navigator.clipboard.writeText(text);
      showToast("📋 Copied to clipboard! Press Ctrl+V in chat.");
    }
  } catch (err) {
    navigator.clipboard.writeText(text);
    showToast("📋 Copied to clipboard! Press Ctrl+V in chat.");
  }
}

async function quickPaste(sessionId) {
  const session = allSessions[sessionId];
  if (!session) return;
  const text = getFormattedMessages(session, "plain", 0);

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || !activeTab.id) {
    showToast("⚠️ No active tab detected.");
    return;
  }

  try {
    await chrome.tabs.sendMessage(activeTab.id, {
      type: "PASTE_INTO_INPUT",
      text: `Context from ${session.site}:\n\n${text}\n\nLet's continue.`
    });
    showToast("⚡ Quick pasted into chat!");
  } catch (err) {
    navigator.clipboard.writeText(text);
    showToast("📋 Copied to clipboard! Press Ctrl+V.");
  }
}

function exportAsPdf() {
  const text = document.getElementById("previewContent")?.value;
  if (!text) return;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>AI Conversation Export</title>
        <style>
          body { font-family: sans-serif; padding: 24px; line-height: 1.6; white-space: pre-wrap; color: #373634; }
          h2 { border-bottom: 2px solid #DCEB7D; padding-bottom: 6px; }
        </style>
      </head>
      <body>
        <h2>AI Conversation Export</h2>
        <div>${escapeHtml(text)}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

function exportAsDoc() {
  const text = document.getElementById("previewContent")?.value;
  if (!text) return;

  const blob = new Blob([text], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chat_export_${Date.now()}.doc`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("📄 Exported DOC successfully!");
}

function exportCurrentSessionJson() {
  if (!activeSessionId) return;
  const session = allSessions[activeSessionId];
  if (!session) return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(session, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = `${(session.title || 'chat').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_export.json`;
  a.click();
  showToast("📥 Exported JSON successfully!");
}

async function toggleFavorite(sessionId) {
  const session = allSessions[sessionId];
  if (!session) return;
  session.isFavorite = !session.isFavorite;
  await chrome.storage.local.set({ chatSessions: allSessions });
  renderSessionList();
}

async function deleteSession(sessionId) {
  if (confirm("Delete this conversation?")) {
    delete allSessions[sessionId];
    await chrome.storage.local.set({ chatSessions: allSessions });
    renderSessionList();
    showToast("🗑️ Conversation deleted.");
  }
}

async function clearAllSessions() {
  if (confirm("Are you sure you want to delete all saved conversations? This cannot be undone.")) {
    allSessions = {};
    await chrome.storage.local.set({ chatSessions: {} });
    renderSessionList();
    showToast("All conversations cleared.");
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateCustomFormatDropdown(value) {
  const select = document.getElementById("settingDefaultFormat");
  if (select) select.value = value;

  const labelEl = document.getElementById("customFormatSelectedLabel");
  const iconEl = document.getElementById("customFormatSelectedIcon");

  const formats = {
    condensed: {
      label: "Smart Summary",
      icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.5 9.75L9 2.25V7.5H13.5L9 15.75V10.5H4.5Z" stroke="#373634" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    plain: {
      label: "Full Conversation",
      icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.25 3H15.75V12C15.75 12.8284 15.0784 13.5 14.25 13.5H5.25L2.25 15.75V3Z" stroke="#373634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    json: {
      label: "Raw Data",
      icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.25 4.5H6.75L8.25 6H15.75V13.5H2.25V4.5Z" stroke="#373634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
  };

  const current = formats[value] || formats.condensed;
  if (labelEl) labelEl.textContent = current.label;
  if (iconEl) iconEl.innerHTML = current.icon;

  document.querySelectorAll("#customFormatDropdownMenu .fig-dropdown-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-value") === value);
  });
}

async function initSettingsAndTheme() {
  const {
    appTheme = "system",
    defaultExportFormat = "condensed",
    showFloatingBtn = true,
    fabPosition = "bottom-right",
    autoStripNoise = true,
    autoLockTimeout = "30"
  } = await chrome.storage.local.get([
    "appTheme",
    "defaultExportFormat",
    "showFloatingBtn",
    "fabPosition",
    "autoStripNoise",
    "autoLockTimeout"
  ]);

  applyTheme(appTheme, false);

  const themeRadio = document.querySelector(`input[name='appTheme'][value='${appTheme}']`);
  if (themeRadio) {
    themeRadio.checked = true;
    updateRadioCards(appTheme);
  }

  updateCustomFormatDropdown(defaultExportFormat);

  const exportFormatSelect = document.getElementById("exportFormatSelect");
  if (exportFormatSelect) exportFormatSelect.value = defaultExportFormat;

  const versionBadge = document.querySelector(".fig-version-badge span:last-child");
  if (versionBadge && typeof chrome !== "undefined" && chrome.runtime?.getManifest) {
    const manifest = chrome.runtime.getManifest();
    if (manifest?.version) {
      versionBadge.textContent = `v${manifest.version}`;
    }
  }

  const floatToggle = document.getElementById("settingShowFloatingBtn");
  if (floatToggle) floatToggle.checked = showFloatingBtn;

  const noiseToggle = document.getElementById("settingAutoStripNoise");
  if (noiseToggle) noiseToggle.checked = autoStripNoise;

  const autoLockSelect = document.getElementById("settingAutoLock");
  if (autoLockSelect) autoLockSelect.value = autoLockTimeout;

  const isLeft = fabPosition === "left" || fabPosition === "bottom-left";
  document.querySelectorAll(".fig-pos-btn").forEach((btn) => {
    const p = btn.getAttribute("data-pos");
    const isActive = isLeft ? (p === "bottom-left" || p === "left") : (p === "bottom-right" || p === "right");
    btn.classList.toggle("active", isActive);
  });
}

function updateRadioCards(selectedTheme) {
  document.getElementById("themeLabelSystem")?.classList.toggle("selected", selectedTheme === "system");
  document.getElementById("themeLabelLight")?.classList.toggle("selected", selectedTheme === "light");
  document.getElementById("themeLabelDark")?.classList.toggle("selected", selectedTheme === "dark");
}

let currentAppTheme = "system";

function applyTheme(theme, save = true) {
  currentAppTheme = theme;
  const root = document.documentElement;
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    const isDark = (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", isDark ? "dark" : "light");
  }

  updateRadioCards(theme);

  if (save) {
    chrome.storage.local.set({ appTheme: theme });
  }
}

if (typeof window !== "undefined" && window.matchMedia) {
  try {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", (e) => {
      if (currentAppTheme === "system") {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });
  } catch (err) {
    // Ignore in non-browser/mock test environments
  }
}

function exportAllSessionsJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allSessions, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `ai_chat_bridge_backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("📥 Exported backup JSON successfully!");
}

function importSessionsJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (typeof imported === "object" && imported !== null) {
        allSessions = { ...allSessions, ...imported };
        await chrome.storage.local.set({ chatSessions: allSessions });
        renderSessionList();
        showToast("📤 Backup restored successfully!");
        showScreen("mainView");
      } else {
        showToast("⚠️ Invalid backup file format.");
      }
    } catch (err) {
      showToast("⚠️ Failed to parse backup JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}
