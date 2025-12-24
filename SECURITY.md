# Security Policy (AGENTS.md Compliant)

The security of this application is a top priority. We appreciate the efforts of security researchers and the community in helping us maintain a secure environment.

## reporting a Vulnerability

If you discover a security vulnerability, please report it to us as soon as possible. We are committed to working with the community to verify and address any potential vulnerabilities.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to a private contact (to be specified by the repository owner).

Please include the following information in your report:

-   A clear and concise description of the vulnerability.
-   The steps to reproduce the vulnerability, including any example inputs.
-   The potential impact of the vulnerability.
-   Any suggested mitigations or fixes.

We will acknowledge your email within 48 hours and will work to address the issue promptly. We kindly request that you do not publicly disclose the issue until we have had a chance to address it.

## Key Security Practices

This project adheres to the security principles outlined in `AGENTS.md §9`, including:

-   **Zero Backend Architecture**: The application is 100% frontend-only, which significantly reduces the attack surface. There is no server to compromise.
-   **Client-Side API Keys**: All API keys are provided by the user and stored exclusively in the browser's local storage. No keys are ever transmitted to or stored on a server.
-   **No Hardcoded Secrets**: The codebase is regularly scanned for hardcoded API keys, tokens, or other secrets as part of our CI/CD pipeline.
-   **Dependency Scanning**: We use `npm audit` to regularly scan for known vulnerabilities in our dependencies.
-   **Prompt Injection Defenses**: While prompt injection is an ongoing area of research, we encourage contributions that help sanitize and validate user inputs to minimize the risk of malicious prompts affecting the AI's output.

Thank you for helping us keep this project secure.
