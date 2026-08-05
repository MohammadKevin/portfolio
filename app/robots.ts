import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // Disallow crawling admin and raw API endpoints
    },
    sitemap: 'https://corecraft.my.id/sitemap.xml',
  };
}
