# Contributing to AgentData-WebContent-Ingestion-Service-NodeJS

Welcome, esteemed developer! We appreciate your interest in contributing to `AgentData-WebContent-Ingestion-Service-NodeJS`. This high-performance NodeJS service is engineered with TypeScript and Vite to provide reliable, server-side web content fetching and persistent storage for advanced AI agents. Your contributions help us maintain and extend this critical component for the AI ecosystem.

By participating in this project, you agree to abide by our [Code of Conduct](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/blob/main/CODE_OF_CONDUCT.md).

## How Can I Contribute?

There are several ways you can contribute to this project:

### Reporting Bugs

Encountered an issue? We appreciate detailed bug reports to help us improve.
1.  Check the [issue tracker](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/issues) to see if the bug has already been reported.
2.  If not, open a new issue using our [Bug Report Template](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/blob/main/.github/ISSUE_TEMPLATE/bug_report.md).
3.  Provide a clear, concise description of the bug, steps to reproduce it, expected behavior, and actual behavior. Include screenshots or error messages if applicable.

### Suggesting Enhancements

Have an idea for a new feature or an improvement to existing functionality?
1.  Check the [issue tracker](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/issues) for similar suggestions.
2.  If your idea is new, open a new issue. Clearly describe the enhancement, its potential benefits, and any technical considerations.

### Submitting Pull Requests

Ready to contribute code? Follow these steps to ensure a smooth submission process:

1.  **Fork the Repository:** Start by forking `AgentData-WebContent-Ingestion-Service-NodeJS` to your GitHub account.
2.  **Clone Your Fork:**
    bash
    git clone https://github.com/YOUR_USERNAME/AgentData-WebContent-Ingestion-Service-NodeJS.git
    cd AgentData-WebContent-Ingestion-Service-NodeJS
    
3.  **Create a New Branch:**
    bash
    git checkout -b feature/your-feature-name-or-fix/your-fix-name
    
    (e.g., `feature/add-api-key-auth` or `fix/connection-timeout-bug`)
4.  **Make Your Changes:** Implement your feature or fix. Ensure your code adheres to our architectural principles and coding standards.

## Getting Started: Local Development Setup

To get your local development environment up and running:

### Prerequisites

*   Node.js (LTS version, currently 20.x or higher)
*   npm or yarn (npm is recommended for consistency)
*   Git

### Installation

1.  **Install Dependencies:**
    bash
    npm install
    # or yarn install
    
2.  **Run Development Server:**
    bash
    npm run dev
    # or yarn dev
    
    This will typically start a development server or a watcher for your TypeScript code, depending on the project's Vite configuration for the backend service.

3.  **Run Tests:**
    bash
    npm test
    # or yarn test
    

## Development Workflow

### Branching Strategy

We follow a simplified [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow):
*   `main` is always deployable.
*   Feature branches are created from `main`.
*   Pull Requests merge back into `main`.

### Commit Guidelines

Please adhere to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages. This helps with automatic changelog generation and semantic versioning.
Examples:
*   `feat: add support for new content source API`
*   `fix(ingestion): resolve data parsing error for malformed HTML`
*   `docs: update contributing guidelines`
*   `refactor(storage): optimize database indexing for retrieval`

### Code Style and Linting

We enforce strict code style and linting using **Biome**. This ensures code consistency and catches potential issues early.
*   **Lint & Format Check:**
    bash
    npm run lint
    # or yarn lint
    
*   **Auto-Format & Fix:**
    bash
    npm run format
    # or yarn format
    
    Please ensure your code passes all linting and formatting checks before submitting a PR.

### Testing

All new features and bug fixes **must** be accompanied by comprehensive tests. We use **Vitest** for unit and integration testing. If applicable (for any E2E scenarios or public API testing), **Playwright** is utilized.
*   **Run All Tests:**
    bash
    npm test
    # or yarn test
    
*   **Run Tests with Coverage:**
    bash
    npm test -- --coverage
    # or yarn test --coverage
    

## Pull Request Guidelines

Before submitting your pull request, please ensure:

1.  **Atomic Changes:** Keep your PRs focused on a single feature or bug fix.
2.  **Descriptive Title & Body:** Use our [Pull Request Template](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/blob/main/.github/PULL_REQUEST_TEMPLATE.md) and provide a clear, concise description of your changes.
3.  **Tests Pass:** All unit and integration tests (and E2E tests if applicable) must pass.
4.  **Linting & Formatting:** Your code must adhere to our Biome configuration.
5.  **Documentation:** Update any relevant documentation (e.g., JSDoc, comments, README) for your changes.
6.  **Review Readiness:** Mark your PR as "Ready for Review" once all checks pass and you believe it's complete.

## Architectural Principles

This project adheres to the following core architectural principles:

*   **Hexagonal Architecture (Ports & Adapters):** Promotes a clean separation between the core domain logic and external concerns (databases, APIs, UI). This enhances testability and maintainability.
*   **SOLID Principles:**
    *   **S**ingle Responsibility Principle
    *   **O**pen/Closed Principle
    *   **L**iskov Substitution Principle
    *   **I**nterface Segregation Principle
    *   **D**ependency Inversion Principle
*   **DRY (Don't Repeat Yourself):** Avoid redundant code by promoting reusable abstractions.
*   **YAGNI (You Aren't Gonna Need It):** Implement only features that are currently required, avoiding over-engineering.

## Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly by following our [Security Policy](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/blob/main/.github/SECURITY.md). Do not open a public issue.

## License

By contributing to `AgentData-WebContent-Ingestion-Service-NodeJS`, you agree that your contributions will be licensed under its [CC BY-NC 4.0 License](https://github.com/chirag127/AgentData-WebContent-Ingestion-Service-NodeJS/blob/main/LICENSE).