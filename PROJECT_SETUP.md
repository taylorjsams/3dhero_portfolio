# Project Setup Guide for "Play" Projects

To ensure your hobby projects work seamlessly with the main portfolio site at `taylorsams.design/play/project-name`, follow these simple steps.

## 1. Create Your Project

Create your Next.js project as usual:

```bash
npx create-next-app@latest my-cool-project
```

## 2. Configure `basePath`

Open `next.config.ts` (or `next.config.js`) in your **hobby project** and add the `basePath` property. This tells Next.js that the app is running under a subpath.

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // IMPORTANT: Replace 'my-cool-project' with your actual project folder name
  basePath: '/play/my-cool-project', 
};

export default nextConfig;
```

> **Note:** When running locally (`npm run dev`), your project will now be available at `localhost:3000/play/my-cool-project` instead of just `localhost:3000`.

## 3. Deploy to Vercel

1.  Push your code to a generic GitHub repository (e.g., `taylorsams/my-cool-project`).
2.  Import the project into Vercel.
3.  **Crucial Step:** Go to the **Settings** of your **MAIN PORTFOLIO** project on Vercel (not the hobby project settings).
4.  Navigate to **Rewrites**.
5.  Add a new rewrite:
    *   **Source:** `/play/my-cool-project/:path*`
    *   **Destination:** `https://Resulting-Vercel-URL-of-Hobby-Project/:path*`

Alternatively, the main `next.config.ts` in the portfolio has a wildcard rewrite setup, but explicit rewrites in the Vercel dashboard are often more robust for multi-project setups.

## 4. Add to Gallery

Once deployed, go to `app/play/page.tsx` in the **main portfolio** repo and add a card for your new project!

```tsx
<Link href="/play/my-cool-project" ...>
  ...
</Link>
```
