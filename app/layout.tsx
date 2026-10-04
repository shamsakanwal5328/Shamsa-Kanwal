import type { Metadata, Viewport } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { absoluteUrl, data } from "@/lib/data";
import { OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: { default: data.site.title, template: `%s | ${data.personal.name}` },
  description: data.site.description,
  applicationName: data.site.title,
  authors: [{ name: data.personal.name }],
  creator: data.personal.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: data.site.title,
    description: data.site.description,
    url: absoluteUrl(),
    siteName: data.site.title,
    locale: data.site.locale,
    type: "profile",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: data.site.title,
    description: data.site.description,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#17324d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sourceSans.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar name={data.personal.name} title={data.personal.title} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
