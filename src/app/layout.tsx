import type { Metadata } from "next";
import "../index.css";

const dtt = "Exploring Artificial Life, ML, digital art and electronic music production";

export const metadata: Metadata = {
  metadataBase: new URL('https://marktension.nl'),
  title: "Mark Tensen's Blog: "+dtt,
  description: dtt,
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
    description: dtt,
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
    description: dtt,
    creator: "@marktension",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400..900&display=swap" />
        <link rel="preload" href="/fonts/Brier-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
