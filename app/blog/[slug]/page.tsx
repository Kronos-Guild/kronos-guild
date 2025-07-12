/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { caryotypeBold } from "@/app/lib/fonts";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

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

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-light",
              keepBackground: true,
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: any) {
                if (!node.properties.className) {
                  node.properties.className = [];
                }
                node.properties.className.push("line--highlighted");
              },
              onVisitHighlightedWord(node: any) {
                node.properties.className = ["word--highlighted"];
              },
            },
          ],
        ],
      },
    },
  });

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-foreground">
      <main className="flex flex-col gap-[32px] items-center justify-center mt-20 max-w-4xl w-full">
        <header className="text-center space-y-4">
          <h1 className={`text-4xl md:text-6xl font-bold ${caryotypeBold.className}`}>
            {frontmatter.title}
          </h1>
          {frontmatter.subtitle && (
            <p className="text-lg md:text-xl text-foreground/70">
              {frontmatter.subtitle}
            </p>
          )}
          {frontmatter.date && (
            <time className="text-sm text-foreground/60">
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>
        <article className="prose prose-lg max-w-none w-full text-left">
          {compiledContent}
        </article>
      </main>
      <footer
        className={`${caryotypeBold.className} opacity-80 bg-foreground text-background px-4 rounded-md flex text-2xl flex-col items-center text-center uppercase mx-auto mt-16`}
      >
        Kronos Guild Blog
      </footer>
    </div>
  );
}
