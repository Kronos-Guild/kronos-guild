import Image from "next/image";
import localFont from "next/font/local";
import HomeTabs from "@/components/tabs/HomeTabs";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";

const fkRasterGroteskCompactRounded = localFont({
  src: "./fonts/FKRasterGroteskCompact-Rounded.otf",
  weight: "100",
  variable: "--font-fk-raster",
});

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-8vh)] flex-col text-center">
      <section className="flex flex-col items-center justify-center gap-4 py-44">
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
          className="rounded-lg dark:invert"
          width={70}
          height={70}
        />
      </section>

      <div className="w-full text-neutral-50 flex-1 flex flex-col z-40">
        <FadeInSection
          as="section"
          className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-5xl px-2 mx-auto mb-6"
        >
          <div className="bg-neutral-800 col-span-4 md:col-span-2 flex flex-col justify-between h-96 w-full rounded-4xl p-4">
            <Image
              src="/kronos-clock-light.svg"
              alt="Kronos clock"
              className="rounded-2xl dark:invert"
              width={70}
              height={70}
            />
            <div className="flex flex-col gap-3 items-start">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-days-one)]">
                Web3 Literacy
              </h2>
              <span className="text-neutral-50/70 text-start max-w-xs">
                Build a solid foundation for your Solana Journey.
              </span>
              <Button className="rounded-full cursor-pointer hover:bg-neutral-200 transition-all duration-300 bg-neutral-50 text-neutral-800 px-10 py-2">
                Learn more
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 col-span-4 flex flex-col justify-between h-96 w-full rounded-4xl p-4 bg-[url('/web3-literacy.webp')] bg-cover bg-center"></div>
        </FadeInSection>

        <FadeInSection
          as="section"
          className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-5xl px-2 mx-auto mb-20"
        >
          <div className="order-2 md:order-1 col-span-4 flex flex-col justify-between h-96 w-full rounded-4xl p-4 bg-[url('/coding.webp')] bg-cover bg-center"></div>
          <div className="order-1 md:order-2 bg-neutral-800 col-span-4 md:col-span-2 flex flex-col justify-between h-96 w-full rounded-4xl p-4">
            <Image
              src="/kronos-clock-light.svg"
              alt="Kronos clock"
              className="rounded-2xl dark:invert"
              width={70}
              height={70}
            />
            <div className="flex flex-col gap-3 items-start">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-days-one)]">
                Coding
              </h2>
              <span className="text-neutral-50/70 text-start max-w-xs">
                Learn how to code in Solana.
              </span>
              <Button className="rounded-full cursor-pointer hover:bg-neutral-200 transition-all duration-300 bg-neutral-50 text-neutral-800 px-10 py-2">
                Learn more
              </Button>
            </div>
          </div>
        </FadeInSection>
      </div>

      <FadeInSection
        as="section"
        className="relative flex justify-center py-6 gap-4 h-full flex-1 overflow-hidden bg-[url('/pattern.svg')] bg-center bg-cover mb-20"
      >
        <HomeTabs />
      </FadeInSection>
    </main>
  );
}
