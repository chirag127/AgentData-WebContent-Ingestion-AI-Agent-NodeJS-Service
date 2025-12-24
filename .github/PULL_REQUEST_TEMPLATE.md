---
name: Pull Request
about: Propose a change to the codebase
title: 'feat: A brief description of the feature'
labels: 'enhancement, needs-review'
assignees: ''

---

### Description

A clear and concise description of the changes being proposed in this pull request.

### Related Issue

Please link to the GitHub issue that this pull request addresses.
-   Fixes #<issue_number>

### Checklist

-   [ ] I have read and understood the contribution guidelines in `CONTRIBUTING.md`.
-   [ ] My changes are fully compliant with the architectural principles in `AGENTS.md`.
-   [ ] I have written or updated tests to cover my changes.
-   [ ] All existing and new tests pass successfully (`npm test`).
-   [ ] My code is free of linting errors (`npm run lint`).
-   [ ] I have updated the `README.md` and any other relevant documentation.
-   [ ] If my changes affect the AI service, I have added or updated mock API handlers in `tests/AIService.test.ts`.
