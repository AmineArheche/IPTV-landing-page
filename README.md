# 📺 StreamVault Pro - Enterprise IPTV Landing Page & Support Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version: 1.1.0](https://img.shields.io/badge/Version-1.1.0-brightgreen.svg)](CHANGELOG.md)
[![Tests: Passing](https://img.shields.io/badge/Tests-31%2F31%20Passing-success.svg)](test/run-tests.js)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple.svg)](manifest.json)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![a11y: WCAG 2.1](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-blue.svg)](docs/CODE_REVIEW.md)

StreamVault Pro is an ultra-modern, high-converting landing page and customer support suite for IPTV streaming services. Built with pure vanilla technologies, zero bloated dependencies, an immersive dark-mode glassmorphism aesthetic, anti-freeze streaming demonstrations, multi-currency pricing, and an AI support simulator.

---

## 📋 Comprehensive Code Review

For an in-depth technical analysis and security evaluation of this codebase, read the [Comprehensive Code Review & Technical Audit Report](docs/CODE_REVIEW.md).

---

## ✨ Key Features

- ⚡ **Ultra HD 4K & Anti-Freeze Showcase**: 20,000+ live TV channels and 100,000+ VOD titles.
- 💱 **Dynamic Multi-Currency Switcher**: Instant on-the-fly currency conversion for **USD ($)**, **EUR (€)**, **GBP (£)**, and **CAD ($)**.
- 🏷️ **Interactive Billing Frequency Switcher**: Monthly, Quarterly (20% off), and Yearly (50% off) billing calculation.
- 🔍 **Live Channel Lineup & Real-Time Filter**: Instant debounced channel finder across Sports, Movies, News, Kids, and Documentaries.
- 🎬 **Simulated 4K Stream Player Modal**: Interactive video player preview with resolution switcher, audio toggle, and edge server telemetry.
- ⚡ **Broadband Speed Test Widget**: Client-side network bandwidth benchmark verifying 4K / 60FPS streaming readiness.
- 📱 **Interactive Device Setup Wizard**: Step-by-step setup walkthroughs for Amazon FireStick, Samsung & LG Smart TVs, Android TV, Apple TV, and Windows/Mac.
- 🌐 **Client-Side Internationalization (i18n)**: Instant language switching for English, French, Spanish, and Arabic with full RTL layout support.
- 🔒 **Enterprise-Grade XSS Sanitization**: Strict HTML entity escaping for all user inputs and bot markdown rendering in support chat.
- 💬 **Support Center & Live Ticket Tracker**: 24/7 AI chat simulator, audio feedback toggle, `.txt` transcript exporter, and real-time ticket tracker lookup.
- 🍪 **GDPR Cookie Consent**: Sleek preference banner with persistent `localStorage` storage.
- 📱 **Progressive Web App (PWA)**: Includes `manifest.json`, modern vector icons, and an offline-resilient `sw.js` Service Worker.
- 🧪 **Zero-Dependency Automated Test Suite**: 31 unit tests and landmark assertions executing in Node.js.

---

## 📂 Project Structure

```text
├── index.html          # Main landing page (Hero, Channels, Player, Devices, Speedtest)
├── style.css           # Global design system, glassmorphism, responsive grid
├── script.js           # Client interactions, currency, i18n, player modal, speedtest
├── support.html        # Customer support portal, ticket tracking, knowledge base
├── support.css         # Support portal & chat system stylesheet
├── support-chat.js     # AI support simulator, ticket status lookup, transcript export
├── sw.js               # Service Worker for offline asset caching
├── manifest.json       # Web App Manifest for mobile PWA install
├── icon.svg            # Modern vector favicon and application icon
├── robots.txt          # Search engine crawler directives
├── sitemap.xml         # XML sitemap for SEO discovery
├── test/
│   └── run-tests.js    # Automated validation and unit test runner
├── docs/               # Technical specifications & documentation
│   ├── ARCHITECTURE.md
│   ├── CHANNELS_GUIDE.md
│   ├── CODE_REVIEW.md
│   ├── DEPLOYMENT.md
│   └── FAQ_TROUBLESHOOTING.md
├── CONTRIBUTING.md      # Open source contribution guidelines
├── SECURITY.md          # Vulnerability disclosure policy
└── .github/workflows/
    └── ci.yml          # GitHub Actions CI workflow (tests & syntax checks)
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/AmineArheche/IPTV-landing-page.git
cd IPTV-landing-page
```

### 2. Run locally
Serve the files with any HTTP server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve -l 3000
```

Open `http://localhost:3000` in your web browser.

---

## 🧪 Running Automated Tests

Run the integrated test suite with Node.js:

```bash
node test/run-tests.js
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---
*Crafted with ❤️ by Amine Arheche - Enterprise Grade IPTV Solution.*
