# 🛒 GOS — Grocery Ordering System

A full-stack grocery ordering platform built for Phase 1 MVP.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Customer Frontend | Next.js 15, TypeScript, Tailwind CSS, ShadCN UI |
| Admin Dashboard | Next.js 15, TypeScript, Tailwind CSS, ShadCN UI |
| Backend API | NestJS, TypeScript, Modular Monolith |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Storage | AWS S3 |
| Payments | Razorpay |
| Notifications | Email (Nodemailer/SES) + SMS (MSG91) |
| Monorepo | Turborepo |

## Project Structure

```
GOS/
├── apps/
│   ├── web/          # Customer Next.js 15 app   → localhost:3000
│   ├── admin/        # Admin Next.js 15 app       → localhost:3001
│   └── api/          # NestJS backend             → localhost:4000
├── packages/
│   └── shared/       # Shared types, schemas, constants
├── docker-compose.yml
├── turbo.json
└── .env.example
```

## Prerequisites

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose (for local Postgres + Redis)

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url> gos
cd gos
npm install
```

### 2. Set up environment variables

```bash
# Copy and fill in values for each app
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
cp .env.example apps/admin/.env.local
```

### 3. Start local infrastructure (Postgres + Redis)

```bash
docker compose up -d
```

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Seed admin user

```bash
npm run db:seed
```

### 6. Start all apps

```bash
npm run dev
```

This starts:
- **Customer site**: http://localhost:3000
- **Admin dashboard**: http://localhost:3001
- **API**: http://localhost:4000
- **API Docs (Swagger)**: http://localhost:4000/api/docs

---

## Architecture

```
Cloudflare
    ↓
Next.js Frontend (Customer)     Next.js Frontend (Admin)
    ↓                                    ↓
              NestJS REST API
                    ↓
        ┌──────────────────────┐
        │      PostgreSQL      │
        │         Redis        │
        │         AWS S3       │
        └──────────────────────┘
```

## Backend Modules

| Module | Description |
|--------|-------------|
| `auth` | Registration, login, OTP, JWT, refresh tokens |
| `users` | Profile management, addresses |
| `categories` | Category CRUD |
| `products` | Product CRUD, search, filters |
| `cart` | Add/remove/update cart items (Redis cached) |
| `orders` | Order creation, history, status tracking |
| `payments` | Razorpay integration, webhook handler |
| `reviews` | Product reviews, ratings |
| `coupons` | Coupon validation and management |
| `notifications` | Email + SMS (order updates) |
| `upload` | S3 presigned URL generation |

## Authentication Flow

```
Register → OTP Verification → Account Created
Login → JWT Access Token (15m) + Refresh Token (7d)
```

## Roles

| Role | Permissions |
|------|------------|
| `CUSTOMER` | Browse, cart, orders, reviews |
| `ADMIN` | All above + product/category/coupon/user management |

## Deployment (Production)

```
Cloudflare → AWS EC2 (Next.js + NestJS) → PostgreSQL + Redis + S3
```

See `.env.example` for all required environment variables.

---

## License

Proprietary — All rights reserved.
