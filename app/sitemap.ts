import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://corecraft.my.id';

  // We can add dynamic routes here if there are individual project pages or blog posts.
  // Since it's a one-page portfolio, we just need the main routes.
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];
}
