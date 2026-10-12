# Contributing to PromptPort

Thank you for your interest in contributing to **PromptPort**! We welcome bug reports, feature suggestions, new AI platform integrations, UI improvements, and documentation enhancements.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

---

## Repository Structure

The repository contains the standalone Chrome extension and GitHub community resources:

```
├── manifest.json        # Extension Manifest V3
├── background.js        # Background Service Worker
├── content.js           # Content script (DOM scrapers & chatbox injection)
├── side_panel.html      # Companion Side Panel markup
├── side_panel.css       # Design system styles & themes
├── side_panel.js        # Side Panel logic & state bindings
├── icons/               # Extension icons (16, 32, 48, 128)
└── .github/             # CI workflows, issue templates & PR template
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher) — for running syntax validation.
- Google Chrome, Microsoft Edge, Brave, Arc, or any Chromium browser (v116+).

### Installation & Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Kul-Utkarsh/promptport.git
   cd promptport
   ```
2. Verify JavaScript syntax:
   ```bash
   node -c background.js content.js side_panel.js
   ```
3. Load the unpacked extension into Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** via the toggle in the top-right corner.
   - Click **Load unpacked** (top-left).
   - Select the cloned repository folder.
   - PromptPort is now active and ready for testing!

---

## How to Add a New AI Platform Scraper

Adding support for a new AI chat service (e.g. Mistral, Perplexity, Poe) is straightforward:

### Step 1: Update `manifest.json`
Add the platform's URL pattern to both `host_permissions` and `content_scripts.matches`:
```json
"host_permissions": [
  "*://*.newplatform.com/*"
]
```

### Step 2: Update `detectSite()` in `content.js`
Add the hostname detection check:
```javascript
function detectSite() {
  const host = location.hostname.toLowerCase();
  // ...
  if (host.includes("newplatform.com")) return "NewPlatform";
  return "GenericAI";
}
```

### Step 3: Implement the Scraper in `scrapers` object in `content.js`
Create a dedicated scraper returning an array of `{ role: 'user' | 'assistant', text: string, attachments: Array, ts: number }`:
```javascript
NewPlatform: function () {
  const msgs = [];
  const turns = document.querySelectorAll(".conversation-item, [data-message-role]");
  turns.forEach((turn) => {
    const isUser = turn.getAttribute("data-message-role") === "user";
    const attachments = extractAttachments(turn);
    const clone = turn.cloneNode(true);
    clone.querySelectorAll("button, svg").forEach(b => b.remove());
    const text = clone.innerText.trim();
    if (text || attachments.length > 0) {
      msgs.push({ role: isUser ? "user" : "assistant", text, attachments, ts: Date.now() });
    }
  });
  return msgs;
}
```

### Step 4: Ensure Input Injection Works
In `injectTextIntoChatInput()` in `content.js`, ensure the input selector for the chat composer is included in the `selectors` list.

### Step 5: Validate Syntax
Run a syntax check to verify no syntax errors:
```bash
node -c background.js content.js side_panel.js
```

---

## Quality & Coding Standards

1. **Manifest V3 Content Security Policy**:
   - **Never use inline event handlers** (e.g. `onclick="..."`, `onload="..."`). Use `addEventListener` or event delegation.
   - **Never use `eval()`** or `new Function()`.
   - **Do not load remote scripts or stylesheets**.
2. **Privacy First**:
   - Never send user messages to external analytics or endpoints.
   - Never scrape or store user login tokens, credentials, or session cookies.
3. **Non-blocking UI**:
   - Avoid `window.alert()` or `window.prompt()`. Use `showToast()` or floating badges instead.
4. **Resilient DOM Selectors**:
   - AI platforms frequently change class names. Prefer semantic attributes (`role`, `data-testid`, `aria-label`, element hierarchy) with robust fallbacks.

---

## Pull Request Guidelines

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/add-mistral-scraper
   ```
2. Verify all syntax checks pass locally:
   ```bash
   node -c background.js content.js side_panel.js
   ```
3. Commit your changes with a clear commit message:
   ```bash
   git commit -m "feat(scraper): add Mistral AI chat extraction and input injection"
   ```
4. Push to your fork and open a Pull Request using the [PR Template](.github/PULL_REQUEST_TEMPLATE.md).
