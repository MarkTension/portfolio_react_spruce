import { ClientOnly } from "./client";
import posts from "../../markdowns/index.json";

export function generateStaticParams() {
  console.log("this is the posts", posts);
  const homePath = [{ slug: [""] }];

  const blogPaths = posts.files.map((post) => ({
    slug: ["blog", post.key],
  }));

  return [...homePath, ...blogPaths];
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug || params.slug.length === 0) {
    return <ClientOnly slug={undefined} />;
  } else if (params.slug[0] === "blog" && params.slug[1]) {
    return <ClientOnly slug={params.slug[1]} />;
  } else {
    // Handle 404 or redirect
    return <div>Page not found</div>;
  }
}
