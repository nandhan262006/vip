# VIP Studio — Admin Dashboard Plan

## Overview

Build a password-protected admin dashboard at `/admin` that manages **all** website content via Prisma + Turso DB, with Cloudinary for image uploads. Every hardcoded section on the public site will fetch from the database instead.

---

## Tech Stack

- **Database**: Turso (libSQL) via Prisma
- **Image Uploads**: Cloudinary
- **Auth**: Simple password-based (env variable, cookie session)
- **Admin UI**: Tailwind CSS (no external UI library)
- **Framework**: Next.js 16 App Router

---

## Admin Pages

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/admin` | Overview stats, quick links |
| Login | `/admin/login` | Password authentication |
| Services | `/admin/services` | CRUD services (title, description, image, order) |
| Homepage Grid | `/admin/portfolio` | Manage homepage grid content + order |
| Gallery | `/admin/gallery` | CRUD galleries + inline category management (dropdown) |
| Awards | `/admin/awards` | CRUD awards |
| Stats | `/admin/stats` | CRUD stats |
| Quotes | `/admin/quotes` | Edit quote steps, services, pricing |
| Contacts | `/admin/contacts` | View/manage contact form submissions |
| Settings | `/admin/settings` | Phone, WhatsApp, email, address, social links, SEO, hero text |

---

## Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}

model Service {
  id          String  @id @default(cuid())
  title       String
  description String
  imageUrl    String
  order       Int     @default(0)
}

model Category {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  order     Int       @default(0)
  galleries Gallery[]
}

model Gallery {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  coverImage  String
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  images      String   @default("[]")
  date        DateTime @default(now())
  order       Int      @default(0)
}

model Award {
  id           String @id @default(cuid())
  year         String
  title        String
  organization String
  description  String
  order        Int    @default(0)
}

model Stat {
  id          String @id @default(cuid())
  number      String
  label       String
  description String
  order       Int    @default(0)
}

model QuoteStep {
  id       String @id @default(cuid())
  stepId   String @unique
  title    String
  subtitle String?
  type     String
  items    String @default("[]")
  order    Int    @default(0)
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## SiteSetting Keys (seeded with current hardcoded values)

| Key | Example Value |
|---|---|
| `whatsapp` | `919299950999` |
| `phone` | `+919299950999` |
| `email` | `contact@vipstudio.com` |
| `address` | `26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003` |
| `instagram` | `https://www.instagram.com/vipstudios.in/` |
| `facebook` | `https://www.facebook.com/VIPstudiosnellore` |
| `youtube` | `https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7` |
| `googleMaps` | `https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA` |
| `heroTitle` | `Best Photographer in Nellore` |
| `heroSubtitle` | `VIP Studio Wedding Photography` |
| `seoTitle` | `Best Photographer in Nellore \| VIP Studio` |
| `seoDescription` | `National Award Winning Best Photographer in Nellore...` |
| `seoKeywords` | `["best photographer in Nellore", ...]` |

---

## Public Pages — Dynamic Data Sources

| Section | Source |
|---|---|
| Hero (title/subtitle) | `SiteSetting` |
| Services (homepage) | `Service` table |
| Homepage portfolio grid | `Gallery` — latest 10 by date |
| `/portfolio` page | `Gallery` + `Category` tables |
| `/portfolio/[slug]` | `Gallery` by slug |
| About page (bio, awards, stats) | `Award` + `Stat` tables + `SiteSetting` |
| Quote builder | `QuoteStep` table |
| Header/Footer/CTAs | `SiteSetting` |
| JSON-LD / SEO | `SiteSetting` |

---

## Files to Create

```
prisma/schema.prisma
prisma/seed.ts
src/lib/prisma.ts
src/lib/cloudinary.ts
src/lib/auth.ts
src/middleware.ts
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/login/page.tsx
src/app/admin/services/page.tsx
src/app/admin/portfolio/page.tsx
src/app/admin/gallery/page.tsx
src/app/admin/awards/page.tsx
src/app/admin/stats/page.tsx
src/app/admin/quotes/page.tsx
src/app/admin/contacts/page.tsx
src/app/admin/settings/page.tsx
src/app/api/auth/route.ts
src/app/api/upload/route.ts
src/app/api/contact/route.ts
src/app/api/admin/services/route.ts
src/app/api/admin/galleries/route.ts
src/app/api/admin/categories/route.ts
src/app/api/admin/awards/route.ts
src/app/api/admin/stats/route.ts
src/app/api/admin/quotes/route.ts
src/app/api/admin/settings/route.ts
src/app/api/admin/submissions/route.ts
```

## Files to Modify

```
src/app/page.tsx
src/app/layout.tsx
src/app/about/page.tsx
src/app/portfolio/page.tsx
src/app/portfolio/[slug]/page.tsx
src/components/Header.tsx
src/components/Footer.tsx
src/app/robots.ts
next.config.ts
```

---

## Execution Order

| # | Step |
|---|---|
| 1 | Install deps, init Prisma, create Turso + Cloudinary accounts |
| 2 | Write schema, run `npx prisma db push` |
| 3 | Write seed script with current hardcoded data, run seed |
| 4 | Create lib files (prisma.ts, cloudinary.ts, auth.ts) |
| 5 | Create middleware for admin auth |
| 6 | Create API routes (~9 CRUD routes + auth + upload + contact) |
| 7 | Create admin UI (layout, login, 8 admin pages) |
| 8 | Refactor public pages to fetch from DB |
| 9 | Update robots.ts, next.config.ts |
| 10 | Test everything end-to-end |

---

## Environment Variables

```env
DATABASE_URL="libsql://your-db.turso.io"
AUTH_TOKEN="your-turso-auth-token"
ADMIN_PASSWORD="your-secure-password"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_BASE_URL="https://vipstudios.in"
```

---

## Notes

- Categories are managed inline on the Gallery page (dropdown to assign category)
- Quote builder pricing is fully managed from admin (`/admin/quotes`)
- Homepage portfolio grid shows latest 10 galleries by date
- No hero slides or popup video management (removed per user request)
- Image uploads go to Cloudinary folder `vip-studio/{section}/`
- Auth is simple password-based with httpOnly cookie, 24h expiry
