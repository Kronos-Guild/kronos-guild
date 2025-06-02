import type { Metadata } from "next";
import { Geist_Mono, Days_One, Inter } from "next/font/google";
import "./globals.css";

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
        url: "/thumbnail.jpg",
        width: 1200,
        height: 630,
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
        url: "/thumbnail.jpg",
        alt: "Kronos Guild Preview Image",
      },
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
        className={`${daysOne.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
