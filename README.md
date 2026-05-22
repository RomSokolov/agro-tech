# AgriField — Agricultural Equipment Marketplace

A commercial catalog website for a dealer of new and pre-owned agricultural
machinery (tractors, harvesters, sprayers, seeders, loaders and tillage
equipment). It includes a marketing home page, a filterable equipment catalog,
detail pages with lead-capture forms, and an internal leads inbox.

## Features

- **Home page** — hero, equipment categories, featured machines, value
  proposition and process sections, with on-scroll animations.
- **Catalog** — server-rendered listing with URL-synced filtering by category,
  brand, condition, price range and minimum power, plus sorting.
- **Equipment detail pages** — full specifications, key facts and a
  "request a quote" form, statically generated per machine.
- **Lead capture** — validated quote and contact forms persisted to the
  database through an API route.
- **Leads inbox** — internal page at `/admin/leads` listing every submission.
- **Responsive UI** — mobile-first layout with a slide-in filter panel and
  mobile navigation.
- **SEO** — per-page metadata, Open Graph tags, `sitemap.xml` and `robots.txt`.

## Tech stack

| Area      | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript   |
| Styling   | Tailwind CSS v4                                   |
| UI        | Custom components on Radix primitives             |
| Animation | Framer Motion                                     |
| Forms     | React Hook Form + Zod validation                  |
| Database  | Prisma ORM with SQLite (driver adapter)           |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The default `DATABASE_URL` points at a local SQLite file and needs no changes
for development.

### Database

Apply the schema and seed the catalog with sample equipment:

```bash
npm run db:migrate
npm run db:seed
```

### Run

```bash
npm run dev
```

The site is available at `http://localhost:3000`.

## Available scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the development server                 |
| `npm run build`    | Production build                             |
| `npm run start`    | Run the production build                     |
| `npm run lint`     | Lint the project                             |
| `npm run db:migrate` | Apply Prisma migrations                    |
| `npm run db:seed`  | Seed the database with sample equipment      |
| `npm run db:reset` | Reset and re-migrate the database            |

## Project structure

```
app/
  catalog/            Catalog listing and equipment detail pages
  admin/leads/        Internal leads inbox
  api/leads/          Lead submission endpoint
  delivery, service, about
components/
  home/               Home page sections
  catalog/            Filter panel and toolbar
  equipment/          Equipment card and generated visuals
  forms/              Lead form
  site/               Header, footer, page header
  ui/                 Reusable primitives (button, input, select, ...)
lib/                  Data access, types, validation, constants
prisma/               Schema and seed script
```

## Notes

- Equipment imagery uses generated SVG visuals so the project runs without
  external assets; real product photos can be added via the `images` field.
- `/admin/leads` is unauthenticated for demonstration purposes — it would sit
  behind authentication in production.

## Deploying to production

SQLite is used for local development. For a hosted deployment (e.g. Vercel),
switch the datasource to PostgreSQL:

1. Change the `datasource` provider in `prisma/schema.prisma` to `postgresql`.
2. Set `DATABASE_URL` to a hosted Postgres connection string.
3. Replace the SQLite driver adapter in `lib/db.ts` with the Postgres adapter.
4. Run `npm run db:migrate` against the new database and `npm run db:seed`.
