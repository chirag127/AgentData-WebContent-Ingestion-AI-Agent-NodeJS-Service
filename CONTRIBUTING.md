# Contributing to AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service

We're excited that you're interested in contributing! Your help is essential for keeping this project great. Please take a moment to review these guidelines.

## 🚀 How to Contribute

1.  **Fork the repository** on GitHub.
2.  **Clone your forked repository** to your local machine.
3.  **Create a new branch** for your changes: `git checkout -b feature/your-awesome-feature`.
4.  **Make your changes**, adhering to the code style and architectural principles outlined in `AGENTS.md`.
5.  **Add or update tests** for your changes.
6.  **Run the tests** to ensure everything is working as expected: `npm test`.
7.  **Commit your changes** following the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
8.  **Push your changes** to your forked repository.
9.  **Create a pull request** to the `main` branch of the original repository.

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🛠️ Development Setup

-   **Node.js**: v18+
-   **Package Manager**: npm v9+

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run tests
npm test
```

## 🎨 Code Style

We use [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting. Please run `npm run format` and `npm run lint` before committing your changes.

##  Architectural Principles

This project adheres to the principles outlined in `AGENTS.md`. Key principles include:

-   **Frontend-Only Architecture**: No backend code.
-   **Multi-Provider AI Service**: All AI calls go through the `AIService`.
-   **SOLID Principles**: Clean, maintainable, and scalable code.

## 🐛 Reporting Bugs

If you find a bug, please create an issue in our [issue tracker](https://github.com/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service/issues). Please provide as much detail as possible, including steps to reproduce the bug.

## 💡 Proposing Features

If you have an idea for a new feature, please create an issue in our issue tracker to discuss it. This allows us to coordinate our efforts and avoid duplicated work.

Thank you for your contributions!
