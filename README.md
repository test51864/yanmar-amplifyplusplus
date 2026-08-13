# YANMAR Amplify++ — Mega Upgrade

A browser-based distributor activation operating system prototype for Yanmar marketing enablement.

## Login

- Username: `Yanmar`
- Password: `Almere`

## What changed in the Mega upgrade

- Complete Yanmar-led visual system: white / graphite / Yanmar red, cleaner cards, stronger hierarchy and less decorative UI noise.
- The YANMAR horizontal brand logo and Flying Y are shown prominently throughout the interface, with a local fallback mark for offline/error states and direct access to the official Yanmar brand page.
- New Brand Centre with identity, brand guardrails, quick source links and downloadable brand reference.
- New premium login experience using official YDG product photography.
- Product Hub now uses product-led visual stages and official product-source shortcuts.
- New SVG navigation icon system and collapsible sticky sidebar.
- Refined sticky top bar, global search and light/dark mode.
- Distributor network pulse and activity feed on the Command Centre.
- Workspace backup / restore / reset controls for Admin.
- Evidence-file selector added to Report Results.
- Campaign plans can be submitted into the local HQ approval queue.
- Governance settings persist locally.
- Service-worker cache version updated so GitHub Pages can replace the previous build cleanly.

## Functional modules

### Distributor workspace

1. Command Centre
2. Product Hub
3. Brand Centre
4. Campaign Builder
5. Content Studio AI
6. SEO & SEA Lab
7. Asset Library
8. Content Calendar
9. Comparison Builder
10. TCO Calculator
11. Localization Hub
12. Market Playbooks
13. Event Kit Builder
14. Co-Marketing Hub
15. Distributor Academy
16. Report Results
17. Support Centre

### Admin workspace

18. Impact Dashboard
19. Approval Centre
20. User Access
21. Admin Console

## Browser functionality

The static prototype supports browser-side login/session state, role switching, local drafts, result reports, support requests, approval queues, calendar items, academy progress, TCO calculations, competitor comparisons, copy generation, SEO readiness checks, SEA asset generation, exports, workspace backup/restore and persisted governance settings.

Data is stored with browser `localStorage`.

## Source-aware tools

The SEO tool is explicitly an **Amplify Search Readiness Score**, not a Google ranking predictor. The interface links to Google Search Essentials.

The SEA builder follows the responsive-search-ad structure used by Google Ads and exposes character counts for generated assets. The interface links to Google Ads documentation.

Official Yanmar brand and product-source links are surfaced inside the portal so users can verify identity and model information before publication.

## Important deployment boundary

This is a static prototype. It is suitable for demonstration and functional proof-of-concept use, but the visible login is not secure enterprise authentication. Real shared accounts, private company data, central database storage, live analytics, real generative AI and organization-wide synchronization require an approved backend and APIs. Never put private API keys in the browser code.

## GitHub Pages

Upload the contents of this folder to the root of the existing repository. `index.html` must remain at repository root. GitHub Pages should publish from `main` and `/(root)`.
