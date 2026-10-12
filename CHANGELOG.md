# Changelog

All notable changes to the **PromptPort** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
