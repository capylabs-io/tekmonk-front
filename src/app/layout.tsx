import type { Metadata } from "next";
import { Inter, Dela_Gothic_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});

export const metadata: Metadata = {
  title: "Tekmonk",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${delaGothicOne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
