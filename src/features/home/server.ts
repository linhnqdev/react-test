import { serverFetchJson } from "@/lib/server-fetch";

type HomeMeta = {
  title: string;
  description: string;
  heading?: string;
  keywords?: string[];
  ogImage?: string;
};

export async function getHomeMeta(): Promise<HomeMeta> {
  return serverFetchJson<HomeMeta>("/jsons/home-meta.json", {
    revalidate: 60,
  });
}

