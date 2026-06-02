<p align="center">
  <img src="logos/vox-austral-sol.svg" alt="Vox Austral" width="140" />
</p>

<h1 align="center">Vox Austral</h1>

A pixel-art adventure game, playable 100% from the browser and built mobile-first.
The UI is in Argentine Spanish; the codebase is in English.

## Tech stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (design tokens defined in `src/index.css` `@theme` and mirrored in `src/theme/colors.ts`)
- **Supabase** for authentication (Google OAuth + email/password) and player data
- **React Router** for navigation
- Phaser 3 will be integrated later for the pixel-art gameplay

## Design tokens

- **Palette:** see `src/theme/colors.ts` (pastel / soft, friendly aesthetic).
- **Typography (Google Fonts):**
  - `Jacquard 24` — game title only (`font-display`)
  - `Playfair Display` — UI titles & subtitles (`font-serif`)
  - `Space Mono` — in-game text: dialogue, missions (`font-mono`)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase credentials
npm run dev
```

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **anon public key** (Project Settings → API) into `.env`.
3. Enable the **Google** provider under Authentication → Providers and add your
   Google OAuth client ID/secret. Set the redirect URL to your app origin
   (e.g. `http://localhost:5173` for local dev).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Project structure

```
src/
├── components/        # Reusable UI (Button, TextField)
├── features/auth/     # Auth screen, hook and types
├── lib/               # Supabase client
├── theme/             # Color palette (single source of truth)
├── App.tsx            # Router
└── main.tsx           # Entry point
```
