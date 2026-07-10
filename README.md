This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend portfolio connection

Only the portfolio sections read from the backend: the home-page gallery, portfolio filters, project detail pages, previous/next navigation, galleries, stats, process steps, and related work. Set the backend base URL before starting the frontend:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 npm run dev
```

The frontend requests `GET <NEXT_PUBLIC_BACKEND_URL>/api/portfolio` and accepts an array response or common wrapped responses such as `data`, `portfolio`, `projects`, `items`, `results`, `docs`, and nested `data.projects` / `data.docs`. It maps the backend portfolio/project fields including `id`, `slug`, `_id`, `cat`, `category`, `type`, `portfolioCategory`, `year`, `title`, `name`, `projectTitle`, `clientName`, `client`, `tagline`, `headline`, `desc`, `description`, `shortDesc`, `shortDescription`, `excerpt`, `tags`, `technologies`, `services`, `skills`, `thumb`, `image`, `imageUrl`, `thumbnail`, `thumbnailUrl`, `coverImage`, `coverImageUrl`, `gallery`, `stats`, `industry`, `sprint`, `overview_title`, `overviewTitle`, `challenge`, `approach`, `impact`, `compliance`, and `process`, while keeping fallback content if the backend is unavailable.

For a backend-created project to show after saving, the API response must include at least one title field (`title`, `name`, `projectTitle`, or `clientName`). If an image or gallery item is saved as an object, the frontend reads `url`, `src`, `path`, `secure_url`, or `location`. Relative backend asset paths like `/uploads/example.jpg` are expanded with `NEXT_PUBLIC_BACKEND_URL`.

Example portfolio project payload:

```json
{
  "slug": "revti-brand-launch",
  "title": "Revti Brand Launch",
  "category": "Branding",
  "year": "2026",
  "client": "Revti",
  "tagline": "A launch campaign for a modern digital brand.",
  "description": "Long project overview shown on the project detail page.",
  "tags": ["Brand Identity", "Campaign", "Design"],
  "coverImageUrl": "/uploads/revti-brand-launch.jpg",
  "gallery": [{ "url": "/uploads/revti-gallery-1.jpg" }],
  "stats": [{ "num": "3x", "label": "Reach" }],
  "process": [{ "step": "01", "title": "Discovery", "text": "Research and strategy." }]
}
```
