"use client";

import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LAYOUT_MAX_WIDTH } from "@/contants/layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useUserStore } from "@/store/UserStore";
const nunitoSans = Nunito_Sans({
  // weight: "600",
  subsets: ["latin"],
  variable: "--font-nunito",
});

type ContestLayoutProps = {
  children: React.ReactNode;
}

const ContestLayout = ({ children }: ContestLayoutProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isConnected = useUserStore((state) => state.isConnected);
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };
  const handleLogout = () => {
    useUserStore.getState().clear();
    router.push("/login");
  }
  return (
    isClient &&
    <div className={`${nunitoSans.variable} font-sans relative w-full h-full flex flex-col overflow-hidden`}>
      <TooltipProvider>
      
      {/* <div className="w-[200px] h-[200px] black"></div> */}

      <Image
        src="/image/contest/layer_bg.png"
        alt="Background"
        fill
        priority
        quality={40}
        className=""
      />

      {/* Header */}
      <div className="relative z-10 h-16 w-full flex items-center justify-between px-4 sm:px-12 border-b bg-white ">
        <Image
          src="/image/app-logox2.png"
          alt="app logo"
          width={159}
          height={32}
          className="hover:cursor-pointer h-8 w-40"
          onClick={() => router.push("/contest")}
        />

        {/* Desktop Menu */}
         {/* Nếu sử dụng router hay Link thì khi nhập thông tin phần đăng ký contest sẽ bị lỗi => tạm thời dùng thẻ a */}
        <nav className="hidden sm:flex w-96 h-full items-center justify-around text-gray-950">
          <a href="/contest" className="text-gray-950 text-bodyLg cursor-pointer">Thể lệ</a>
          
          <Tooltip>
          <TooltipTrigger asChild>
          <div className="cursor-pointer" onClick={() => router.push("/contest")}>Tổng hợp bài dự thi</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sắp diễn ra</p>
            </TooltipContent>
            
          </Tooltip>
          
          {!isConnected() ? 
            <div
              className="cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Đăng nhập
            </div> : <div
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Đăng xuất
            </div>
          }
         
          {/* <a href='/login' className="cursor-pointer" >Đăng nhập</a> */}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="sm:hidden text-gray-950">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-400 bg-opacity-60 z-20"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed flex flex-col justify-between z-30  right-0  h-full bg-white shadow-md border-t border-gray-200 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center py-2 text-gray-950">
          <li
	    className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
	    onClick={() => router.push("/contest")}
          >
            Thể lệ
          </li>
          <li
            className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
            onClick={() => router.push("/contest")}
          >
            Bài dự thi
          </li>
          {/* <li
            className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
            onClick={() => {
              console.log("click");
              router.push("/login");
              // toggleMenu();
            }}
          >
            Đăng nhập
          </li> */}
          {!isConnected() ? 
            <div
              className="cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Đăng nhập
            </div> : <div
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Đăng xuất
            </div>
          }
        </ul>
        {/* Account section */}
        <div className="flex items-center cursor-pointer py-1 px-3 border border-t border-gray-200">
          <Image
            className="w-[30px] h-[30px] rounded-full mr-3 border border-gray-100"
            src="/image/contest/gold.png"
            alt="User profile picture"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold flex items-center">
              {"Henry Nguyen"}
            </span>
            <span className="text-xs text-gray-500">Xem Profile</span>
          </div>
        </div>
      </div>
      {/* <AnimatedGridPattern
        numSquares={1000}
        maxOpacity={1}
        duration={1}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "h-[200%] inset-y-[-30%] inset-x-0 skew-y-12 w-full",
          `z-[${LAYERS.BACKGROUND}]`
        )}
        width={120}
        height={120}
      /> */}

      {/* Main Content */}
      </TooltipProvider>

      <main className={`flex-grow relative z-0 max-w-[${LAYOUT_MAX_WIDTH}px] w-full mx-auto text-gray-800 bg-opacity-80 bg-white border-r border-l min-h-screen`}>
        {children}
      </main>
    </div>
  );
};

export default ContestLayout;
