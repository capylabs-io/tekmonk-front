"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CommonButton } from "./button/CommonButton";
import { ROUTE } from "@/contants/router";
import { useUserStore } from "@/store/UserStore";
import { LogOut } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useCustomRouter } from "./router/CustomRouter";

export const Navbar = () => {
  const router = useCustomRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isConnected = useUserStore((state) => state.isConnected);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    useUserStore.getState().clear();
    router.push("/dang-nhap");
  };

  useEffect(() => {
    setIsClient(true);
    const controlNavbar = () => {
      if (typeof window !== undefined) {
        // If we're scrolling down, hide the navbar
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        }
        // If we're scrolling up, show the navbar
        else {
          setIsVisible(true);
        }
        // Update the last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== undefined) {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    isClient && (
      <header
        className={cn(
          "fixed top-0 h-16 left-0 right-0 bg-white z-50 transition-transform duration-300 w-full flex items-center justify-center border-b-2 border-gray-20",
          !isVisible && "-translate-y-full"
        )}
      >
        <div className="flex items-center justify-between px-4 w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/image/app-logo.png"
                alt="app logo"
                width={159}
                height={32}
                className="ml-1.5 lg:block hidden"
              />
              <Image
                src="/Logo.png"
                alt="app logo"
                width={34}
                height={32}
                className="ml-1.5 lg:hidden block"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 text-SubheadMd text-gray-95">
              <Link
                href="https://courses.tekmonk.edu.vn/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Khóa học
              </Link>
              {/* <Link
                href="/olympiad"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Olympiad
              </Link> */}
              <Link
                href={ROUTE.NEWS}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Tin tức
              </Link>
              <Link
                href={ROUTE.HIRING}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Tuyển Dụng
              </Link>
              <Link
                href="/su-kien"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sự kiện
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex items-center space-x-4 w-[200px] justify-end",
              isConnected() && "w-[120px]"
            )}
          >
            {/* <Link
              href="/lien-he"
              className="hidden md:inline-flex text-SubheadMd text-gray-95"
            >
              Liên hệ
            </Link> */}
            {isConnected() ? (
              <div className="flex items-center xl:justify-between justify-center relative md:block">
                <Dialog open={isMenuOpen} onOpenChange={toggleMenu}>
                  <DialogTrigger
                    onClick={toggleMenu}
                    className="hover:text-primary-600 xl:block hidden "
                  >
                    <div
                      className="xl:h-10 xl:w-10 h-8 w-8 rounded-full flex flex-col bg-[url('/image/home/profile-pic.png')] bg-yellow-100 items-center justify-center bg-cover"
                      onClick={toggleMenu}
                    />
                  </DialogTrigger>
                  <DialogContent className=" z-[999] absolute -translate-x-1/2 -bottom-[70px] left-1/2 rounded-lg pl-4 bg-white shadow-md flex gap-2 items-center">
                    <LogOut size={18} className="text-red-600" />
                    <button
                      className="w-max text-gray-600 font-normal p-4 pl-2"
                      onClick={handleLogout}
                    >
                      Đăng xuất tài khoản
                    </button>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <CommonButton className="h-10 text-white md:block hidden">
                <Link href={ROUTE.LOGIN} className="text-SubheadMd">
                  Đăng nhập
                </Link>
              </CommonButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    )
  );
};
