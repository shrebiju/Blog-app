# Blog App — Frontend Developer Test

A responsive blog application built with **Vite + React + TypeScript**, featuring authentication, blog CRUD, Redux Toolkit state management, form validation, and modern UI using TailwindCSS.

---

## 🚀 Features

- **Authentication**
  - Login & Register forms with Yup validation
  - JWT-based auth (token stored in localStorage)
  - Protected routes (React Router + custom ProtectedRoute)

- **Blog Management**
  - List, Create, Edit, Delete blog posts
  - Redux Toolkit for global state management
  - Toast notifications for all CRUD actions
  - Delete confirmation modal with warning icon
  - Form validation with Yup

- **UI/UX**
  - TailwindCSS styling
  - React Icons for visuals

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Routing:** React Router v7
- **State Management:** Redux Toolkit
- **Forms & Validation:** React Hook Form, Yup
- **UI:** TailwindCSS, React Icons
- **Notifications:** React Toastify
- **API:** [DummyJSON](https://dummyjson.com) (dummy API for CRUD demo)

---

## 📦 Installation

```bash
# Clone repository
git clone <repo-url>
cd blog-app

# Install dependencies
npm install

# Start development server
npm run dev
