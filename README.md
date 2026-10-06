# 📺 StreamVault Pro - Premium IPTV Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-success.svg)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

StreamVault Pro is an ultra-modern, high-converting landing page and customer support suite for IPTV streaming services. Designed with a sleek dark-mode glassmorphism aesthetic, smooth micro-interactions, responsive grids, and an automated support chat simulator.

---

## ✨ Features

- ⚡ **Ultra HD 4K & Anti-Freeze Streaming Showcase**: Highlighting 20,000+ live channels and 100,000+ VODs.
- 🎨 **Modern Dark Aesthetic**: Custom glassmorphism, glowing accents, and CSS variables.
- 📱 **100% Responsive**: Tailored layouts for smartphones, tablets, laptops, and ultra-wide screens.
- 🏷️ **Dynamic Pricing Tables**: Multiple plan tiers (1, 3, 6, 12 months) with savings badges and CTA modals.
- 💬 **Interactive Support Center**: Standalone support portal (`support.html`) with knowledge base search and real-time chat bot (`support-chat.js`).
- ❓ **Accessible FAQ Accordion**: Smooth expand/collapse panels for user queries.
- 🚀 **Zero Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript for blazing fast load times.

---

## 📂 Project Structure

```text
├── index.html          # Main landing page
├── style.css           # Global design system, utilities, and components
├── script.js           # Interactive animations, FAQ accordion, modals
├── support.html        # Customer support portal & knowledge base
├── support.css         # Support portal styling
├── support-chat.js     # Live chat bot simulation & ticket handling
├── docs/               # Technical specifications & documentation
│   ├── ARCHITECTURE.md
│   ├── CHANNELS_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── FAQ_TROUBLESHOOTING.md
└── .github/workflows/  # CI workflows
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/AmineArheche/IPTV-landing-page.git
cd IPTV-landing-page
```

### 2. Run locally
You can serve the static files with any HTTP server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js / npx
npx serve -l 3000
```

Open your browser at `http://localhost:3000` to view the landing page.

---

## 📄 License
This project is licensed under the MIT License.
