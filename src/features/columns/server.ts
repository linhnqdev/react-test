import { serverFetchJson } from "@/lib/server-fetch";

type ColumnsMeta = {
  title: string;
  description: string;
  heading?: string;
  keywords?: string[];
  ogImage?: string;
};

export async function getColumnsMeta(): Promise<ColumnsMeta> {
  return serverFetchJson<ColumnsMeta>("/jsons/columns-meta.json", {
    revalidate: 60,
  });
}

