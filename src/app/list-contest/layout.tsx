"use client";

import ContestLayout from "@/components/layout/ContestLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContestLayout>{children}</ContestLayout>
  );
}
