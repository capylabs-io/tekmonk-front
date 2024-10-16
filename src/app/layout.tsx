import type { Metadata } from "next";
import { Inter, Dela_Gothic_One, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Loading } from "@/components/common/Loading";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
});

const nunitoSans = Nunito_Sans({
  // weight: "600",
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Tekmonk",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico?v=4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${delaGothicOne.variable}`}
    >
      <body>
        <ToastContainer />
        <div>{children}</div>
        <Loading />
      </body>
    </html>
  );
}
