# Angular Task Manager

A modern, responsive Task Management application built with **Angular 17+ - App create with ANGULAR v.21** and **Firebase**. This project demonstrates scalable architecture, state management with Signals, and a premium "Glassmorphism" UI design.

![Angular](https://img.shields.io/badge/Angular-21%2B-DD0031?style=flat&logo=angular)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- **Authentication System**:
  - Secure login with email verification.
  - Custom registration workflow (User existence check -> Confirm -> Create).
  - Protected routes via `AuthGuard`.

- **Task Management**:
  - **Create & Edit**: Reusable, modal-based dialog for adding and modifying tasks.
  - **Filtering & Sorting**: Real-time search by title/description and sorting (Newest, Oldest, A-Z).
  - **Status Tracking**: Toggle task completion with visual feedback.
  - **Persistence**: All data synced in real-time with Firestore.

- **UI/UX Design**:
  - **Glassmorphism**: Modern aesthetic with backdrop blurs, gradients, and subtle shadows.
  - **Responsive**: Fully optimized for mobile, tablet, and desktop.
  - **Interactive**: Hover effects, loading spinners (`ngx-spinner`), and SweetAlert2 notifications.

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 17+ (Standalone Components, Signals).
- **Backend/DB**: Firebase Firestore.
- **UI Library**: Angular Material & Custom SCSS.
- **Styling**: SCSS with BEM methodology and CSS variables.
- **Utils**: `ngx-spinner` (Loading), `sweetalert2` (Alerts).
- **Architecture**: Clean Architecture / Repository Pattern.

## 📂 Project Structure

```
src/app/
├── core/                   # Singleton services, models, and guards
│   ├── models/             # Interfaces (User, Task)
│   ├── repositories/       # Abstract repository definitions
│   ├── services/           # Application logic (Auth, Task, Loading)
│   └── guards/             # Route protection
├── data/                   # Data layer implementation
│   └── infrastructure/     # Firebase repositories
├── presentation/           # UI layer
│   ├── features/           # Feature modules (Auth, Tasks)
│   └── shared/             # Reusable components (Navbar, Search, Dialogs)
└── environment/            # Firebase configuration
```

## Setup & Installation

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/angular-task-challenge.git
cd angular-task-challenge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Firestore Database** and create a collection `users` and `tasks`.
3. Copy your project configuration keys.
4. Update `src/environments/environment.ts` and `environment.development.ts`:

```typescript
export const environment = {
  production: false,
  useMock: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.firebasestorage.app',
    messagingSenderId: '...',
    appId: '...',
  },
};
```

### 4. Run the Application

```bash
ng serve
```

Navigate to `http://localhost:4200/`.

## Development Notes

- **Mock Mode**: You can switch `useMock: true` in environment files to run without Firebase (uses local storage/simulation).
- **Linting**: Run `ng lint` to check code quality.
- **Build**: Run `ng build` for production artifacts.

## License

This project is open source and available under the [MIT License](LICENSE).
