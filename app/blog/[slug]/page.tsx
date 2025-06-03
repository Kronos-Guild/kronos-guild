import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { caryotypeBold } from "@/app/lib/fonts";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  const fileContent = await fs
    .readFile(filePath, "utf8")
    .catch(() => notFound());
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-foreground">
      <main className="flex flex-col gap-[32px] items-center justify-center text-center mt-20 max-w-3xl">
        <h1 className={`text-6xl font-bold ${caryotypeBold.className}`}>
          {frontmatter.title}
        </h1>
        <div className="text-xl text-center max-w-md mx-auto text-foreground/70">
          <MDXRemote source={content} />
        </div>
      </main>
      <footer
        className={`${caryotypeBold.className} opacity-80 bg-foreground text-background px-4 rounded-md flex text-2xl flex-col items-center text-center uppercase mx-auto`}
      >
        Kronos Guild Blog
      </footer>
    </div>
  );
}
