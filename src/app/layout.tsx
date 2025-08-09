import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Mark Tensen's Blog: Exploring Software Engineering, Artificial Life, Electronic Music, and generative AI",
  description: "Exploring the generative AI, Artificial Life, and electronic music production. Reflections on generative, MaxMSP devices, and creative workflows.",
  openGraph: {
    title: "Mark Tensen's Blog",
    description: "Exploring the generative AI, Artificial Life, and electronic music production.",
    url: "https://marktension.nl",
    siteName: "Mark Tensen's Blog",
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
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
