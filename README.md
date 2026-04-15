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

---

## 💻 Local Setup & Development

### Clone & Install
```bash
npm install
```

### Environment Configuration
Crea un archivo `.env` en `apps/api/` con tus credenciales de **Firebase Service Account**.

### Execution
* **Backend:** `npm run start:local -w api` (Corre en http://localhost:3000)
* **Frontend:** `npm run start -w web` (Corre en http://localhost:4200)

---

## 🧪 Key Engineering Decisions

* **Total Decoupling:** Los componentes de la UI son completamente agnósticos a la fuente de datos. Toda la comunicación se delega a **Facades**, permitiendo que la infraestructura (Firebase) sea fácilmente intercambiable.
* **Strict Typing:** Política de **"Zero Any"** absoluto. El uso de interfaces compartidas en todo el monorepo garantiza seguridad de tipos *end-to-end*, desde la base de datos hasta la vista.
