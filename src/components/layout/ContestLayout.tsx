"use client";

import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../common/Button";
import { useUserStore } from "@/store/UserStore";
import { getOneContestEntry } from "@/requests/contestEntry";
import { getContestSubmissionByContestEntry } from "@/requests/contestSubmit";
import { useSnackbarStore } from "@/store/SnackbarStore";
import {Link as LinkToScroll} from "react-scroll";
const nunitoSans = Nunito_Sans({
  // weight: "600",
  subsets: ["latin"],
  variable: "--font-nunito",
});

type ContestLayoutProps = {
  children: React.ReactNode;
};

const ContestLayout = ({ children }: ContestLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  //use state
  const [isClient, setIsClient] = useState(false);
  const [clear, isConnected] = useUserStore((state) => [
    state.clear,
    state.isConnected,
  ]);

  //use store
  const [success] = useSnackbarStore((state) => [state.success]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isSubmitted = useUserStore((state) => state.isSubmitted);

  //handle function
  const handleLogout = () => {
    clear();
    success("Success", "Đăng xuất thành công");
    router.push("/login");
  };
  const redirectContest = () => {
    //handle if user is not at main page =>  refirect to main page
    if (pathname != "/") {
      router.push("/");
      return;
    }
    return;
  };

  const handleRedirectToMyContest = async () => {
    try {
      const contestEntry = await getOneContestEntry(
        useUserStore.getState().candidateNumber || ""
      );
      const contestSubmission = await getContestSubmissionByContestEntry(
        contestEntry.id
      );
      if (contestSubmission.data.length === 0) {
        return;
      }
      router.push(`/tong-hop-bai-du-thi/${contestSubmission.data[0].id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRedirectResultContest = () => {
    router.push("/ket-qua-vong-loai");
  };

  return (
    isClient && (
      <div
        className={`${nunitoSans.variable} font-sans relative w-full h-full flex flex-col overflow-hidden`}
      >
        <TooltipProvider>

          {/* Header */}
          <div className="relative h-16 w-full flex items-center justify-between px-4 sm:px-12 border-b bg-white ">
            <Image
              src="/image/app-logox2.png"
              alt="app logo"
              width={159}
              height={32}
              className="hover:cursor-pointer h-8 w-40"
              onClick={() => router.push("/")}
            />

            {/* Desktop Menu */}
            {/* Nếu sử dụng router hay Link thì khi nhập thông tin phần đăng ký contest sẽ bị lỗi => tạm thời dùng thẻ a */}
            <nav className="hidden md:flex w-[450] h-full items-center justify-around text-gray-950 gap-x-3 text-bodyMd">

          <LinkToScroll to="rules" smooth={true} duration={500}>
              <div
                className="text-gray-950  cursor-pointer"
                onClick={redirectContest}
              >
                Thể lệ
              </div>
          </LinkToScroll>

              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="text-gray-950  cursor-pointer"
                      // onClick={() => router.push("/tong-hop-bai-du-thi")}
                    >
                      Tổng hợp bài dự thi
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sắp diễn ra</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {isConnected() && isSubmitted && (
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="text-bodyMd hover:cursor-pointer"
                      // onClick={handleRedirectToMyContest}
                    >
                      Bài dự thi của tôi
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sắp diễn ra</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="text-bodyMd hover:cursor-pointer"
                    // onClick={handleRedirectResultContest}
                  >
                    Kết quả vòng loại
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sắp diễn ra</p>
                </TooltipContent>
              </Tooltip>

              {isConnected() ? (
                <div
                  className="text-red-600 text-bodyMd  hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              ) : (
                // <a href="/login" className="cursor-pointer">
                //   Đăng nhập
                // </a>
                <div
                  onClick={() => router.push("/login")}
                  className=" hover:cursor-pointer"
                >
                  Đăng nhập
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
            <Drawer direction="top">
              <DrawerTrigger >
                <div
                  className="text-gray-950 hover:cursor-pointer"
                >
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
                </div>
              </DrawerTrigger>
              <DrawerContent className="bg-white !p-0">
                <div className="w-full max-w-sm">
                  <div className=" pb-0 gap-y-4">
                    <Button outlined={true} onClick={() => router.push("/")}>
                      <div
                        className="text-black text-base"
                        onClick={redirectContest}
                      >
                        Thể lệ
                      </div>
                    </Button>
                    <Button
                      outlined={true}
                      // onClick={() => router.push("/tong-hop-bai-du-thi")}
                    >
                      <div className="text-black text-base">
                        Tổng hợp bài dự thi
                      </div>
                    </Button>
                    {isConnected() && isSubmitted && (
                      <Button
                        outlined={true}
                        // onClick={handleRedirectToMyContest}
                      >
                        <div className="text-black text-base">
                          Bài dự thi của tôi
                        </div>
                      </Button>
                    )}

                    <Button
                      outlined={true}
                      // onClick={() => router.push("/ket-qua-vong-loai")}
                    >
                      <div className="text-black text-base">
                        Kết quả vòng loại
                      </div>
                    </Button>

                    {!isConnected() && (
                      <Button
                        outlined={true}
                        onClick={() => router.push("/login")}
                      >
                        <div className="text-black text-base">Đăng nhập</div>
                      </Button>
                    )}
                  </div>
                  <DrawerFooter className="px-0">
                    {/* <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose> */}
                    {isConnected() && (
                      <div>
                        <Button
                          outlined={true}
                          className="text-red-600"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Button>
                      </div>
                    )}
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            </div>
          </div>
        </TooltipProvider>

        <main className="flex-grow relative z-0 max-w-[960px] w-full mx-auto text-gray-800 bg-opacity-80">
          {children}
        </main>
      </div>
    )
  );
};

export default ContestLayout;
