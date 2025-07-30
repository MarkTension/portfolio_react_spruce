import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Mark Tension",
  description: "Portfolio website and blog of Mark Tension",
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
