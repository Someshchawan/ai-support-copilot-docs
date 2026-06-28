![Build](https://img.shields.io/github/actions/workflow/status/Someshchawan/ai-support-copilot-docs/deploy.yml?label=build)
![Docusaurus](https://img.shields.io/badge/docusaurus-3.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

# AI Support Copilot — Documentation Site

The deployed documentation site for the [AI Support Copilot](https://github.com/Someshchawan/ai-support-copilot) project, built with Docusaurus and deployed via GitHub Pages with CI/CD.

**Live site:** [someshchawan.github.io/ai-support-copilot-docs](https://someshchawan.github.io/ai-support-copilot-docs/)

## What this site covers

- **Quickstart** — Get running in 5 minutes
- **Core Concepts** — Prompt design, evaluation system, retry logic
- **Guides** — Build a chatbot, run evaluations
- **Reference** — API documentation, all 8 evaluation checks detailed
- **Troubleshooting** — Common issues and fixes

## Why this exists as a separate project

The source code for the AI Support Copilot lives in its own repository. This site demonstrates treating documentation as a product: versioned, deployed, CI-tested, and structured for both human readers and AI agents (via `llms.txt`).

## Tech stack

- **Docusaurus 3** — Static site generator
- **GitHub Actions** — CI/CD pipeline that builds on every push
- **GitHub Pages** — Hosting
- **llms.txt** — Structured metadata for AI agent consumption

## Local development

```bash
npm install
npm start
```

This starts a local dev server at `http://localhost:3000`.

## Build

```bash
npm run build
```

Generates static content in the `build` directory.

## Deployment

Deployment is automatic via GitHub Actions. Every push to `main` triggers a build and deploy to GitHub Pages.

## Author

**Somesh Chawan** — Developer Experience | Technical Documentation | AI Systems

- [LinkedIn](https://linkedin.com/in/somesh-chawan-b29144148)
- [GitHub](https://github.com/Someshchawan)

## License

MIT License
