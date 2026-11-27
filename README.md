# Vibe Blog

A sample blog built with Next.js (App Router), TypeScript, and Tailwind CSS. It serves a home page listing posts and a detail page per post (`/posts/[slug]`), backed by static in-memory data in `src/lib/posts.ts`.

## Run

```bash
npm install
npm run dev
```

The app listens on port **8080** by default. Override it with the `PORT` env var, e.g. `PORT=9000 npm run dev`. `npm run build && npm start` honors `PORT` the same way.

## Comments / database

Comments are stored in Postgres (e.g. Supabase). Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres connection string (TLS is used with `rejectUnauthorized: false`, as Supabase requires). The `comments` table is created automatically on first use; the DDL is also in `db/schema.sql` for reference.

The post body is prerendered; the comments list is a dynamic read wrapped in `<Suspense>` and streams in at request time.
