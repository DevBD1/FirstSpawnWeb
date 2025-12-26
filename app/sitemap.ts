import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define your Base URL (Change this to your actual domain)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firstspawn.com';

  // commented out the dynamic section. When you build your "News Terminal" or "Blog," you must fetch those IDs/slugs here. If you don't, Google won't find your specific articles easily.

  // 2. (Optional) Fetch dynamic data for pages like /blog/[slug] or /market/[coin]
  // const posts = await getBlogPosts();
  // const dynamicRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));

  // 3. Define your static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Homepage changes often
      priority: 1.0, // Most important page
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // Add other static pages like /contact, /pricing here
  ];

  // 4. Combine and return
  // return [...staticRoutes, ...dynamicRoutes]; 
  return staticRoutes; 
}