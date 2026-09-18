import type { Metadata, Viewport } from "next";
import { Bangers, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "Para Mariana · Nº 4",
  description: "Feliz 4to aniversario",
};

export const viewport: Viewport = {
  themeColor: "#07070b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${bangers.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}