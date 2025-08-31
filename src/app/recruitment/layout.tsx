import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/site-config";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Startup Landing Page",
  description: siteConfig.description,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    url: siteConfig.links.deploymentUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{
      url: siteConfig.openGraph.imageUrl,
      width: siteConfig.openGraph.imageWidth,
      height: siteConfig.openGraph.imageHeight,
      alt: siteConfig.name,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    creator: siteConfig.twitter.creator,
    images: siteConfig.twitter.imageUrl,
  }
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
      {children}
      </body>
    </html>
  );
}
