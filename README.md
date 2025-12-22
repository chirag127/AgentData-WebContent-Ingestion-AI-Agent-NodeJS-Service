# AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![CI](https://img.shields.io/github/actions/workflow/status/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service?style=flat-square)](https://github.com/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service/commits/main)

Professional website repository for fetching and downloading web content directly in the browser.

---

## ✨ Features

- **Frontend-Only Architecture**: No backend required. Runs entirely in the browser.
- **Multi-Provider AI**: Supports multiple AI providers (Cerebras, Gemini, DeepSeek, etc.) with automatic fallback.
- **User-Provided API Keys**: Securely use your own API keys, stored locally.
- **Spatial-Adaptive UI**: Modern, responsive interface built with Tailwind CSS.
- **Built with Vite & TypeScript**: Fast, modern, and type-safe development environment.

---

## 🏛️ Architecture

```
.
├── .github/                # GitHub Actions and templates
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── services/           # AI Service for multi-provider orchestration
│   │   └── AIService.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles (Tailwind CSS)
├── tests/                  # Test files
│   └── AIService.test.ts
├── .gitignore
├── AGENTS.md               # AI agent directives
├── index.html
├── LICENSE
├── package.json
├── README.md
└── vite.config.ts
```

---

## 🚀 Quickstart

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chirag127/AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service.git
    cd AgentData-WebContent-Ingestion-AI-Agent-NodeJS-Service
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

2.  **Add your API keys:**
    -   Open the application in your browser.
    -   Go to the "API Keys" section.
    -   Enter your API keys for the desired providers.
    -   Click "Save Keys". The keys are stored in your browser's local storage.

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute.

---

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](LICENSE).

---

## ⭐ Star This Repo

If you find this project useful, please consider giving it a star!
