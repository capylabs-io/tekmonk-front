import type { Metadata } from "next";
import { Dela_Gothic_One, Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Loading } from "@/components/common/Loading";
import { Snackbar } from "@/components/common/Snackbar";
import { Suspense } from "react";
import {CONTEST_SHARE_IMAGE_LINK, SHARE_TEXT, SHARE_TITLE} from "@/contants/contest/tekmonk";

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
  description: SHARE_TEXT,
  icons: {
    icon: "/favicon.ico?v=4",
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: SHARE_TITLE,
    description: SHARE_TEXT,
    siteName: "Tekmonk",
    images: [
      {
        url:
        CONTEST_SHARE_IMAGE_LINK,
        width: 1200,
        height: 630,
        alt: SHARE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tekmonk",
    title: SHARE_TITLE,
    description: SHARE_TEXT,
    images: [
      CONTEST_SHARE_IMAGE_LINK,
    ],
  },
  other: {
    "fb:app_id": "1234567890",
    "og:image:alt": SHARE_TITLE,
    "og:locale": "vi_VN",
    "og:site_name": "Tekmonk",
    "twitter:image:alt": SHARE_TITLE,
    "twitter:creator": "@tekmonk",
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
        <Snackbar />
        <Suspense fallback={<Loading />}>
          <div className="relative">{children}</div>
        </Suspense>
        <Loading />
      </body>
    </html>
  );
}
