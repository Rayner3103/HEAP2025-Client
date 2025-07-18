# Acadiverse — Frontend

[**Acadiverse**](https://heap-2025-client.vercel.app) is a web platform designed to connect tertiary students with academic and professional events. It aggregates events from public sources and allows verified organisations to post events directly. This repository contains the frontend codebase for the Acadiverse platform.

## 🌐 Website Functionality

- 🔎 Event Discovery: View curated academic and professional events relevant to tertiary students.
- 🏢 Organisation Portal: Authenticated organisations can log in to post, update, and manage their events.
- 🗓️ Event Management: Users can view detailed event information and filter by category, date, and location.
- 📱 Responsive Design: Fully responsive UI optimized for desktop and mobile viewing.

## ⚙️ Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS, shadcn/ui
- Icons: Lucide
- Backend API: Flask (FastAPI-style routing)
- Database: Supabase (PostgreSQL)
- Hosting: Render.com (backend), Vercel (frontend)

## 🚀 Running Locally

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn

### Steps

1. Clone the repository

   `git clone https://github.com/your-org/acadiverse-frontend.git`

   `cd acadiverse-frontend`

2. Install dependencies

   `npm install`
   or
   `yarn`

3. Create a `.env` file

   Add the following environment variable:

   `VITE_API_BASE_URL=http://127.0.0.1:10000  # Flask backend URL`
   `VITE_SERVER_ASSET_PATH=http://127.0.0.1:10000/uploads  # Asset serve out path`

4. Run the app

   `npm run dev`
   or
   `yarn dev`

5. Visit the app

   Open your browser at `http://localhost:5173`

## 👥 Collaborators

- [Brian Leong Jie Ren](https://www.linkedin.com/in/brian-leong-jie-ren/) (Technical Lead)
- Joel Soh Zhipeng (Development & Research)
- [Rayner Sim Zhi Heng](http://www.linkedin.com/in/raynersimzhiheng) (Systems& Security)
- [Geri Neo Zili](https://www.linkedin.com/in/geri-neo-8865a3341/) (Technical Development)
- [Leong Yan Lyn](https://www.linkedin.com/in/yan-lyn-leong/) (Strategy & User Experience)

## 🔗 Hosted Link

https://heap-2025-client.vercel.app/





