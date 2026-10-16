# Contributing to StreamVault Pro

Thank you for your interest in improving StreamVault Pro! We welcome contributions, bug reports, and enhancements.

---

## 🚀 Getting Started

1. **Fork the Repository** on GitHub.
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/<your-username>/IPTV-landing-page.git
   cd IPTV-landing-page
   ```
3. **Serve Locally**:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node.js
   npx serve -l 3000
   ```

---

## 🧪 Running Automated Tests

Before submitting your changes, run the zero-dependency test suite:

```bash
node test/run-tests.js
```

Ensure all syntax and accessibility landmark tests pass.

---

## 📝 Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

- `feat:` New features (e.g. `feat(pricing): add currency toggle`)
- `fix:` Bug fixes (e.g. `fix(chat): sanitize user input`)
- `docs:` Documentation updates
- `style:` Formatting or CSS visual refinements
- `perf:` Performance improvements
- `test:` Test additions or updates
- `ci:` CI workflow modifications

---

## 🛡️ Security Vulnerabilities

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for reporting procedures.
