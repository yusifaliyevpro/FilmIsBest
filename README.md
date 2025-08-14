# <img src="public/icon.png" alt="FilmIsBest Icon" width="48" height="48" style="vertical-align:middle; margin-right:8px;"/> **FilmIsBest**

FilmIsBest is a web application designed to make watching and discovering movies easier, especially for group settings like film clubs. The project started as a simple solution to a practical problem and evolved into a full-featured platform, helping me learn web development from scratch.

## Why FilmIsBest?

The idea for FilmIsBest came from a need to quickly share and watch movies with friends during English club sessions. Initially, the project was a static HTML site, but over time, it grew into a dynamic web app using modern technologies.

## Features

- Browse and search movies
- View detailed movie information
- Dynamic routing for individual movie pages
- SEO-friendly meta tags
- Multilingual support (Azerbaijani, English, Turkish)
- Admin panel for managing content
- Integration with Sanity CMS for movie data
- Dynamic sitemap generation
- Responsive design

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing
- **TypeScript**: Type safety for scalable development
- **Sanity CMS**: Headless CMS for managing movie data
- **Prisma**: ORM for database access
- **PostCSS**: CSS processing
- **Lottie**: Animations
- **Vercel**: Hosting and deployment

## Project Structure

- `src/`: Main application code (pages, components, API routes)
- `prisma/`: Database schema and generated client
- `public/`: Static assets (images, icons, animations)
- `assets/`: Fonts and other resources
- `messages/`: Localization files
- `sanity/`: Sanity CMS configuration and schema

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yusifaliyevpro/FilmIsBest.git
   cd FilmIsBest
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your credentials for Sanity, database, etc.

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Browse movies, view details, and search by title or genre.
- Admins can sign in to add, update, or delete movies.
- The site supports multiple languages; use the language switcher in the header.

## Lessons Learned

This project helped me learn:

- Practical web development (HTML, CSS, JavaScript, React, Next.js)
- Working with APIs and CMS
- SEO and accessibility best practices
- Deployment and hosting

## Links

- [Live Site](https://filmisbest.com/)
- [Blog Post](https://yusifaliyevpro.com/blog/filmisbest-tecrubem)
- [Author](https://yusifaliyevpro.com/)
- [GitHub Repo](https://github.com/yusifaliyevpro/FilmIsBest)
