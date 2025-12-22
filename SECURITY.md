# Security Policy

The security of this application is a top priority. We appreciate the efforts of security researchers and the community in helping us maintain a secure environment.

##  reporting a Vulnerability

If you discover a security vulnerability, please report it to us as soon as possible. We are committed to working with the community to verify and address any potential vulnerabilities.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to `security@chirag127.dev`.

Please include the following information in your report:

-   A clear and concise description of the vulnerability.
-   The steps to reproduce the vulnerability.
-   The potential impact of the vulnerability.
-   Any suggested mitigations or fixes.

We will acknowledge your email within 48 hours and will work to address the issue promptly. We kindly request that you do not publicly disclose the issue until we have had a chance to address it.

## Security Practices

This project adheres to the following security practices:

-   **No Backend or Server-Side Code**: The application is 100% frontend-only, which significantly reduces the attack surface.
-   **User-Provided API Keys**: All API keys are provided by the user and stored exclusively in the browser's local storage. No keys are ever transmitted to or stored on a server.
-   **No Hardcoded Secrets**: There are no hardcoded API keys, tokens, or other secrets in the codebase.
-   **Dependency Scanning**: We use `npm audit` to regularly scan for vulnerabilities in our dependencies.
-   **HTTPS**: The application should be deployed and accessed over HTTPS to protect data in transit.

Thank you for helping us keep this project secure.
