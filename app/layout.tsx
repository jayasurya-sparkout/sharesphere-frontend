import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShareSphere - Social, Web3 & Marketplace",
  description:
    "ShareSphere is a multi-purpose social platform to connect, chat, trade, and interact with Web3 features.",
  keywords: ["social", "chat", "web3", "marketplace", "NFT", "wallet"],
  authors: [{ name: "ShareSphere Team" }],
  openGraph: {
    title: "ShareSphere - Social, Web3 & Marketplace",
    description:
      "Connect, chat, trade, and interact with Web3 features on ShareSphere.",
    url: "https://www.sharesphere.com", // replace with your domain
    siteName: "ShareSphere",
    images: [
      {
        url: "https://www.sharesphere.com/og-image.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "ShareSphere Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareSphere - Social, Web3 & Marketplace",
    description:
      "Connect, chat, trade, and interact with Web3 features on ShareSphere.",
    images: ["https://www.sharesphere.com/og-image.png"],
    creator: "@ShareSphere", // optional
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
