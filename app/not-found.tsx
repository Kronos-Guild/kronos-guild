import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const fkRasterGroteskCompactRounded = localFont({
  src: "./fonts/FKRasterGroteskCompact-Rounded.otf",
  variable: "--font-fk-raster",
});

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-foreground">
      <main className="flex flex-col gap-8 items-center justify-center text-center mt-20">
        <Image
          src="/kronos-guild-logo.svg"
          alt="The Kronos Guild logo"
          className="mx-auto dark:invert"
          width={190}
          height={190}
          priority
        />

        <div className="flex flex-col items-center gap-6">
          <h1
            className={`${fkRasterGroteskCompactRounded.className} text-6xl bg-foreground text-background px-4 py-2 rounded-lg`}
          >
            404
          </h1>

          <p className="text-xl max-w-md mx-auto text-foreground/80">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been
            moved.
          </p>

          <Image
            src="/kronos-clock.svg"
            alt="Kronos clock"
            className="dark:invert"
            width={110}
            height={110}
          />

          <Link
            href="/"
            className="mt-4 px-6 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}
