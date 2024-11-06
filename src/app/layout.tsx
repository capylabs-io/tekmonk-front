import type { Metadata } from "next";
import { Inter, Dela_Gothic_One, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Loading } from "@/components/common/Loading";
import { ToastContainer } from "react-toastify";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Snackbar } from "@/components/common/Snackbar";

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
  description: "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
  icons: {
    icon: "/favicon.ico?v=4",
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "CUỘC THI SÁNG TẠO TRẺ",
    description:
      "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
    siteName: "Tekmonk",
    images: [
      {
        url: process.env.NEXT_PUBLIC_METADATA_CONTEST_IMAGE || "/default-image.jpg",
        width: 1200,
        height: 630,
        alt: "CUỘC THI SÁNG TẠO TRẺ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tekmonk",
    title: "CUỘC THI SÁNG TẠO TRẺ",
    description:
      "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
    images: [process.env.NEXT_PUBLIC_METADATA_CONTEST_IMAGE || "/default-image.jpg"],
  },
  other: {
    "fb:app_id": "1234567890",
    "og:image:alt": "CUỘC THI SÁNG TẠO TRẺ",
    "og:locale": "vi_VN",
    "og:site_name": "Tekmonk",
    "twitter:image:alt": "CUỘC THI SÁNG TẠO TRẺ",
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
        {/* <ToastContainer /> */}
        <Snackbar />
        <div className="relative">{children}</div>
        <Loading />
      </body>
    </html>
  );
}
