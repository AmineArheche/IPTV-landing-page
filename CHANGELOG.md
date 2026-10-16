# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-10-16

### Added
- **Comprehensive Code Review**: Created technical review report (`docs/CODE_REVIEW.md`) auditing architecture, security, performance, SEO, accessibility, and reliability.
- **XSS & Injection Protection**: HTML entity sanitization (`escapeHTML`) across customer chat messages and bot response parser in `support-chat.js`.
- **Accessibility Enhancements**: Skip-to-content navigation links, WCAG 2.1 AA compliant color contrast, ARIA landmarks, `aria-expanded`, and keyboard accessibility.
- **SEO & Social Graph**: Canonical links, meta keywords, Open Graph (`og:*`), and Twitter Cards tags in `index.html` and `support.html`.
- **JSON-LD Structured Data**: Embedded schema.org `Organization`, `WebSite`, and `FAQPage` microdata for rich Google search snippets.
- **SEO Discovery Assets**: Generated standard `robots.txt` and `sitemap.xml` for search engine crawler indexing.
- **Progressive Web App (PWA)**: Added `manifest.json` and modern vector SVG branding (`icon.svg`).
- **Offline Service Worker**: Implemented cache-first / network-fallback Service Worker in `sw.js` with registration in `script.js`.
- **Responsive & Motion CSS**: Added custom dark glassmorphism scrollbars and `prefers-reduced-motion` media queries.
- **Scroll Performance Optimization**: Replaced repetitive scroll event handlers with `requestAnimationFrame` debouncing and passive event listeners.
- **Interactive Billing Toggle**: Monthly, Quarterly (20% off), and Yearly (50% off) switcher with animated price recalculations.
- **Dynamic Multi-Currency Switcher**: Real-time currency selector supporting USD ($), EUR (€), GBP (£), and CAD ($) across all pricing tiers.
- **Live Channel Lineup Search**: Instant debounced channel search and category filtering in `index.html`.
- **4K Stream Player Preview Modal**: Interactive live channel playback simulation modal with resolution selector and stream telemetry.
- **Broadband Speed Test Widget**: Client-side speed test benchmarking connection bandwidth for 4K 60FPS IPTV streaming readiness.
- **Device Setup Wizard**: Interactive tabbed walkthrough for Amazon FireStick, Smart TVs, Android TV, Apple TV, and PC/Mac.
- **Client-Side Internationalization (i18n)**: Language switcher supporting English (EN), French (FR), Spanish (ES), and Arabic (AR with RTL support).
- **Customer Support Ticket Tracker**: Real-time ticket reference search and status indicator modal (`support.html`).
- **Chat Transcript & Audio Controls**: `.txt` chat log export generator and audio notification mute toggle in `support-chat.js`.
- **GDPR Cookie Consent Banner**: Interactive consent banner with persistent preference storage in `localStorage`.
- **Automated Validation Test Suite**: 31 unit tests and landmark assertions verifying markup, styles, and scripts (`test/run-tests.js`).
- **Continuous Integration Workflow**: Upgraded `.github/workflows/ci.yml` to automatically execute test suites on pull requests and pushes.
- **Community & Governance Docs**: Added `CONTRIBUTING.md` guide and `SECURITY.md` vulnerability reporting policy.
- **Documentation & Badges**: Updated `README.md` with version 1.1.0 badges, architectural structure, and test execution instructions.

## [1.0.0] - 2026-10-08

### Added
- Complete responsive landing page (`index.html`) with 20,000+ live channel showcase.
- Glassmorphism design system (`style.css`) with CSS custom properties.
- Interactive client interactions (`script.js`) for channel filtering, counter animations, and FAQ.
- Dedicated support center (`support.html` and `support.css`).
- Real-time simulation chat widget (`support-chat.js`).
- Complete documentation suite (`docs/`).
- GitHub Actions CI pipeline (`.github/workflows/ci.yml`).
