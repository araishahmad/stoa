import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const instrumentSans = localFont({
  src: [
    { path: "../assets/fonts/instrument-sans-regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/instrument-sans-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: { default: "Stoa — Stay curious", template: "%s | Stoa" },
  description: siteConfig.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={instrumentSans.variable}><body><a href="#main-content" className="skip-link">Skip to content</a>{children}</body></html>;
}
