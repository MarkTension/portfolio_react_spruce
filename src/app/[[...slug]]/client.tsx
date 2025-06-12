"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly({ slug }: { slug?: string }) {
  return <App slug={slug} />;
}
