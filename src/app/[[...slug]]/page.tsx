import { ClientOnly } from "./client";
import posts from "../../markdowns/index.json";
import type { Metadata } from "next";

export function generateStaticParams() {
  const homePath = [{ slug: [""] }];
  const blogPath = [{ slug: ["blog"] }];
  const aboutPath = [{ slug: ["about"] }];
  const blogPaths = posts.files.map((post) => ({
    slug: ["blog", post.slug],
  }));

  return [...homePath, ...blogPath, ...aboutPath, ...blogPaths];
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Mark Tensen's Blog: Exploring Software Engineering, Artificial Life, Electronic Music, and generative AI",
      description: "Exploring the generative AI, Artificial Life, and electronic music production. Reflections on generative, MaxMSP devices, and creative workflows.",
    };
  }

  if (params.slug[0] === "about") {
    return {
      title: "About Mark Tensen - Software Engineer & Digital Artist",
      description: "Mark Tensen is a software engineer and digital artist exploring the intersection of technology, generative systems, and creative expression.",
      openGraph: {
        title: "About Mark Tensen - Software Engineer & Digital Artist",
        description: "Exploring generative art, artificial life, electronic music production, and graphics programming.",
      },
      alternates: {
        canonical: "https://marktension.nl/about",
      },
    };
  }

  if (params.slug[0] === "blog") {
    if (params.slug.length === 1) {
      return {
        title: "Blog - Mark Tensen",
        description: "Articles about artificial life, electronic music, computer graphics, WebGPU, machine learning and more.",
      };
    } else if (params.slug[1]) {
      // Individual blog post
      const post = posts.files.find((p) => p.slug === params.slug![1]);
      if (post) {
        return {
          title: `${post.title} - Mark Tensen's Blog`,
          description: post.title,
          openGraph: {
            title: post.title,
            description: post.title,
          },
          alternates: {
            canonical: `https://marktension.nl/blog/${post.slug}`,
          },
        };
      }
    }
  }

  return {
    title: "Mark Tensen's Blog",
    description: "Exploring technology, art, and creativity",
  };
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug || params.slug.length === 0) {
    return <ClientOnly slug={undefined} />;
  } else if (params.slug[0] === "about") {
    return <ClientOnly slug="about" />;
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
