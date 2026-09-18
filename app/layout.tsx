import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata = {
  title: "Para Mariana",
  description: "Feliz 4to aniversario",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={playfair.className}>{children}</body>
    </html>
  );
}