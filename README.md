# ✅ React Native To-Do List App

A feature-rich To-Do List mobile application built with **React Native**, supporting task creation, editing, deletion, sharing, and task information views. The app uses **Zustand** for state management and supports **local persistence** via AsyncStorage.

---

## 📱 Screenshots

*(Add screenshots here if available)*

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Zustand** – Lightweight state management
- **AsyncStorage** – Local storage for data persistence
- **NativeWind** (optional if using Tailwind styling)
- **Modular Components** – Organized reusable components

---

## ✨ Features

- 📝 **Add Tasks** – Title & description input
- ✏️ **Edit Tasks** – Update title and details
- ❌ **Delete Tasks** – With confirmation modal
- ℹ️ **Task Info Modal** – View task details
- 📤 **Share Tasks** – Share via WhatsApp, Telegram, Facebook, VK, Clipboard
- 📦 **Persistent Storage** – Saves tasks using AsyncStorage
- ✅ **FlatList UI** – Smooth rendering of task list
- 🧠 **Zustand State** – Central state management with clean updates
- 🎨 **Custom Design** – Material-styled components and modals

---
**##🚀 Getting Started**

Prerequisites
Node.js
Android/iOS emulator or device

Installation
git clone https://github.com/vipusrihar/To-do-list.git
cd To-do-list
npm install
Run on Device or Emulator
npx react-native run-android

---

## 📂 Project Structure Getting Started

```bash
.
├── assets/                # Images like noTask.png
├── components/            # Reusable UI components
│   ├── EditModal.tsx
│   ├── InputContainer.tsx
│   ├── ShareModal.tsx
│   ├── InfoModal.tsx
│   ├── DeleteModal.tsx
│   └── renderItem.tsx
├── store/
│   └── useToDoStore.ts    # Zustand store
├── type/
│   └── types.ts           # TypeScript interfaces
├── utils/
│   └── shareTask.ts       # Sharing logic
├── App.tsx                # Root component
└── ...

---
🔒 AsyncStorage Structure
todos: Array of task objects (id, title, about, created)

taskId: Incremental ID for new tasks



🙌 Author
Vipusa Sriharan

