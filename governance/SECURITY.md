# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly. Do **not** open a public GitHub issue.

**Contact:** Open a [private security advisory](https://github.com/DivineDesign333/Github-Dashboard-/security/advisories/new)
via GitHub's Security tab.

We aim to acknowledge all reports within 72 hours and will keep you informed
throughout the remediation process.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Disclosure Policy

- Vulnerabilities are disclosed publicly after a fix is released.
- We follow a 90-day coordinated disclosure timeline.

## Scope

In-scope:
- Cross-site scripting (XSS) in dashboard UI
- Sensitive data exposure via the data service layer
- Dependency vulnerabilities with a direct exploit path

Out-of-scope:
- Vulnerabilities in mock/demo data
- Best-practice recommendations without a concrete exploit
