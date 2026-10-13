# Changelog

All notable changes to the **PromptPort** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-13

### Added
- **Dynamic Platform Filter Pills**: Replaced static platform filter pills with a reactive filter strip that dynamically generates buttons based on captured chat sessions (`ChatGPT (n)`, `Gemini (n)`, etc.).
- **Auto-Hiding Filter Strip**: Automatically hides the filter pill strip when no chat sessions are captured, keeping the UI completely clean.
- **Port-Based Side Panel State Tracking**: Added long-lived Chrome runtime port connection between Side Panel and Background worker to track open/closed state in real time (`beforeunload` and `pagehide` listeners).
- **Extension Invalidation Guards**: Added `isExtensionValid()` and safe messaging wrappers to content scripts to prevent "Extension context invalidated" console errors upon extension reload.

### Changed
- **Default Theme to System**: Initial startup theme now automatically synchronizes with the user's operating system dark/light theme preference by default.
- **Explicit Capture Only**: Removed automatic background syncing and auto-scheduled sync on DOM mutations, making context capture completely explicit, fast, and user-controlled.
- **Fallback Platform Tagging**: Unknown or non-predefined AI platforms now cleanly map to an "other" category tag.

---

## [1.0.0] - 2026-10-12

### Added
- **Multi-Platform AI Chat Capture**: Universal DOM scraper supporting ChatGPT (OpenAI), Google Gemini, Anthropic Claude, DeepSeek, Grok, Kimi (Moonshot), and Z-AI / ChatGLM / BigModel.
- **Chrome Side Panel Companion**: Native Chrome Side Panel interface built with high-fidelity Figma tokens.
- **Smart Context Transfer Strategies**:
  - *Smart Condensed Summary*: Automatically extracts primary goal, key decisions, technical facts, and recent conversation turns.
  - *Full Conversation Transcript*: Cleans and renders all user/assistant turns with syntax-highlighted code blocks.
  - *Raw Data (JSON)*: Structured export for programmatic usage or LLM system prompts.
- **Cross-Platform Context Injection**: One-click "Quick Paste" and "Inject into Chat" directly inserting formatted context into active target AI chat inputs (ProseMirror, textarea, rich-editor).
- **Token Metrics & Compression Estimator**: Real-time word count and token estimation with compression savings ratio calculation.
- **Attachment Extraction**: Scrapes user-uploaded files, document chips (PDF, CSV, Python, JS), and generated image media cards.
- **Backup & Multi-Format Export**:
  - Export chat history as PDF, DOC/DOCX, or JSON.
  - Full backup JSON export and restoration functionality.
- **Customizable Theming & Floating Action Button (FAB)**:
  - Light, Dark, and System theme synchronization.
  - Toggleable floating capture tray button with left/right positioning.
- **GitHub Community Standards**:
  - Automated GitHub Actions CI workflow for syntax and manifest validation.
  - Automated release packaging workflow (`release.yml`).
  - Issue templates and pull request templates.

### Security
- Compliant with Chrome Extension Manifest V3 Content Security Policy (zero inline `onclick` handlers, zero remote scripts).
- Local-first architecture: All data persisted exclusively in `chrome.storage.local` with zero external network tracking or telemetry.
- Offline font fallbacks for 100% network independence.
