import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Dungarvan Discovery - Interactive Adventure Cards",
  description: "Discover hidden gems, local secrets, and unforgettable experiences in Dungarvan, Ireland's Ancient East. Choose your adventure with our interactive card game featuring over 60 amazing activities.",
  keywords: ["Dungarvan", "Ireland", "travel", "adventure", "tourism", "Ancient East", "activities", "discovery"],
  authors: [{ name: "Dungarvan Discovery" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dungarvan Discovery - Interactive Adventure Cards",
    description: "Discover hidden gems and unforgettable experiences in Dungarvan, Ireland's Ancient East",
    type: "website",
    locale: "en_IE",
    siteName: "Dungarvan Discovery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dungarvan Discovery - Interactive Adventure Cards",
    description: "Discover hidden gems and unforgettable experiences in Dungarvan, Ireland's Ancient East",
  },
  robots: "index, follow",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Dungarvan Discovery",
    "application-name": "Dungarvan Discovery",
    "msapplication-TileColor": "#8b5cf6",
    "theme-color": "#8b5cf6",
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Dungarvan Discovery",
              "description": "Interactive adventure cards for discovering hidden gems in Dungarvan, Ireland's Ancient East",
              "url": "https://dungarvan-discovery.vercel.app",
              "applicationCategory": "TravelApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              },
              "author": {
                "@type": "Organization",
                "name": "Dungarvan Discovery"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.0880",
                "longitude": "-7.6253"
              },
              "about": {
                "@type": "Place",
                "name": "Dungarvan",
                "description": "A charming coastal town in Ireland's Ancient East"
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
