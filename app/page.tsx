import Image from "next/image";
import localFont from "next/font/local";
import HomeTabs from "@/components/tabs/HomeTabs";

const fkRasterGroteskCompactRounded = localFont({
  src: "./fonts/FKRasterGroteskCompact-Rounded.otf",
  weight: "100",
  variable: "--font-fk-raster",
});

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-8vh)] flex-col text-center">
      <section className="flex flex-col items-center justify-center gap-4 py-40">
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

      <div className="w-full text-neutral-50 rounded-t-4xl flex-1 flex flex-col">
        <section className="flex justify-center py-6 gap-4 h-full flex-1 bg-neutral-800 rounded-t-4xl">
          <HomeTabs />
        </section>
      </div>
    </main>
  );
}
