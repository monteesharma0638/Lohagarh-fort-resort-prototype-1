# Lohagarh Royal Heritage - Next.js App

## Overview

A Next.js 16 application for the Lohagarh Royal Heritage hotel brand. Features a public-facing website and an admin dashboard for content management.

## Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT stored in cookies
- **Styling**: Tailwind CSS v4 + Radix UI components
- **Rich Text**: EditorJS for blog content
- **Animations**: Framer Motion

## Project Structure

- `app/(public)/` - Public-facing pages
  - Home, About (8 subpages), Hotels, Dining, Experiences (3 subpages), Offers, Discover
  - Awards, Gallery, Contact, Media, Reservations, Special Packages (3 subpages)
  - Legal pages: Accessibility, Terms, Privacy, Redressal, Sitemap
- `app/admin/` - Admin dashboard (login, manage blogs, users, categories)
- `app/api/` - Next.js API routes (blogs, categories, users, upload-image)
- `components/` - Shared UI components
  - `TopHeader.tsx` - Slim top bar with secondary nav + social icons
  - `Navbar.tsx` - Main nav with mega menu dropdowns
  - `Footer.tsx` - Site links, experiences, newsletter, legal links
  - `components/ui/` - Radix UI-based component library
- `models/` - Mongoose models (Blogs, Users, Properties, BlogCategories, Enquiries, Pages, UserActivities)
- `lib/` - Utilities (db.ts for MongoDB connection, auth.ts for JWT helpers)
- `public/` - Static assets and uploaded images

## Navigation Structure

### Top Header
- Home (on non-home pages), Rajasthan, Media, Special Packages, Reservations
- Social icons: Facebook, Twitter, Instagram

### Main Nav (Mega Menu)
- About (8 submenu items)
- Our Hotels (by location: Jaipur, Jaisalmer, Bharatpur, Nainital + Special Packages)
- Experiences (Regal Experience, Regal Weddings, Spa & Salon)
- Awards
- Gallery (by property)
- Contact Us (Marketing & Sales, Investors, Feedback, Career)

### Footer
- Site Links, Experiences, Newsletter
- Bottom: Accessibility, Terms, Privacy, Redressal, Sitemap

## Environment Variables

Required secrets (stored in Replit Secrets):
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

## Development

- Dev server runs on port 5000 at 0.0.0.0
- Command: `npm run dev`

## Deployment

- Target: Autoscale
- Build: `npm run build`
- Run: `npm run start`
