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

import localFont from "next/font/local";

const migra = localFont({
  src: [
    {
      path: '../public/fonts/Migra-Extrabold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../public/fonts/Migra-Extralight.woff2',
      weight: '600',
      style: 'regular',
    },
    {
      path: '../public/fonts/Migra-Extralight.woff2',
      weight: '500',
      style: 'light',
    },
  ],
  variable: '--font-migra',
});

export const metadata: Metadata = {
  title: "Buildspace",
  description: "A community of builders and entrepreneurs",
  icons: {
    icon: '/images/buildspace.png',
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
        className={`${migra.variable} font-[family-name:var(--font-migra)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
