import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  display: "swap",
  src: "./fonts/Manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
});

const newsreader = localFont({
  display: "swap",
  src: "./fonts/Newsreader-latin.woff2",
  weight: "200 800",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: {
    default: "Belessafraid",
    template: "%s | Belessafraid",
  },
  description: "Static Markdoc pages in a plain reader view.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} h-full bg-background text-foreground antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-serif">
        {children}
      </body>
    </html>
  );
}
