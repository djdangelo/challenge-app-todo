# ✅ App ToDo FullStack - Clean Architecture

Aplicación de gestión de tareas construida con **Angular 18** y **Node.js/Express**, respaldada por **Firebase (Firestore)**. Diseñada bajo los principios de **Arquitectura Limpia (Clean Architecture)** para garantizar escalabilidad, mantenibilidad y separación de responsabilidades.

## 🚀 Tecnologías Destacadas

### FrontEnd (Angular 18)
* **Arquitectura:** Clean Architecture (Core, Application, Infrastructure, Presentation).
* **Estado:** Manejo reactivo 100% basado en **Signals** y `computed`.
* **Componentes:** Standalone Components y nuevo Control Flow (`@if`, `@for`).
* **UI/UX:** Angular Material 3 con colores dinámicos y soporte persistente para **Dark/Light Mode**.
* **Seguridad:** Guards funcionales atómicos (`UrlTree`) e Interceptors globales.

### BackEnd (Node.js)
* **Arquitectura:** Capas separadas (Controllers, Services, Repositories).
* **Base de Datos:** Firebase Admin SDK (Firestore) con Índices Compuestos.
* **Validación:** **Zod** para validación estricta de DTOs en tiempo de ejecución.
* **Autenticación:** JWT (JSON Web Tokens) con validación por Middleware.

---

## 📂 Estructura del Monorepo

El proyecto utiliza Workspaces de NPM para manejar ambas aplicaciones en un solo repositorio:

```text
challenge-fullstack/
├── apps/
│   ├── api/       # Backend (Node.js + Express)
│   └── web/       # Frontend (Angular 18)
├── package.json   # Gestión centralizada de dependencias
└── README.md
```

---

## 🛠️ Requisitos Previos

* **Node.js:** v18.x o superior.
* **NPM:** v9.x o superior.
* Archivo de credenciales de Firebase (`Service Account Key`).

---

## 💻 Instalación y Ejecución Local

1. **Clonar e instalar dependencias:**
   Desde la raíz del monorepo, instala todas las dependencias del ecosistema:
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno (Backend):**
   Crea un archivo `.env` en `apps/api/` con tus credenciales de Firebase:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=secret
   
   FIREBASE_PROJECT_ID="tu-project-id"
   FIREBASE_CLIENT_EMAIL="tu-email-de-servicio"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTuLlave\n-----END PRIVATE KEY-----\n"
   ```

3. **Levantar el Backend:**
   En una terminal, desde la raíz del proyecto:
   ```bash
   npm run start:local -w api
   ```
   *(El servidor correrá en http://localhost:3000)*

4. **Levantar el Frontend:**
   En otra terminal, desde la raíz del proyecto:
   ```bash
   npm run start -w web
   ```
   *(La aplicación estará disponible en http://localhost:4200)*

---

## 🧪 Decisiones Arquitectónicas

* **Desacoplamiento Total:** La capa de presentación (`LoginComponent`, `TaskComponent`) ignora por completo el origen de los datos. Toda la comunicación se delega a las Fachadas (`AuthFacade`, `TaskFacade`), las cuales interactúan con la capa de Infraestructura.
* **Optimistic UI:** Las actualizaciones y eliminaciones de tareas reflejan los cambios en la UI de forma instantánea a través de Signals antes de que el servidor responda, mejorando la percepción de velocidad.
* **Zero 'Any':** Tipado estricto en ambos extremos. Uso de interfaces compartidas y validación por Zod para evitar inyección de datos corruptos en Firestore.