import type { Metadata } from "next";
import { Geist_Mono, Days_One, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import LenisProvider from "@/components/lenis-provider";

const daysOne = Days_One({
  variable: "--font-days-one",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kronos Guild",
  description:
    "Learn. Create. Build. How to build on Solana by building on Solana.",
  openGraph: {
    title: "Kronos Guild",
    description:
      "Learn. Create. Build. How to build on Solana by building on Solana.",
    images: [
      {
        url: "/thumbnail.webp",
        width: 400,
        height: 213,
        alt: "Kronos Guild Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kronos Guild",
    description:
      "Learn. Create. Build. How to build on Solana by building on Solana.",
    images: [
      {
        url: "/thumbnail.webp",
        alt: "Kronos Guild Preview Image",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/kronos-clock-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/kronos-clock.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${daysOne.variable} ${inter.variable} ${geistMono.variable} bg-neutral-50 antialiased`}
      >
        <LenisProvider>
          <nav className="sticky top-4 z-50 w-full flex items-center justify-between bg-slate-50/50 mt-4 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-200/15 rounded-xl max-w-5xl dark:shadow-neutral-800/10 py-3 px-8 mx-auto backdrop-blur-sm">
            <Link href="/">
              <Image
                src="/kronos-guild-logo.svg"
                alt="Kronos Guild Logo"
                className="dark:invert"
                width={160}
                height={160}
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog">Blog</Link>
              <Link
                href="/start-building"
                className="rounded-full text-center font-medium bg-neutral-700 hover:bg-neutral-600 transition-colors text-neutral-50 text-sm px-6 py-2"
              >
                Start Building
              </Link>
            </div>
          </nav>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
