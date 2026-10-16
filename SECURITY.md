# Security Policy

## Supported Versions

The following table indicates which versions of StreamVault Pro currently receive security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :x:                |

---

## 🔒 Reporting a Vulnerability

The StreamVault Pro security team takes security flaws seriously. If you discover a security vulnerability (such as an XSS vector or data leakage issue):

1. **Email us directly** at `security@streamvaultpro.com` or contact `aminearheche@gmail.com`.
2. **Include full reproduction steps**, Proof-of-Concept (PoC) code, and impacted browser environments.
3. Please **do not disclose the issue publicly** until a patch has been published.

---

## 🛡️ Security Best Practices in StreamVault Pro

- **XSS Prevention:** All dynamic chat and user-supplied strings are escaped via strict HTML entity replacement before DOM insertion.
- **Modern Resource Attributes:** All external navigation links use `rel="noopener noreferrer"`.
- **Offline Resilience:** Service worker caching strictly validates origins to avoid caching untrusted third-party payloads.
