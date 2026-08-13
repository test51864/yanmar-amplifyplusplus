# Security boundary — YANMAR Amplify++

This repository is a front-end proof of concept.

- The username/password interaction is a demonstration, not secure authentication.
- Browser state is stored locally and is not a protected central database.
- Do not store confidential customer, distributor, employee or company information in this build.
- Do not place API keys, tokens or secrets in `app.js`, `mega.js`, HTML or other browser-delivered files.
- A production deployment requires server-side authentication, role-based authorization, secure storage, encryption, audit logging, backups, privacy review and approved API integrations.
- AI-generated and localized copy remains draft material until reviewed by an appropriate product/market specialist.
