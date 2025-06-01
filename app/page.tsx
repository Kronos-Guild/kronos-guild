import Image from "next/image";
import localFont from "next/font/local";

const fkRasterGroteskCompactRounded = localFont({
  src: "./fonts/FKRasterGroteskCompact-Rounded.otf",
  weight: "100",
  variable: "--font-fk-raster",
});

const caryotypeBold = localFont({
  src: "./fonts/Caryotype-Bold.otf",
  weight: "100",
  variable: "--font-caryotype",
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-foreground">
      <main className="flex flex-col gap-[32px] items-center justify-center text-center mt-20">
        <Image
          src="/kronos-guild-logo.svg"
          alt="The Kronos Guild logo"
          className="mx-auto"
          width={190}
          height={190}
        />
        <div className="flex flex-col items-center justify-center gap-4">
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
            className="ml-12"
            width={110}
            height={110}
          />
        </div>
      </main>
      <footer
        className={`${caryotypeBold.className} opacity-80 bg-foreground text-background px-4 rounded-md flex text-2xl flex-col items-center text-center uppercase mx-auto`}
      >
        Coming soon.
      </footer>
    </div>
  );
}
