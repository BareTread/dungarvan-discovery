import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dungarvan Discovery - Interactive Adventure Cards",
  description: "Discover hidden gems, local secrets, and unforgettable experiences in Dungarvan, Ireland's Ancient East. Choose your adventure with our interactive card game featuring over 60 amazing activities.",
  keywords: ["Dungarvan", "Ireland", "travel", "adventure", "tourism", "Ancient East", "activities", "discovery"],
  authors: [{ name: "Dungarvan Discovery" }],
  openGraph: {
    title: "Dungarvan Discovery - Interactive Adventure Cards",
    description: "Discover hidden gems and unforgettable experiences in Dungarvan, Ireland's Ancient East",
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dungarvan Discovery - Interactive Adventure Cards",
    description: "Discover hidden gems and unforgettable experiences in Dungarvan, Ireland's Ancient East",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
