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
#🚀 Getting Started
Follow these instructions to get a copy of the project running on your local machine.

Prerequisites
Node.js 18.17 or later

npm, yarn, or pnpm

A PostgreSQL database (local or hosted, e.g., on Railway or Neon.tech)

OAuth credentials (Google) for authentication

Installation & Setup
Clone the repository

bash
git clone https://github.com/your-username/spark-tinder-clone.git
cd spark-tinder-clone
Install dependencies

bash
npm install
# or
yarn install
# or
pnpm install
Set up environment variables
Copy the example environment file and update it with your secrets.

bash
cp .env.example .env.local
Fill in the required variables in your .env.local file:

bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sparkdb"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Google)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Pusher for real-time features (optional)
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"
Set up the database
Push the Prisma schema to your database to create the tables.

bash
npx prisma db push
# or, if you prefer using migrations:
npx prisma migrate dev --name init
Seed the database (Optional)
Run the script to populate the database with sample user profiles.

bash
npm run script:seed
# or directly with tsx/ts-node
npx tsx scripts/create-face-profile.ts
Run the development server

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 with your browser to see the result.

# 🧪 Available Scripts
npm run dev - Runs the development server.

npm run build - Builds the app for production.

npm run start - Starts the production server.

npm run lint - Runs ESLint to lint the code.

npm run db:studio - Opens Prisma Studio to view and edit database data.

npm run script:seed - Runs the seed script to generate demo profiles.

# 🔐 Authentication
This app uses NextAuth.js for authentication. Currently configured providers:

Google OAuth

Email & Password (Credentials)

User sessions are managed securely with JWT tokens.

# 🤝 Contributing
We are not accepting external contributions to this private project at this time. This codebase is intended for portfolio and educational purposes.

# 📜 License
This project is created for educational and portfolio purposes. The code is available for reference, but it is not licensed for redistribution or commercial use. All rights to the concept and brand "Tinder" belong to Match Group, Inc.

# 👨‍💻 Developer
Zakir Aziz

Portfolio: your-portfolio.com

LinkedIn: Zakir Aziz

GitHub: @zakiraziz
