# 🚀 Enterprise-Grade To-Do Ecosystem | Clean Architecture
### A Full-Stack Monorepo showcasing high-scalability patterns and modern reactive state management.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Application-brightgreen?style=for-the-badge&logo=vercel)](https://app-todo-3f5f6.web.app/)
[![API Docs](https://img.shields.io/badge/API_Docs-Swagger_UI-blue?style=for-the-badge&logo=swagger)](https://api-todo-597539062334.us-central1.run.app/api-docs/)

---

## 🎯 Project Overview
This is a production-ready Task Management system built with **Angular 18** and **Node.js/Express**, leveraging **Firebase (Firestore)**. It serves as a blueprint for implementing **Clean Architecture** to ensure total decoupling between business logic and infrastructure.

## 🏗️ Architectural Core (Clean Architecture)
The project is architected into 4 distinct layers to guarantee maintainability:
- **Domain Layer:** Pure business logic and Entities (Framework agnostic).
- **Application Layer:** Use Cases (Orchestrators) and Facades.
- **Infrastructure Layer:** Firebase Admin SDK, JWT Middleware, and Repository implementations.
- **Presentation Layer:** - **Frontend:** Signal-based reactive UI.
    - **Backend:** Scalable REST API with strict DTO validation.

---

## 🛠️ Technical Deep Dive

### **Frontend (Angular 18+)**
- **Reactive State:** 100% **Signals** and `computed` driven architecture—zero Zone.js overhead where possible.
- **Modern Syntax:** Implementation of **Standalone Components** and the new **Control Flow** (`@if`, `@for`).
- **UI/UX:** Material 3 implementation with dynamic color theming and persistent **Dark/Light Mode**.
- **Performance:** **Optimistic UI** updates for instant user feedback on CRUD operations.

### **Backend (Node.js)**
- **Data Integrity:** **Zod** schema validation for strict runtime type-checking of DTOs.
- **Security:** State-of-the-art **JWT** authentication and atomic Functional Guards.
- **Database:** Optimized Firestore implementation using **Composite Indexes** for complex queries.

---

## 📂 Monorepo Structure (NPM Workspaces)
```text
challenge-fullstack/
├── apps/
│   ├── api/       # Backend (Node.js + Express + Firebase Admin)
│   └── web/       # Frontend (Angular 18 + Signals)
├── package.json   # Centralized workspace management
└── README.md
```
---

## 💻 Local Setup & Development

### Clone & Install:
```bash
npm install
```

### Environment Configuration:
Create a `.env` in `apps/api/` with your **Firebase Service Account** credentials.

### Execution:
* **Backend:** `npm run start:local -w api` (Runs on http://localhost:3000)
* **Frontend:** `npm run start -w web` (Runs on http://localhost:4200)

---

## 🧪 Key Engineering Decisions

* **Total Decoupling:** The UI components are completely unaware of the data source. All communication is delegated to **Facades**, making the infrastructure (Firebase) easily swappable.
* **Strict Typing:** Absolute **"Zero Any"** policy. Shared interfaces across the monorepo ensure end-to-end type safety from the DB to the View.
