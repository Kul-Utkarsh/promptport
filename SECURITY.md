# Security Policy

The **PromptPort** team takes the security and privacy of our users very seriously. As a tool designed to capture, format, and transfer conversation history between artificial intelligence platforms, privacy and data confidentiality are fundamental architectural tenets.

---

## Supported Versions

Only the latest released version receives active security patches.

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

---

## Reporting a Vulnerability

If you discover a security vulnerability or privacy flaw in PromptPort, please report it responsibly:

1. **Do not open a public GitHub issue** for undisclosed security vulnerabilities.
2. Please report the issue via GitHub's **Private Security Advisory** feature on the repository:
   - Navigate to **Security** -> **Advisories** -> **New draft advisory**.
   - Provide a detailed description of the vulnerability, reproduction steps, and potential impact.
3. We will acknowledge receipt of your report within **48 hours** and provide a mitigation timeline or patch release.

---

## Architecture & Privacy Model

PromptPort operates on a **100% Client-Side, Zero-Telemetry** architecture:

1. **No External Servers**: PromptPort does not operate any backend server, API gateway, database, or proxy. 
2. **Local Storage**: All captured chat transcripts, custom titles, favorites, and settings are stored locally on your device via Chrome's native [`chrome.storage.local`](https://developer.chrome.com/docs/extensions/reference/api/storage#property-local) API.
3. **Zero Telemetry or Analytics**: The extension contains no Google Analytics, PostHog, Mixpanel, or third-party tracking scripts.
4. **Offline Resilience**: The extension operates entirely offline. It does not load external scripts or execute remote code, adhering strictly to Manifest V3 security rules.
5. **No Token or Credential Storage**: The extension extracts only rendered chat turns from the DOM. It never reads or stores session cookies, OAuth tokens, API keys, or login credentials.

---

## Chrome Extension Permissions Justification

In compliance with the Chrome Web Store Minimum Permissions Policy, every permission requested is strictly necessary for core functionality:

| Permission | Technical Requirement & Justification |
| :--- | :--- |
| `storage` | Required to store captured conversation sessions and user preferences locally on device. |
| `activeTab` | Required to detect the active AI platform and interact with the current chat window upon user command. |
| `tabs` | Required to track SPA navigation and query active tab IDs for context injection. |
| `scripting` | Required to dynamically dispatch context insertion events into the active chat input field. |
| `clipboardWrite` | Required for the "Copy to Clipboard" and "Quick Paste" actions. |
| `sidePanel` | Required to host the companion Side Panel UI alongside chat conversations. |
| `host_permissions` | Restricted strictly to supported AI chat services (ChatGPT, Gemini, Claude, DeepSeek, Grok, Kimi, Z-AI/ChatGLM, InternLM) to allow the content script to read conversation turns and inject text. |

---

## Content Security Policy (CSP)

PromptPort enforces Manifest V3 Content Security Policy:
- Disallows `unsafe-eval`.
- Disallows all remote script execution (`script-src 'self'`).
- Disallows inline script tags and inline event handlers (`onclick`, etc.).
