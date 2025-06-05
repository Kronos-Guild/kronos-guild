import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { caryotypeBold } from "@/app/lib/fonts";

export default async function BlogIndex() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const postFiles = await fs.readdir(postsDir);

  const posts = await Promise.all(
    postFiles.map(async (filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data: frontmatter } = matter(fileContent);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
      };
    })
  );

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 items-center justify-center text-center mt-20 max-w-3xl">
        <h1 className={`text-6xl font-bold ${caryotypeBold.className}`}>
          Kronos Guild Blog
        </h1>
        <div className="flex flex-col gap-6 w-full">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-6 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-foreground/70 mt-2">{post.description}</p>
              <time className="text-sm text-foreground/50 mt-2 block">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
