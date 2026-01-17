import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://marktension.nl'),
  title: "Mark Tensen's Blog: Exploring Software Engineering, Artificial Life, Electronic Music, and generative AI",
  description: "Exploring the generative AI, Artificial Life, and electronic music production. Reflections on generative, MaxMSP devices, and creative workflows.",
    keywords: [
    "artificial life",
    "generative AI",
    "electronic music",
    "WebGPU",
    "machine learning",
    "creative coding",
    "MaxMSP",
    "computer graphics",
    "JAX",
  ],
  authors: [{ name: "Mark Tensen" }],
  creator: "Mark Tensen",
  publisher: "Mark Tensen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mark Tensen's Blog",
    description: "Exploring the generative AI, Artificial Life, and electronic music production.",
    url: "https://marktension.nl",
    siteName: "Mark Tensen's Blog",
    images: [
      {
        url: "/images/nca_swarming.webp",
        width: 1200,
        height: 630,
        alt: "Mark Tensen's Blog",
      },
    ],
  },
    twitter: {
    card: "summary_large_image",
    title: "Mark Tensen's Blog",
    description: "Exploring the generative AI, Artificial Life, and electronic music production.",
    creator: "@marktension", // Add your Twitter handle if you have one
    images: ["/images/nca_swarming.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* explicit favicons as a fallback so browsers and devtools find them */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo512.png" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
