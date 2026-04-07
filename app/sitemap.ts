import { getHotels } from '@/lib/db';
import { MetadataRoute } from 'next';

// 1. Define your sub-pages once
const SUB_PAGES = ['dining', 'gallery', 'rooms', 'contact', 'location'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lohagarhgroupofcompanies.com';

  // 1. Fetch only public data (e.g., Hotels)
  const hotels = await getHotels(); 

  // 3. Create a flattened array of all possible URLs
  const hotelRoutes = hotels.flatMap((hotel: any) => {
    // The main hotel landing page: /hotels/mahalkhas
    const mainHotelPage = {
      url: `${baseUrl}/hotels/${hotel.slug}`,
      lastModified: hotel.updatedAt || new Date(),
      priority: 0.9,
    };

    // The subpages: /hotels/mahalkhas/dining, etc.
    const subPageRoutes = SUB_PAGES.map((page) => ({
      url: `${baseUrl}/hotels/${hotel.slug}/${page}`,
      lastModified: hotel.updatedAt || new Date(),
      priority: 0.7,
    }));

    return [mainHotelPage, ...subPageRoutes];
  });

// 3. Static public pages (inside the (public) group)
  const staticPages = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    ...hotelRoutes,
    ...staticPages.map(page => ({ ...page, priority: 0.5 })),
  ];
}