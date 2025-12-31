import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interSans = Inter_Tight({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Коплю на квартиру",
  description: "Очень коплю...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${interSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
