import posts from "../markdowns/index.json";

const BASE_URL = "https://marktension.nl";

export default async function sitemap() {
  const blogPosts = posts.files.map(({ key }) => ({
    url: `${BASE_URL}/blog/${key}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [""].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogPosts];
}
