# FilmIsBest - Agent Instructions

This document provides comprehensive guidance for AI agents working on the FilmIsBest project.

## Project Overview

FilmIsBest is a multilingual movie discovery and management platform built with Next.js. It serves as both a public-facing movie browsing website and an admin portal for content management. The project integrates with Sanity CMS for content management, uses Prisma with MongoDB for data persistence, and includes authentication via NextAuth.js.

**Live Site:** https://filmisbest.com/  
**Repository:** https://github.com/yusifaliyevpro/FilmIsBest

## Technology Stack

### Core Framework

- **Next.js 16.1.6** - App Router
- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type safety
- **Node.js** - Requires >=22.0.0 <23.0.0 || >=24.0.0 <25.0.0

## Important Configuration Files

### `next.config.ts`

- React Compiler enabled (`reactCompiler: true`)
- Typed routes enabled
- Component caching enabled (`cacheComponents: true`)
- Global not-found enabled (experimental)
- Image optimization for Sanity CDN (`cdn.sanity.io`)
- Next-intl plugin configured

### `tsconfig.json`

- Path aliases: `@/*` maps to `src/*`
- Strict mode enabled
- JSX: preserve

### `eslint.config.mjs`

- Next.js recommended config
- Prettier integration

### `globals.css`

- HeroUI theme integration
- Tailwind base, components, utilities
- Custom colors, fonts, animations

### Content Management

- **Sanity CMS 5.8.1** - Headless CMS for movie data
- **next-sanity 12.1.0** - Next.js integration for Sanity
- **@sanity/react-loader 2.0.7** - React SDK for Sanity

### Database & ORM

- **Prisma 6.19.2** - ORM
- **MongoDB** - Database (via Prisma)
- **@prisma/client 6.19.2** - Generated in `src/generated/prisma/`

### Authentication

- **NextAuth.js 5.0.0-beta.30** - Authentication
- **@auth/prisma-adapter 2.11.1** - Prisma adapter for NextAuth
- **GitHub OAuth** - Primary authentication provider

### UI & Styling

- **Tailwind CSS 4.1.18** - Utility-first CSS
- **HeroUI** - Component library (@heroui/\* packages)
- **Motion 12.33.0** - Animation library
- **@lottiefiles/dotlottie-react 0.17.14** - Lottie animations
- **React Icons 5.5.0** - Icon library
- **Swiper 12.1.0** - Carousel/slider

### Internationalization

- **next-intl 4.8.2** - i18n support for Next.js
- **Supported locales:** English (en), Azerbaijani (az), Turkish (tr)
- **Default locale:** en

### State & Data Management

- **nuqs 2.8.8** - URL search params state management
- **use-debounce 10.1.0** - Debouncing utilities
- **Fuse.js 7.1.0** - Fuzzy search

### External APIs

- **OMDB API** - Movie data fetching
- **OpenRouter AI** - AI-powered descriptions (@openrouter/ai-sdk-provider, ai package)

### Development Tools

- **pnpm** - Package manager (use exclusively)
- **ESLint 9.39.1** - Linting
- **Prettier 3.8.1** - Code formatting
- **Babel React Compiler 1.0.0** - React compiler plugin

## Project Structure

```
filmisbest/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Localized routes (en, az, tr)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── about/                # About page
│   │   │   └── movies/               # Movie routes
│   │   │       ├── (movie)/          # Individual movie pages
│   │   │       └── (movies)/         # Movie list pages
│   │   ├── admin/                    # Admin panel
│   │   ├── api/                      # API routes
│   │   │   ├── auth/[...nextauth]/   # NextAuth endpoints
│   │   │   └── og/                   # Open Graph image generation
│   │   ├── studio/                   # Sanity Studio
│   │   │   └── [[...tool]]/          # Studio catch-all route
│   │   ├── globals.css               # Global styles
│   │   ├── manifest.ts               # PWA manifest
│   │   ├── robots.ts                 # robots.txt generator
│   │   └── sitemap.ts                # Sitemap generator
│   │
│   ├── components/                   # React components
│   │   ├── admin-*.tsx               # Admin-specific components
│   │   ├── movie-*.tsx               # Movie-related components
│   │   ├── header.tsx, footer.tsx    # Layout components
│   │   └── providers.tsx             # App providers wrapper
│   │
│   ├── data/                         # Data fetching layer
│   │   ├── ai/actions.ts             # AI-powered features
│   │   ├── omdb/get.ts               # OMDB API integration
│   │   ├── prisma/                   # Prisma operations
│   │   │   ├── requests/             # Movie requests CRUD
│   │   │   │   ├── actions.ts        # Server actions
│   │   │   │   └── get.ts            # Read operations
│   │   └── sanity/                   # Sanity queries
│   │       ├── movies/get.ts         # Movie queries
│   │       └── sequel/get.ts         # Sequel/series queries
│   │
│   ├── sanity/                       # Sanity CMS configuration
│   │   ├── schemaTypes/              # Sanity schema definitions
│   │   │   ├── index.ts
│   │   │   ├── movie.ts              # Movie document type
│   │   │   └── sequel.ts             # Sequel/series type
│   │   ├── components/               # Sanity Studio custom components
│   │   │   ├── GenerateDescription.tsx
│   │   │   ├── GetMovieDataFromOMDB.tsx
│   │   │   ├── SearchOnYoutube.tsx
│   │   │   └── SearchPoster.tsx
│   │   ├── lib/                      # Sanity utilities
│   │   │   ├── client.ts             # Sanity client setup
│   │   │   ├── image.ts              # Image URL builder
│   │   │   └── live.ts               # Live preview config
│   │   ├── env.ts                    # Sanity env vars
│   │   ├── structure.ts              # Studio structure
│   │   └── types.ts                  # Sanity TypeScript types
│   │
│   ├── i18n/                         # Internationalization
│   │   ├── routing.ts                # Locale routing config
│   │   ├── request.ts                # Request context
│   │   └── navigation.ts             # Localized navigation
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── auth.ts                   # NextAuth configuration
│   │   ├── prisma.ts                 # Prisma client instance
│   │   ├── env.ts                    # Environment validation (Zod)
│   │   ├── constants.ts              # App constants
│   │   ├── validation.ts             # Validation schemas
│   │   └── *.ts                      # Various utilities
│   │
│   ├── generated/                    # Generated files
│   │   └── prisma/                   # Prisma client (custom output)
│   │
│   └── proxy.ts                      # Proxy utilities
│
├── prisma/
│   └── schema.prisma                 # Prisma schema (MongoDB)
│
├── messages/                         # Translation files
│   ├── en.json                       # English
│   ├── az.json                       # Azerbaijani
│   └── tr.json                       # Turkish
│
├── public/                           # Static assets
│   ├── HomePageAnimation.lottie      # Lottie animation
│   └── flags/                        # Language flags
│
├── assets/
│   └── fonts/                        # Custom fonts
│
├── sanity.config.ts                  # Sanity Studio config
├── sanity.cli.ts                     # Sanity CLI config
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
├── postcss.config.mjs                # PostCSS config
├── package.json                      # Dependencies & scripts
└── pnpm-lock.yaml                    # Lockfile
```

## Key Features

### 1. Multilingual Support

- Three languages: English (en), Azerbaijani (az), Turkish (tr)
- Routes use `[locale]` dynamic segment
- Translation files in `messages/` directory
- Language switcher in header

### 2. Movie Management

- **Public:** Browse, search, filter movies
- **Admin:** Add, edit, delete movies via Sanity Studio
- Integration with OMDB API for automatic metadata
- Movie sequels/series support
- Poster image management via Sanity CDN

### 3. Authentication & Authorization

- GitHub OAuth via NextAuth.js
- Admin access controlled by `ADMIN_EMAIL` env var
- Session stored in MongoDB via Prisma adapter
- Protected admin routes and API endpoints

### 4. Content Management (Sanity)

- Studio accessible at `/studio` route
- Custom input components for enhanced editing:
  - Generate AI descriptions
  - Fetch OMDB data
  - Search YouTube trailers
  - Search/upload posters
- Vision tool for GROQ query testing

### 5. Movie Requests

- Users can request movies via forms
- Stored in MongoDB via Prisma
- Admin can mark requests as added
- Email collection for user tracking

### 6. Search & Discovery

- Client-side fuzzy search with Fuse.js
- Debounced search input
- Pagination support
- Recently added movies section

### 7. SEO & Metadata

- Dynamic sitemap generation
- robots.txt generation
- Open Graph image generation (API route)
- PWA manifest
- Optimized meta tags per page

## Development Guidelines

### Code Style

- **TypeScript:** Always use strict typing, avoid `any`
- **Imports:** Organized and sorted (via prettier plugin)
- **Components:** Functional components with hooks
- **Server Components:** Default in App Router unless interactivity needed
- **Client Components:** Mark with `"use client"` directive
- **Server Actions:** Use for mutations, mark with `"use server"`
- **File naming:** kebab-case for files, PascalCase for components

### Best Practices

1. **Type Safety:** Use Zod for validation, especially for env vars and forms
2. **Error Handling:** Always handle errors gracefully with try-catch
3. **Data Fetching:**
   - Server Components for initial data
   - Server Actions for mutations
   - Use React Query/SWR if client-side fetching needed
4. **Styling:** Use Tailwind utility classes, HeroUI components
5. **Internationalization:** Always wrap user-facing text with `useTranslations()`
6. **Performance:** Optimize images, use Next.js Image component
7. **Accessibility:** Semantic HTML, ARIA labels where needed

### Agent Skills

This project has agent skills installed in `.agents/skills/`:

- `find-skills` - Discover and install additional skills
- `frontend-design` - Create production-grade UI components
- `next-best-practices` - Next.js best practices
- `sanity-best-practices` - Sanity CMS best practices
- `vercel-composition-patterns` - React composition patterns
- `vercel-react-best-practices` - React optimization guidelines

**Use these skills when working on related tasks!**

## Database & Prisma

### Schema (`prisma/schema.prisma`)

- **Provider:** MongoDB
- **Output:** Custom path `src/generated/prisma/`
- **Models:**
  - `MovieRequests` - User movie requests
  - `User`, `Account`, `Session`, `VerificationToken` - NextAuth models
  - `Authenticator` - WebAuthn support (optional)

### Common Commands

```bash
# Push schema changes (used in build)
pnpm prisma db push

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio
```

### Usage

```typescript
import { prisma } from "@/lib/prisma";

// Example query
const requests = await prisma.movieRequests.findMany({
  where: { isAdded: false },
  orderBy: { createdAt: "desc" },
});
```

## Sanity CMS

### Configuration

- **Project ID:** From `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Dataset:** From `NEXT_PUBLIC_SANITY_DATASET`
- **API Version:** Defined in `src/sanity/env.ts`
- **Studio Path:** `/studio` (mounted in `src/app/studio/[[...tool]]/page.tsx`)

### Schema Types

1. **Movie** (`Movie-studio` document)
   - filmName, slug, imdbID
   - movieTime, imdbpuan (rating)
   - poster (image), description
   - trailerLink, releaseDate, genres
   - Custom input components for data enrichment

2. **Sequel** (Series/sequels grouping)
   - Groups related movies

### Type Generation

```bash
# Generate TypeScript types from Sanity schema
pnpm typegen
```

### Querying

```typescript
import { client } from "@/sanity/lib/client";

// Example GROQ query
const movies = await client.fetch(`
  *[_type == "Movie-studio"] | order(_createdAt desc) {
    _id,
    filmName,
    slug,
    poster,
    imdbpuan
  }
`);
```

## Authentication (NextAuth.js)

### Configuration (`src/lib/auth.ts`)

- **Provider:** GitHub OAuth
- **Adapter:** Prisma with MongoDB
- **Session:** Max age 24 hours (3600 \* 24 seconds)

### Admin Check

Only users with email matching `ADMIN_EMAIL` env var have admin access.

```typescript
import { auth } from "@/lib/auth";

const session = await auth();
const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
```

### Protecting Routes

Use middleware or check auth in Server Components/Actions:

```typescript
const session = await auth();
if (!session) redirect("/api/auth/signin");
```

## Internationalization (i18n)

### Supported Locales

- `en` (English) - Default
- `az` (Azerbaijani)
- `tr` (Turkish)

### Configuration (`src/i18n/routing.ts`)

```typescript
export const locales = ["en", "az", "tr"] as const;
export const routing = defineRouting({ locales, defaultLocale: "en" });
```

### Usage in Components

```typescript
import { useTranslations } from "next-intl";

export function Component() {
  const t = useTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}
```

### Adding Translations

Add keys to all files in `messages/`:

- `messages/en.json`
- `messages/az.json`
- `messages/tr.json`

### Navigation

Use localized navigation from `src/i18n/navigation.ts`:

```typescript
import { Link } from "@/i18n/navigation";

<Link href="/about">About</Link> // Automatically localized
```

## External API Integrations

### 1. OMDB API

- **Purpose:** Fetch movie metadata (title, year, poster, rating, etc.)
- **File:** `src/data/omdb/get.ts`
- **Env Var:** `OMDB_API_KEY`
- **Usage:** Primarily in Sanity Studio custom components

### 2. OpenRouter AI

- **Purpose:** Generate movie descriptions using AI
- **File:** `src/data/ai/actions.ts`
- **Env Var:** `OPENROUTER_API_KEY`
- **Usage:** Server actions for AI-powered content generation

## Environment Variables

Required environment variables (validated in `src/lib/env.ts` with Zod):

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Database
DATABASE_URL=mongodb+srv://...

# External APIs
OMDB_API_KEY=your_omdb_key
OPENROUTER_API_KEY=your_openrouter_key

# Authentication
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
AUTH_TRUST_HOST=true
ADMIN_EMAIL=admin@example.com
```

**Note:** All env vars are validated at startup. Missing or invalid vars will throw an error with details.

## Common npm Scripts

```bash
# Development
pnpm dev                 # Start dev server (localhost:3000)

# Building
pnpm build              # Prisma push + Next.js build (production)
pnpm devbuild           # Next.js build only (without Prisma push)
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Auto-fix ESLint issues

# Sanity
pnpm typegen            # Generate Sanity TypeScript types

# Prisma (not in package.json, use directly)
pnpx prisma db push     # Push schema to DB
pnpx prisma generate    # Generate client
pnpx prisma studio      # Open Prisma Studio GUI
```

## IDE & Workspace

### Recommended Extensions (VSCode)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma (for schema editing)
- Sanity.io (if available)

### Workspace Features

- Agent skills in `.agents/skills/`
- Use skills for complex tasks (especially UI design, Sanity, Next.js)

## Deployment

### Platform

Likely deployed on **Vercel** (mentioned in README)

### Build Process

1. `prisma db push` - Ensure schema is synced
2. `next build` - Build Next.js app
3. Outputs to `.next/` directory

### Environment

Set all required env vars in deployment platform.

### Post-Deployment

- Verify Sanity Studio accessible at `/studio`
- Test authentication flow
- Check all locales work correctly
- Validate API routes (especially `/api/auth/[...nextauth]`)

## Troubleshooting

### Common Issues

1. **Prisma Client not found**
   - Run `pnpx prisma generate`
   - Check output path: `src/generated/prisma/`

2. **Sanity types outdated**
   - Run `pnpm typegen`

3. **Environment variable errors**
   - Check `src/lib/env.ts` for validation errors
   - Ensure all required vars are set

4. **Build fails**
   - Ensure MongoDB connection is accessible
   - Check Sanity project ID and dataset

5. **Auth not working**
   - Verify GitHub OAuth credentials
   - Check `AUTH_TRUST_HOST=true` is set
   - Ensure callback URL is registered: `https://yourdomain.com/api/auth/callback/github`

## Working with This Project

### When Adding Features

1. Check if i18n is needed - add translations to all locale files
2. Use Server Components by default, client components only when needed
3. Follow existing patterns in similar components
4. Use HeroUI components for consistency
5. Validate forms with Zod
6. Handle errors gracefully

### When Modifying Schemas

1. **Prisma:** Update `prisma/schema.prisma`, then `pnpx prisma db push && pnpx prisma generate`
2. **Sanity:** Update `src/sanity/schemaTypes/*.ts`, then restart dev server and run `pnpm typegen`

### When Adding Pages

1. Create in appropriate `[locale]` directory
2. Add translations to message files
3. Update navigation if needed
4. Consider SEO: metadata, sitemap

### When Debugging

1. Check browser console (client errors)
2. Check terminal output (server errors)
3. Use React DevTools, Network tab
4. For Sanity: Use Vision tool in Studio
5. For Prisma: Use Prisma Studio (`pnpx prisma studio`)

## Code Examples

### Server Component with Data Fetching

```typescript
import { client } from "@/sanity/lib/client";

export default async function MoviesPage() {
  const movies = await client.fetch(`*[_type == "Movie-studio"]`);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}
```

### Server Action with Prisma

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markRequestAsAdded(id: string) {
  await prisma.movieRequests.update({
    where: { id },
    data: { isAdded: true },
  });

  revalidatePath("/admin");
}
```

### Client Component with i18n

```typescript
"use client";

import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";

export function WelcomeButton() {
  const t = useTranslations("Common");

  return <Button>{t("welcome")}</Button>;
}
```

## Contact & Resources

- **Author:** Yusif Aliyev
- **Author Website:** https://yusifaliyevpro.com/
- **Blog Post:** https://yusifaliyevpro.com/blog/filmisbest-tecrubem
- **GitHub:** https://github.com/yusifaliyevpro/FilmIsBest
- **Live Site:** https://filmisbest.com/

---

**Last Updated:** February 6, 2026

**Note for Agents:** This is a personal learning project that has evolved into a production application. Be respectful of existing patterns, maintain code quality, and consider the multilingual aspect in all changes. When in doubt, maintain consistency with existing code.
