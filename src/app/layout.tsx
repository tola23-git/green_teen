import type { Metadata } from "next";
import { Bangers, Exo_2 } from "next/font/google";
import "./globals.css";

const brand = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const tech = Exo_2({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Green Ten",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${brand.variable} ${tech.variable}`}>
      <body>{children}</body>
    </html>
  );
}