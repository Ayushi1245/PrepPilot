# 🌸 PrepPilot

A premium, glassmorphism-styled placement preparation dashboard — built as a single-page application to help you track DSA practice, study progress, habits, target companies, and job applications in one beautiful place.

![Status](https://img.shields.io/badge/status-Phase%201%20in%20development-ff69b4)
![Stack](https://img.shields.io/badge/stack-Vite%20%2B%20Vanilla%20JS-6a5acd)
![No Backend](https://img.shields.io/badge/backend-none%20(localStorage)-lightgrey)

---

## ✨ Overview

PrepPilot is a fully client-side placement-prep companion. There's no backend and no sign-up — everything is stored locally in your browser via `localStorage`. It's designed to feel calm and motivating, with a soft pink pastel glass aesthetic, smooth micro-interactions, and light/dark theme support.

## 🧩 Features

### Phase 1 — Core Experience
- **🏠 Dashboard** — Personalized greeting, placement readiness ring, category progress bars, today's plan, quick stats, recent activity, and achievement badges
- **✅ Tasks** — Add, filter, sort, and complete tasks with category and priority tags
- **🔥 Habits** — Habit tracking with streaks, monthly progress, and a GitHub-style contribution heatmap
- **📚 Study Dashboard** — Subject-wise progress (OS, DBMS, CN, OOPs, System Design, DSA Theory) with topic checklists
- **💻 DSA Dashboard** — Problem-solving progress by difficulty and topic, streaks, weekly targets, and revision tracking
- **🏢 Companies** — Track target companies with prep percentage and application stage
- **💼 Applications** — Full Kanban board (Saved → Preparing → Applied → OA → Interview → Offer / Rejected)
- **🤖 AI Coach** — Curated daily focus tips, motivational quotes, and a weekly summary (static content for now — no LLM integration yet)

### Phase 2 — Planned
- **📅 Planner** — Day/week view with draggable time blocks
- **📝 Notes** — Folder-based notes with markdown support, search, and pinning
- **🎤 Interviews** — Mock interview tracker with a question bank and scoring
- **🚀 Projects** — Project cards with tech stack, progress, and milestones
- **📊 Analytics** — Charts for study hours, DSA velocity, habit consistency, and application funnel
- **🏆 Achievements** — Gamified badges and milestone tracking

## 🎨 Design System

PrepPilot uses a three-tier glassmorphism system (`glass-primary`, `glass-secondary`, `glass-floating`) built on CSS custom properties, with full light/dark theme support and a pink/lavender/peach color palette. Typography pairs **Inter** (body) with **Outfit** (headings). Animations respect `prefers-reduced-motion`.

## 🛠 Tech Stack

- **Build tool:** Vite
- **Language:** Vanilla JavaScript (no framework)
- **Styling:** Vanilla CSS (custom design tokens, no CSS framework)
- **Persistence:** Browser `localStorage`
- **Routing:** Lightweight custom hash-based router

## 📁 Project Structure

```
prepilot/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js            # App entry — router, theme, init
│   ├── router.js          # Hash-based SPA router
│   ├── store.js           # localStorage-backed reactive store
│   ├── theme.js            # Light/dark theme toggle + persistence
│   ├── seed.js              # Demo data seeder
│   ├── utils.js            # Date helpers, formatters, ID generators
│   ├── components/         # Reusable UI: sidebar, cards, progress, heatmap, kanban, modal, checkbox, charts
│   ├── pages/               # dashboard, tasks, habits, study, dsa, companies, applications, coach (+ Phase 2 pages)
│   └── styles/              # index, sidebar, components, pages, animations, responsive
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

No environment variables or API keys are required — the app runs entirely in the browser.

## ✅ Verification Checklist

- [ ] Visual check across all pages in both light and dark mode
- [ ] Responsive check at 375px, 768px, and 1440px
- [ ] Data persists across refresh (tasks, habits, Kanban state)
- [ ] Theme choice persists across refresh
- [ ] Interactions work: hover lifts, checkbox animation, progress bar fill, drag-and-drop, modal open/close
- [ ] Accessibility: readable text over glass backgrounds, visible focus states, `prefers-reduced-motion` respected

## 🗺 Roadmap

- [x] Phase 1: Core dashboard, tasks, habits, study, DSA, companies, applications, coach
- [ ] Phase 2: Planner, Notes, Interviews, Projects, Analytics, Achievements
- [ ] Optional: real LLM-powered AI Coach (requires backend + API key)

## 📄 License

Personal project — license not yet decided.
