# 💻 Triage & Recovery Hub - Frontend

<div align="center">

[![Đọc bằng tiếng Việt](https://img.shields.io/badge/Lang-Tiếng%20Việt-red?style=for-the-badge&logo=google-translate&logoColor=white)](./README.vi.md)

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

![Status](https://img.shields.io/badge/Status-Stable-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Theme](https://img.shields.io/badge/Theme-Dark%20%7C%20Glassmorphism-purple?style=flat-square)

**Premium Agent Dashboard for AI Triage System**
_Real-time Monitoring - Instant Responses - Modern UX_

[Backend Repo](https://github.com/MangBao/triage-recovery-hub-be) | [Live Demo](http://localhost:3000) | Report Bug (TODO)

</div>

---

## 🌟 Introduction

**Triage & Recovery Hub Frontend** is a modern, premium dashboard designed for support agents. Built with **Next.js 15** and **React 19**, it features a stunning glassmorphism UI/UX that allows agents to monitor tickets in real-time, review AI-generated drafts, and manage customer support workflows efficiently.

### ✨ Key Features

| Feature                   | Description                                               | Tech                      |
| :------------------------ | :-------------------------------------------------------- | :------------------------ |
| 🎨 **Premium UI/UX**      | Dark theme, glassmorphism, micro-animations, & responsive | `Tailwind CSS`            |
| ⚡ **Real-time Updates**  | Auto-polling ticket status & AI analysis progress         | `SWR` + `Polling Hooks`   |
| 🧠 **AI Integration**     | Display sentiment analysis, urgency scores, and AI drafts | `Next.js App Router`      |
| 🔍 **Advanced Filtering** | Filter by Status, Urgency, Category with premium UI       | `Framer Motion` (planned) |
| 📱 **Responsive Design**  | Fully optimized for Desktop, Tablet, and Mobile           | `Tailwind Responsive`     |

---

## 🏗️ Architecture

```mermaid
graph TD
    User[Support Agent] -->|View/Action| UI[Next.js Frontend]
    UI -->|SWR Poll| API[Next.js API Routes]
    API -->|Proxy| BE[FastAPI Backend]

    subgraph Frontend Components
        Dashboard -->|List| TicketList
        TicketList -->|Item| TicketCard
        Dashboard -->|Detail| TicketDetail
        TicketDetail -->|Edit| TicketForm
    end
```

### 💡 Engineering Decisions

- **Next.js 15 App Router**: Leveraging Server Components for initial data load and Client Components for interactivity.
- **SWR for State Management**: Used for data fetching, caching, and auto-revalidation to keep the dashboard constantly updated without complex state managers.
- **Tailwind CSS + CSS Variables**: "PRO MAX" design system using strict CSS variables for theming, enabling easy switching and consistent design tokens.
- **Glassmorphism**: Custom utility classes (`.glass`, `.glass-card`) implemented in `globals.css` for a unified premium look.

---

## 🚀 Quick Start

### 1️⃣ Prerequisites

- **Node.js 18+**
- **pnpm** (Recommended) or npm/yarn
- **Backend Service** running on port 8000

### 2️⃣ Setup

```bash
# Clone project
git clone https://github.com/MangBao/triage-recovery-hub-fe.git
cd triage-recovery-hub-fe

# Install dependencies
pnpm install
```

### 3️⃣ Configure Environment

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 4️⃣ Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧪 Verification & Build

### Linting

Check code quality and standard compliance:

```bash
pnpm lint
```

### Production Build

Build the application for production deployment:

```bash
pnpm build
pnpm start
```

---

## 🛠️ Tech Stack Details

| Component         | Tech                                                                                          | Version  |
| :---------------- | :-------------------------------------------------------------------------------------------- | :------- |
| **Framework**     | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)          | `15.1`   |
| **UI Library**    | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)                | `19.0`   |
| **Styling**       | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)   | `3.4`    |
| **Languages**     | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | `5.0+`   |
| **Data Fetching** | ![SWR](https://img.shields.io/badge/SWR-000000?logo=vercel&logoColor=white)                   | `2.0+`   |
| **Icons**         | ![Lucide](https://img.shields.io/badge/Lucide-F05032?logo=lucide&logoColor=white)             | `Latest` |

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/MangBao"><b>MangBao</b></a></p>
</div>
