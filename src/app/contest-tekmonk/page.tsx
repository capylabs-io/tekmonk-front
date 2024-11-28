"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  CardContest,
  CardContestContent,
} from "@/components/common/CardContest";
import { LAYERS } from "@/contants/layer";
import Clock from "@/components/contest/Clock";
import TypingAnimation from "@/components/ui/typing-animation";
import BlurFade from "@/components/ui/blur-fade";
import { shareOnMobile } from "react-mobile-share";
import { getContest } from "@/requests/contest";
import ContestLayout from "@/components/layout/ContestLayout";
import { Share } from "lucide-react";
import ContestRules from "@/components/contest/rules/ContestRules";
import { Button } from "@/components/common/Button";
import { IconDisPlay } from "@/components/contest/IconDisplay";
import { AccordionContest } from "@/components/contest/rules/AccordionContest";
import { Contest as TypeContest } from "@/types/common-types";
import {
  CONTEST_RULES_DETAILS,
  SHARE_TEXT,
  SHARE_TITLE,
} from "@/contants/contest/tekmonk";

export default function Contest() {
  // => use state
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [contestData, setContestData] = useState<TypeContest>();

  // => use store

  // => function handle
  const fetchContestData = async () => {
    try {
      const res = await getContest();
      if (res) {
        setContestData(res);
      }
    } catch (error) {}
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  //use effect
  useEffect(() => {
    //call api
    fetchContestData();

    setIsClient(true);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const Typing = useMemo(() => {
    return (
      <TypingAnimation
        texts={["GIẢI VÔ ĐỊCH", "TEKMONK CODING OLYMPIAD"]}
        className="text-primary-700 uppercase font font-dela text-5xl md:text-6xl lg:text-7xl max-[460px]:text-[40px]
                      max-md:tracking-[0.02em] 
                      max-md:!leading-[3rem]
                      "
      />
    );
  }, []);

  return (
    isClient && (
      <div className="relative overflow-hidden">
        <div
          className={`absolute w-[195%] h-full top-[480px] -translate-x-1/2 left-1/2 -z-[${LAYERS.BACKGROUND_2}]
      bg-gradient-to-b from-[rgb(248,239,248)] to-[rgb(159,42,143)] rounded-t-[50%] 
      max-mobile:w-[310%] max-mobile:top-[430px]
      max-md:w-[260%] max-md:top-[400px]`}
        ></div>
        <div
          className={`absolute w-[140%] h-full top-[480px] -translate-x-1/2 left-1/2 -z-[${LAYERS.BACKGROUND_1}]
      bg-gradient-to-b from-[rgb(247,224,246)] to-[rgb(224,121,213)] rounded-t-[50%] 
      max-mobile:w-[300%] max-mobile:top-[430px]
      max-md:w-[230%] max-md:top-[400px]`}
        ></div>
        <ContestLayout>
          <>
            <div className="min-h-screen relative max-width-pc">
              <div className="w-full mx-auto px-4 py-8 relative flex justify-center">
                {/*  */}
                <IconDisPlay />
                {scrollY > 500 && (
                  <div
                    className="w-10 h-10 bg-white fixed bottom-3 right-5 z-[1000] cursor-pointer rounded-full"
                    onClick={handleScrollToTop}
                  >
                    <Image
                      src="/image/contest/scroll-top.png"
                      alt="scroll-up"
                      width={32}
                      height={32}
                      className="mx-auto mt-1"
                    />
                  </div>
                )}
                <div className="w-[884px] mt-4 relative">
                  <div className="text-center mb-8 flex-col justify-center px-1">
                    {Typing}

                    <div className="mt-4 text-Subhead3Xl text-primary-950 max-[460px]:text-xl max-[460px]:!leading-[1.5rem]">
                      Cuộc thi Lập trình cấp Quốc Gia đầu tiên dành cho học sinh
                    </div>
                  </div>
                  {/* use later */}
                  {/* <div
                  className="w-full h-auto mt-[52px] sm:h-[150px] flex justify-center items-center gap-4 mx-auto 
                              max-sm:h-[110px]"
                >
                  <CardContest className="w-[250px] max-sm:w-[200px] h-full flex flex-col items-center justify-center relative shadow-custom-gray bg-white">
                    <div className=" text-SubheadMd max-sm:text-sm text-gray-500">
                      Số thí sinh đăng ký
                    </div>

                    <NumberTicker
                      value={1800}
                      className="text-[40px] max-sm:text-[35px] font-normal text-primary-700 font-dela"
                    />
                  </CardContest>

                  <CardContest className="w-[250px] max-sm:w-[200px] h-full flex flex-col items-center justify-center relative shadow-custom-gray bg-white">
                    <div className=" text-SubheadMd max-sm:text-sm text-gray-500">
                      Số bài dự thi
                    </div>
                    <NumberTicker
                      value={50}
                      className="text-[40px] max-sm:text-[35px] font-normal text-primary-700 font-dela"
                    />
                  </CardContest>
                </div> */}

                  <div className=" mt-0 p-0">
                    <BlurFade delay={0.25 + 3 * 0.05} inView>
                      {contestData && <Clock contestData={contestData} />}
                    </BlurFade>
                    <BlurFade delay={0.25 + 4 * 0.05} inView>
                      <CardContest
                        className={`mt-12 px-6 flex flex-col justify-center items-center min-[686px]:max-w-4xl mx-auto overflow-hidden shadow-custom-gray p-6 z-[${LAYERS.POST}]
                      
                      max-[685px]:w-[580px]
                      max-[685px]:p-4
                      
                      max-mobile:w-[360px]
                      max-mobile:p-1 
                      max-mobile:rounded-lg
                      
                    `}
                      >
                        <CardContestContent className="p-0 w-full">
                          <Image
                            src="/image/contest/banner-landing.jpg"
                            alt="Contest participants"
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg max-mobile:rounded-md"
                          />

                          <div className="p-6 w-full max-mobile:p-2">
                            <div
                              className="mt-2 flex w-full justify-center items-center gap-x-5 
                            max-mobile:flex-col
                            max-mobile:gap-y-3
                            
                            "
                            >
                              <Button
                                className="border border-gray-300 !rounded-[3rem] shadow-custom-gray min-w-[200px] "
                                outlined={true}
                                onClick={() =>
                                  window.open(CONTEST_RULES_DETAILS, "_blank")
                                }
                              >
                                Chi tiết thể lệ cuộc thi
                              </Button>
                              <Button
                                className="border border-gray-300 !rounded-[3rem] shadow-custom-gray min-w-[200px]  "
                                outlined={true}
                                onClick={() =>
                                  shareOnMobile({
                                    text: SHARE_TEXT,
                                    url: process.env.NEXT_PUBLIC_BASE_URL,
                                    title: SHARE_TITLE,
                                    // images: ["/image/contest/Frame-43.png"],
                                  })
                                }
                              >
                                Chia sẻ cuộc thi
                                <Share className="ml-2" />
                              </Button>
                            </div>

                            <div
                              id="rules"
                              className="mt-6 font-bold text-[32px] text-gray-950 text-center max-mobile:text-[24px] max-md:text-[28px]"
                            >
                              Thể lệ giải vô địch TEKMONK CODING OLYMPIAD
                            </div>
                            <div className="mt-10 text-gray-950 text-bodyLg max-mobile:text-base">
                              <b>“Tekmonk Coding Olympiad”</b> là giải vô địch
                              lập trình nằm trong khuôn khổ{" "}
                              <b>
                                cuộc thi Vô địch Quốc gia STEM, AI và Robotics
                                2024 (VSAR)
                              </b>{" "}
                              do <b>báo Tiền Phong và báo Hoa Học Trò</b> tổ
                              chức dưới sự chỉ đạo của{" "}
                              <b>
                                Trung ương Đoàn TNCS Hồ Chí Minh, Bộ Khoa học và
                                Công nghệ, nằm trong hoạt động của ngày hội STEM
                                quốc gia.
                              </b>{" "}
                              Với định hướng đẩy mạnh giáo dục STEM trong trường
                              học phổ thông, Tekmonk Coding Olympiad không chỉ
                              là một cuộc thi mà còn là sân chơi để các em phát
                              triển tư duy logic và rèn luyện kỹ năng giải quyết
                              vấn đề thực tiễn thông qua các nhiệm vụ thiết kế,
                              lập trình. Không những vậy, sự kiện còn là cơ hội
                              để các bạn giao lưu, học hỏi từ các chuyên gia đầu
                              ngành và bạn bè quốc tế.
                            </div>

                            <div className=" mt-10 max-mobile:hidden">
                              <ContestRules />
                            </div>
                            {/* for mobile  */}
                            <div className="hidden max-mobile:block">
                              <AccordionContest />
                            </div>
                          </div>
                        </CardContestContent>
                      </CardContest>
                    </BlurFade>
                  </div>
                </div>
              </div>
            </div>
          </>
        </ContestLayout>
      </div>
    )
  );
}