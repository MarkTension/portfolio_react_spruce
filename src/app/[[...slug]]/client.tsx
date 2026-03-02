"use client";

import App from "../../App";

export function ClientOnly({ slug }: { slug?: string }) {
  return <App slug={slug} />;
}
