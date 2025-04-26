"use client";
import Link from "next/link";
import {
  Home,
  Bell,
  Bookmark,
  User,
  MoreHorizontal,
  PenSquare,
} from "lucide-react";
import type React from "react"; // Import React
import { useEffect } from "react";
import { useState } from "react";

interface LayoutProps {
  leftSidebar: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export default function CommonLayout({
  leftSidebar,
  mainContent,
  rightSidebar,
}: LayoutProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div className="min-h-screen">
        <div className="container mx-auto flex">
          {/* Left Sidebar */}
          <div className="sticky top-0 hidden h-screen w-64 flex-shrink-0 md:block">
            {leftSidebar}
          </div>

          {/* Main Content - flex-grow makes it expand */}
          <main className="min-w-0 flex-grow border-x border-gray-20">
            {/* Removed nested div, apply overflow directly if needed, or handle scrolling within mainContent component */}
            {mainContent}
          </main>

          {/* Right Sidebar */}
          {rightSidebar && (
            <div className="sticky top-0 hidden h-screen w-96 flex-shrink-0 border-l border-gray-20 p-4 xl:block">
              {rightSidebar}
            </div>
          )}

          {/* Mobile Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around border-t bg-background p-4 md:hidden">
            <Link href="/" className="p-2">
              <Home className="h-6 w-6" />
            </Link>
            <Link href="/notifications" className="p-2">
              <Bell className="h-6 w-6" />
            </Link>
            <Link href="/bookmarks" className="p-2">
              <Bookmark className="h-6 w-6" />
            </Link>
            <Link href="/profile" className="p-2">
              <User className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    )
  );
}
