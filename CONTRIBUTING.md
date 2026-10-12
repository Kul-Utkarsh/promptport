# Contributing to PromptPort

Thank you for your interest in contributing to **PromptPort**! We welcome bug reports, feature suggestions, new AI platform integrations, UI improvements, and documentation enhancements.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

---

## Repository Structure & Workflow

To maintain clean public releases while preserving full testing harnesses, the repository is split into two zones:

```
├── dev/                 # Active development environment
│   ├── background.js    # Service worker
│   ├── content.js       # Content script (scrapers & injection)
│   ├── side_panel.js    # UI logic
│   ├── side_panel.html  # UI markup
│   ├── side_panel.css   # Styles
│   ├── manifest.json    # Development manifest
│   ├── tests/           # Unit tests & browser mocks
│   └── figma_icons/     # Design source references
├── public/              # Clean public distribution & GitHub release package
│   ├── (production runtime files & documentation)
└── scripts/
    └── sync_public.js   # Automated synchronization script
```

> [!IMPORTANT]
> **Always make code modifications inside `dev/`**.  
> When you run `npm run sync:public`, your tested changes in `dev/` are validated and synchronized into `public/`.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- Google Chrome, Microsoft Edge, Brave, or any Chromium browser (v116+)

### Installation & Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chat-context-bridge.git
   cd ai-chat-context-bridge
   ```
2. Verify existing tests:
   ```bash
   npm test
   ```
3. Load the unpacked extension into Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** via the toggle in the top-right corner.
   - Click **Load unpacked**.
   - Select either the `dev/` folder (for live debugging) or `public/` folder.

---

## How to Add a New AI Platform Scraper

Adding support for a new AI chat service (e.g. Mistral, Perplexity, Poe) is straightforward:

### Step 1: Update `dev/manifest.json`
Add the platform's URL pattern to both `host_permissions` and `content_scripts.matches`:
```json
"host_permissions": [
  "*://*.newplatform.com/*"
]
```

### Step 2: Update `detectSite()` in `dev/content.js`
Add the hostname detection check:
```javascript
function detectSite() {
  const host = location.hostname.toLowerCase();
  // ...
  if (host.includes("newplatform.com")) return "NewPlatform";
  return "GenericAI";
}
```

### Step 3: Implement the Scraper in `scrapers` object in `dev/content.js`
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
In `injectTextIntoChatInput()` in `dev/content.js`, ensure the input selector for the chat composer is included in `selectors` list.

### Step 5: Test and Sync
Run the test suite and sync:
```bash
npm test
npm run check
npm run sync:public
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
2. Verify all tests pass locally:
   ```bash
   npm test
   npm run check
   npm run sync:public
   ```
3. Commit your changes with clear commit messages:
   ```bash
   git commit -m "feat(scraper): add Mistral AI chat extraction and input injection"
   ```
4. Push to your fork and open a Pull Request using the [PR Template](.github/PULL_REQUEST_TEMPLATE.md).
