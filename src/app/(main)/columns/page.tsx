import type { Metadata } from "next";

import { ColumnsView } from "@/features/columns/components/ColumnsView";
import { getColumnsMeta } from "@/features/columns/server";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getColumnsMeta();

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [{ url: meta.ogImage }] : undefined,
    },
  };
}

export default async function ColumnsPage() {
  const meta = await getColumnsMeta();

  return (
    <div className="container">
      <h1 className="d-none">
        {meta.heading ?? meta.title}
      </h1>
      <ColumnsView />
    </div>
  );
}

