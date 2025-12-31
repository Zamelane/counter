import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const interSans = Inter_Tight({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Коплю на квартиру",
  description: "Очень коплю...",
  openGraph: {
    type: 'website',
    images: {
      url: 'https://h.zmln.ru/og.png',
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <meta property="og:title" content="Коплю на квартиру" />
        <meta property="og:description" content="Очень коплю..." />
        <meta property="og:image" content="https://h.zmln.ru/og.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body
        className={`${interSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
