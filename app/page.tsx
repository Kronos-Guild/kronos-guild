import Image from "next/image";
import localFont from "next/font/local";
import HomeTabs, { toCardProps } from "@/components/tabs/HomeTabs";
import { getBlogMetadata } from "@/lib/blog";
import SmallCourseCard from "@/components/small-course-card";
import Link from "next/link";

const fkRasterGroteskCompactRounded = localFont({
  src: "./fonts/FKRasterGroteskCompact-Rounded.otf",
  weight: "100",
  variable: "--font-fk-raster",
});

export default function Home() {
  const posts = getBlogMetadata();

  return (
    <main className="flex min-h-[calc(100vh-8vh)] flex-col text-center">
      <section className="sticky top-0 -z-10 flex flex-col items-center justify-center gap-4 py-40">
        <h1 className="text-6xl font-bold font-[family-name:var(--font-days-one)]">
          Learn. Create.{" "}
          <span
            className={`${fkRasterGroteskCompactRounded.className} bg-foreground text-background px-3 rounded-lg text-5xl uppercase`}
          >
            Build.
          </span>
        </h1>
        <p className="text-xl text-center max-w-md mx-auto font-[family-name:var(--font-inter)] text-foreground/70">
          Learn how to create on Solana by building real Solana projects. The
          best way to learn.
        </p>
        <Image
          src="/kronos-clock.svg"
          alt="Kronos clock"
          className="ml-12 dark:invert"
          width={90}
          height={90}
        />
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-neutral-50 dark:to-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-[family-name:var(--font-days-one)] mb-6">
            Web3 Literacy
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto font-[family-name:var(--font-inter)] text-foreground/70 mb-8">
            Build a solid foundation for your Solana journey.
          </p>
          <div className="flex flex-col md:flex-row  w-full gap-4  mx-auto">
            {posts.map((post, index) => {
              const variants = [
                "blue",
                "green",
                "purple",
                "orange",
                "gradient",
                "default",
              ];
              const variant = variants[index % variants.length];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block hover:opacity-90 transition-opacity duration-300"
                >
                  <SmallCourseCard
                    {...toCardProps(post)}
                    variant={variant as any}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-50 dark:from-neutral-900 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-[family-name:var(--font-days-one)] mb-6">
            Coding
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto font-[family-name:var(--font-inter)] text-foreground/70 mb-8">
            Develop practical coding skills with hands-on projects.
          </p>
          <div className="flex flex-col md:flex-row w-full gap-4 mx-auto">
            {posts.map((post, index) => {
              const variants = [
                "purple",
                "orange",
                "blue",
                "green",
                "gradient",
                "default",
              ];
              const variant = variants[index % variants.length];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block hover:opacity-90 transition-opacity duration-300"
                >
                  <SmallCourseCard
                    {...toCardProps(post)}
                    variant={variant as any}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full text-neutral-50 rounded-t-4xl flex-1 flex flex-col">
        <section className="flex justify-center py-6 gap-4 h-full flex-1 bg-neutral-800 rounded-t-4xl">
          <HomeTabs />
        </section>
      </div>
    </main>
  );
}
