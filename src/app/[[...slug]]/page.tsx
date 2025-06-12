import { ClientOnly } from "./client";
import posts from "../../markdowns/index.json";

export function generateStaticParams() {
  const homePath = [{ slug: [""] }];
  const blogPath = [{ slug: ["blog"] }];
  const blogPaths = posts.files.map((post) => ({
    slug: ["blog", post.key],
  }));

  return [...homePath, ...blogPath, ...blogPaths];
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug || params.slug.length === 0) {
    return <ClientOnly slug={undefined} />;
  } else if (params.slug[0] === "blog") {
    if (params.slug.length === 1) {
      // This handles the /blog route
      return <ClientOnly slug="blog" />;
    } else if (params.slug[1]) {
      // This handles individual blog posts
      return <ClientOnly slug={params.slug[1]} />;
    }
  }
  // Handle 404 or redirect
  return <div>Page not found</div>;
}
