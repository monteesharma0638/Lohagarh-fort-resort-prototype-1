# Lohagarh Royal Heritage - Next.js App

## Overview

A Next.js 16 application for the Lohagarh Royal Heritage hotel brand. Features a public-facing website and an admin dashboard for content management.

## Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT stored in cookies
- **Styling**: Tailwind CSS v4 + Radix UI components
- **Rich Text**: EditorJS for blog content

## Project Structure

- `app/(public)/` - Public-facing pages (home, hotels, dining, experiences, offers, discover)
- `app/admin/` - Admin dashboard (login, manage blogs, users, categories)
- `app/api/` - Next.js API routes (blogs, categories, users, upload-image)
- `components/` - Shared UI components (Navbar, Footer, HotelCard, etc.)
- `components/ui/` - Radix UI-based component library
- `models/` - Mongoose models (Blogs, Users, Properties, BlogCategories, Enquiries, Pages, UserActivities)
- `lib/` - Utilities (db.ts for MongoDB connection, auth.ts for JWT helpers)
- `public/` - Static assets and uploaded images

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
