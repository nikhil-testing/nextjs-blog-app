# Vibe Blog

A sample blog built with Next.js (App Router), TypeScript, and Tailwind CSS. It serves a home page listing posts and a detail page per post (`/posts/[slug]`), backed by static in-memory data in `src/lib/posts.ts`.

## Run

```bash
npm install
npm run dev
```

The app listens on port **8080** by default. Override it with the `PORT` env var, e.g. `PORT=9000 npm run dev`. `npm run build && npm start` honors `PORT` the same way.

> Comments and Postgres persistence are coming in a follow-up.
