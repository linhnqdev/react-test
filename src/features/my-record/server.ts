import { serverFetchJson } from "@/lib/server-fetch";

type MyRecordMeta = {
  title: string;
  description: string;
  heading?: string;
  keywords?: string[];
  ogImage?: string;
};

export async function getMyRecordMeta(): Promise<MyRecordMeta> {
  return serverFetchJson<MyRecordMeta>("/jsons/my-record-meta.json", {
    revalidate: 60,
  });
}

