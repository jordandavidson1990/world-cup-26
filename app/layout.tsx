import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Cup 2026 Sweeper 🏆",
  description: "Randomiser for World Cup '26 teams.",
  metadataBase: new URL("https://world-cup-26-jd.vercel.app"),
  openGraph: {
    title: "World Cup 2026 Sweeper",
    description: "Randomiser for World Cup '26 teams.",
    url: "https://world-cup-26-jd.vercel.app",
    siteName: "World Cup Sweeper",
    images: [
      {
        url: "/og-image.png", // Put this image in your public/ folder
        width: 1200,
        height: 630,
        alt: "World Cup Sweeper App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Cup 2026 Sweeper",
    description: "Randomiser for World Cup '26 teams.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
