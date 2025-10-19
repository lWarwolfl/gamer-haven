# Gamer Haven

## Game Modding Platform

A game modding platform built with **Next.js** and **Drizzle ORM**, showcasing a scalable full-stack architecture with type-safe APIs and a clean user experience.

---

## Overview

Gamer Haven lets you manage and distribute game mods with secure authentication, dynamic content, analytics, and an admin dashboard—powered by a modern, type-safe stack.

---

## Core Features

### Content & User Management

* CRUD for games, mods, and versions
* Rich text editing (TipTap)
* Cloud file uploads (Vercel Blob Storage)
* Role-based admin panel and visibility controls

### User Experience

* Responsive UI with dark/light themes
* Advanced search, sorting, and pagination
* PWA-ready
* Form validation (React Hook Form + Zod)

### Analytics

* Download tracking and activity insights
* Dashboard views backed by Drizzle + Supabase

---

## Tech Stack

### Frontend

* **Next.js 15** (App Router, Server Actions)
* **React 19**, **TypeScript**
* **Tailwind CSS**, **shadcn/ui**, **Radix UI**, **Lucide**

### Backend & Database

* **Drizzle ORM** + **PostgreSQL**
* **Supabase** (Auth, SSR)
* **Vercel Blob** (file storage/CDN)

### Utilities

* **TanStack Query** (data fetching/caching)
* **Zustand** (state)
* **Next-Intl** (i18n)
* **Serwist** (PWA/service worker)

---

## Project Structure

```bash
gamer-haven/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routing
│   │   │   ├── (panel)/       # Admin dashboard routes
│   │   │   └── (root)/        # Public application routes
│   │   └── globals & metadata files
│   ├── components/            # React components
│   │   ├── common/           # Business logic components
│   │   ├── layout/           # Layout components
│   │   ├── providers/        # Context providers
│   │   ├── ui/               # Design system components
│   │   └── utils/            # Component utilities
│   ├── drizzle/              # Database layer
│   │   ├── index.ts          # Database connection
│   │   └── schema.ts         # Database schema
│   ├── features/             # Seperated panel feature files
│   ├── i18n/                 # Internationalization config
│   ├── lib/                  # Utility libraries
│   │   ├── hooks/            # Custom React hooks
│   │   ├── supabase/         # Supabase client configuration
│   │   └── utils.ts          # General utilities
│   ├── server/               # Server actions
│   │   ├── feature/          # Feature management actions
│   │   └── schemas/          # Validation schemas
│   └── styles/               # Global styles
├── messages/                 # Translation files
├── public/                   # Static assets
├── Configuration files
└── Documentation
```

---

## Setup

### Prerequisites

* Node.js 18+
* PostgreSQL or Supabase
* npm / pnpm / yarn

### Installation

```bash
git clone <repository-url>
cd gamer-haven
npm install
cp .env.example .env.local
```

Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
```

Run migrations and start:

```bash
npx drizzle-kit push
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

---

## Key Implementations

* Server Actions for type-safe client↔server communication
* Drizzle ORM for schema-safe queries and migrations
* Supabase Auth for sessions and route protection
* Next-Intl for localized routing and SEO
* Serwist for PWA and caching

---

## License

MIT — see [LICENSE](LICENSE)

---
