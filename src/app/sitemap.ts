import posts from "../markdowns/index.json";

const BASE_URL = "https://marktension.nl";

export default async function sitemap() {
  const blogPosts = posts.files.map(({ key, slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(date || new Date()).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...routes, ...blogPosts];
}
