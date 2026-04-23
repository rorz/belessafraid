import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
});

const newsreader = Newsreader({
  display: "swap",
  subsets: ["latin"],
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
