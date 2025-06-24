import Link from "next/link";
import localFont from "next/font/local";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LargeCourseCard from "@/components/large-course-card";
import SmallCourseCard from "@/components/small-course-card";
import { getBlogMetadata } from "@/lib/blog";
import type { BlogMetadata, LargeCourseCardProps } from "@/types";

// Font used for "Coming Soon"
const caryotypeBold = localFont({
  src: "../../app/fonts/Caryotype-Bold.otf", // relative path from this file
  weight: "700",
  variable: "--font-caryotype",
});

function toCardProps(post: BlogMetadata): LargeCourseCardProps {
  return {
    imageUrl: post.imageUrl || "/placeholder.png",
    imageAlt: post.imageAlt || post.title,
    title: post.title,
    subtitle: post.subtitle || "",
    description: post.description || "",
    tags: post.tags,
  };
}

export default function HomeTabs() {
  const posts = getBlogMetadata();
  const [largePost, ...smallPosts] = posts;

  return (
    <div className="w-full max-w-5xl text-neutral-50 flex-1 flex flex-col z-50">
      <section className="flex justify-center py-6 gap-4 h-full flex-1">
        <Tabs defaultValue="Learn" className="w-full max-w-6xl">
          <TabsList className="mx-auto rounded-full w-full max-w-xs mb-6 bg-white border backdrop-blur-sm">
            <TabsTrigger
              className="rounded-full text-neutral-800 data-[state=active]:text-neutral-50"
              value="Learn"
            >
              Learn
            </TabsTrigger>
            <TabsTrigger
              className="rounded-full text-neutral-800 data-[state=active]:text-neutral-50"
              value="Create"
            >
              Create
            </TabsTrigger>
            <TabsTrigger
              className="rounded-full text-neutral-800 data-[state=active]:text-neutral-50"
              value="Build"
            >
              Build
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="Learn"
            className="flex flex-col md:flex-row gap-4 w-full mx-auto justify-center"
          >
            {largePost && (
              <Link
                href={`/blog/${largePost.slug}`}
              >
                <LargeCourseCard {...toCardProps(largePost)} />
              </Link>
            )}

            {smallPosts.length > 0 && (
              <div className="flex flex-col gap-4 justify-between">
                {smallPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                  >
                    <SmallCourseCard {...toCardProps(post)} />
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="Create"
            className="flex items-center justify-center w-full flex-1"
          >
            <span
              className={`${caryotypeBold.className} text-4xl tracking-wider uppercase`}
            >
              Coming Soon
            </span>
          </TabsContent>
          <TabsContent
            value="Build"
            className="flex items-center justify-center w-full flex-1"
          >
            <span
              className={`${caryotypeBold.className} text-4xl tracking-wider uppercase`}
            >
              Coming Soon
            </span>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
