import { caryotypeBold } from "@/app/lib/fonts";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 items-center justify-center text-center mt-20 max-w-3xl">
        <h1 className={`text-6xl font-bold ${caryotypeBold.className}`}>
          404 - Post Not Found
        </h1>
        <p className="text-xl text-foreground/70">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="mt-8 px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        >
          View All Blog Posts
        </Link>
      </main>
      <footer
        className={`${caryotypeBold.className} opacity-80 bg-foreground text-background px-4 rounded-md flex text-2xl flex-col items-center text-center uppercase mx-auto`}
      >
        Kronos Guild Blog
      </footer>
    </div>
  );
}
