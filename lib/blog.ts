import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogMetadata } from "@/types";

export function getBlogMetadata(): BlogMetadata[] {
  const postsDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map<BlogMetadata>((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);

    return {
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? "",
      imageAlt: data.imageAlt ?? "",
      tags: (data.tags ?? []) as string[],
      slug: file.replace(/\.mdx?$/, ""),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
} 