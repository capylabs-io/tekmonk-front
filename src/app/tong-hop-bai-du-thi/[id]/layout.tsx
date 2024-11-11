import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CUỘC THI SÁNG TẠO TRẺ",
  description:
    "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/tong-hop-bai-du-thi/[id]",
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

export default function Layout({ children }: { children: React.ReactNode }) {
return <>{children}</>;    
}
