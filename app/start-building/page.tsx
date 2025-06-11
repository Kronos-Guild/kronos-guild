import localFont from "next/font/local";
import Image from "next/image";

const caryotypeBold = localFont({
  src: "../fonts/Caryotype-Bold.otf",
  variable: "--font-fk-raster",
});

export default function StartBuilding() {
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen p-8 sm:p-20 font-[family-name:var(--font-days-one)] text-foreground">
      <Image
        src="/kronos-guild-logo.svg"
        alt="The Kronos Guild logo"
        className="mx-auto dark:invert"
        width={190}
        height={190}
        priority
      />
      <h1 className="text-6xl font-bold">Build.</h1>
      <p className="text-xl max-w-md mx-auto text-foreground/80 text-center font-[family-name:var(--font-inter)]">
        Learn how to create on Solana by building real Solana projects.
      </p>
      <Image
        src="/kronos-clock.svg"
        alt="Kronos clock"
        className="dark:invert ml-12"
        width={110}
        height={110}
      />
      <span
        className={`${caryotypeBold.className} text-neutral-50 uppercase px-4 py-1 rounded-lg text-2xl bg-neutral-700 max-w-md mx-auto text-center font-[family-name:var(--font-inter)]`}
      >
        Coming soon...
      </span>
    </div>
  );
}
