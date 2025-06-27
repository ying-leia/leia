import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEIA - Eternal Flower Arrangements",
  description: "Discover eternal flower arrangements crafted with intention. Preserved blooms from sustainable Ecuadorian farms that last for years.",
  keywords: ["eternal flowers", "preserved flowers", "floral arrangements", "sustainable flowers", "home decor"],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LEIA',
  },
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        url: '/favicon/favicon-32x32.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/favicon/favicon-48x48.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      // Add larger sizes when you create them
      // {
      //   url: '/favicon/favicon-64x64.ico',
      //   sizes: '64x64',
      //   type: 'image/x-icon',
      // },
      // {
      //   url: '/favicon/favicon-128x128.ico',
      //   sizes: '128x128',
      //   type: 'image/x-icon',
      // },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F5F2]`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
