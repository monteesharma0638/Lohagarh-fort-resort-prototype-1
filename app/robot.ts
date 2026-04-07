// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin', // Blocks crawlers from accessing the admin route group
    },
    sitemap: 'https://lohagarhgroupofcompanies.com/sitemap.xml',
  }
}