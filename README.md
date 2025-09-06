# 🔥 Spark - A Tinder Clone
A modern, full-stack dating application inspired by Tinder. Swipe right on new connections and find your match!

https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js

https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript

https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma

https://img.shields.io/badge/PostgreSQL-16.0-4169E1?style=for-the-badge&logo=postgr
esql
https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss

https://img.shields.io/badge/NextAuth.js-5.0-000?style=for-the-badge

</div>
# 📖 Overview
Spark is a full-stack clone of the popular dating app Tinder. It demonstrates key features of a modern web application, including real-time interactions, user authentication, and a responsive, swipeable UI.

Key Features:

Swipe Deck: Browse through user profiles by swiping right (like) or left (pass).

Matches: Get real-time notifications when someone you liked also likes you back.

Messaging: Chat instantly with your matches in a clean messaging interface.

User Profiles: Create and customize your own profile with photos and a bio.

Authentication: Secure login via Google OAuth and email/password using NextAuth.js.

Advanced Filters: Filter potential matches by age, gender, and distance.

# 🚀 Live Demo
(If deployed, add your links here)

Main Application: https://spark-app.vercel.app

Staging Environment: https://spark-staging.vercel.app

# 🛠️ Tech Stack
This project is a showcase of modern full-stack development:

Frontend Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Authentication: NextAuth.js

Database: PostgreSQL

ORM: Prisma

HTTP Client: TanStack Query (React Query)

Real-time Communication: Pusher (or Socket.io)

Deployment: Vercel (Frontend), Railway (Database)

# 📦 Project Structure

spark-tinder-clone/

├── app/                    # Next.js 13+ App Router

│   ├── api/               # API route handlers

│   ├── auth/              # NextAuth.js authentication routes

│   ├── chat/              # Messaging pages

│   ├── dashboard/         # User profile and settings

│   ├── globals.css        # Global styles

│   ├── layout.tsx         # Root layout

│   └── page.tsx           # Home page (Swipe deck)

├── components/            # Reusable UI components

│   ├── ui/                # Basic components (Button, Card)

│   ├── chat/              # Chat components

│   └── deck/              # Swipe card components

├── context/               # React Context for state management

│   └── AuthContext.tsx    # User authentication state

├── lib/                   # Utilities and configurations

│   ├── prisma.ts          # Prisma client instance

│   ├── pusher.ts          # Pusher client setup

│   └── utils.ts           # Helper functions

├── public/                # Static assets

├── scripts/               # Custom scripts

│   └── create-face-profile.ts # Seed script for demo profiles

├── types/                 # TypeScript type definitions

└── ...config files        # ESLint, Next, Tailwind, etc.
