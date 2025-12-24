# Contributing to AgentData Web Content Ingestion AI Agent (AGENTS.md Compliant)

We are thrilled that you're interested in contributing to this project! As an `AGENTS.md` compliant repository, we adhere to a high standard of engineering and collaboration. Your contributions are vital for the project's success.

## 🚀 Core Principles

Before you begin, please familiarize yourself with the core architectural and philosophical guidelines of this project, as detailed in our `AGENTS.md` file. All contributions must align with these principles, particularly:

-   **Frontend-Only Architecture**: All code must run client-side. No backend servers, databases, or Node.js runtime dependencies.
-   **Multi-Provider AI Orchestration**: AI-related changes must integrate with our `AIService` and support the provider cascade model.
-   **User-Provided API Keys**: No hardcoded secrets. All API keys must be configurable through the UI.

## 🛠️ How to Contribute

1.  **Fork the repository** on GitHub.
2.  **Clone your forked repository** to your local machine.
3.  **Create a new branch** for your changes, following conventional naming (e.g., `feat/new-ai-provider`, `fix/ui-glitch`).
4.  **Make your changes**, ensuring they align with the principles in `AGENTS.md`.
5.  **Write or update tests** to cover your changes. We aim for 100% test coverage.
6.  **Ensure all tests and linting checks pass**: `npm test` and `npm run lint`.
7.  **Commit your changes** using the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
8.  **Push your changes** to your forked repository.
9.  **Create a pull request** against the `main` branch of the original repository, using the provided pull request template.

## 💻 Development Environment Setup

-   **Node.js**: v20 or newer
-   **Package Manager**: npm v10 or newer

```bash
# Install all project dependencies
npm install

# Start the local development server (Vite)
npm run dev

# Run the test suite (Vitest)
npm run test

# Check for linting and formatting issues (Biome)
npm run lint

# Automatically fix formatting issues (Biome)
npm run format
```

## 🎨 Code Style & Quality

We use **Biome** for linting and formatting. It provides a unified toolchain for maintaining code quality. Before committing, please ensure your code is free of any linting errors and is formatted correctly by running `npm run lint` and `npm run format`.

## 🧠 AI Integration Best Practices

When adding or modifying AI-related features, please adhere to the following best practices:

-   **Use the `AIService`**: All external AI API calls must be routed through `src/services/AIService.ts`. Do not make direct `fetch` calls from UI components.
-   **Add New Providers to the Cascade**: If you're adding a new AI provider, it must be added to the `PROVIDER_CASCADE_ORDER` array in `AIService.ts`.
-   **Write Mock API Handlers**: All new providers must have corresponding mock handlers in `tests/AIService.test.ts` to simulate success and failure scenarios.
-   **Prioritize Resilience**: Ensure that your changes gracefully handle API failures and respect the exponential backoff and retry mechanism.

## 🐛 Reporting Bugs & Proposing Features

-   **Bugs**: If you've found a bug, please open an issue using the "Bug Report" template. Provide as much detail as possible, including steps to reproduce the issue.
-   **Features**: For new feature ideas, please open an issue to start a discussion before you begin development. This helps us align on the feature's scope and implementation details.

Thank you for helping us build a more robust and intelligent web!
