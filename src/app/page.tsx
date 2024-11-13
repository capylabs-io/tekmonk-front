// "use client";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import { Kanit, Dela_Gothic_One } from "next/font/google";
// import { useRouter } from "next/navigation";
// import { FunnelCard } from "@/components/funnel/FunnelCard";

// const kanit = Kanit({ weight: "400", subsets: ["latin"] });
// const delaGothicOne = Dela_Gothic_One({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-delo",
// });

// export default function Landing() {
//   const router = useRouter();
//   // phụ huynh
//   const handleCardClick = () => {
//     window.open("https://tekmonk.edu.vn/");
//   };
//   //học viên
//   const handleCard1Click = () => {
//     router.push("/landing");
//   };
//   //giảng viên
//   const handleCard2Click = () => {
//     router.push("/landing");
//   };
//   //menu tuyển dụng
//   const handleMenuClick = () => {
//     router.push("/recruitment");
//   };
//   return (
//     //mặc định chuyển hướng về trang contest
//      1 != 1 ?
//     <>
//       <div className="h-screen relative">
//         <nav className="w-full flex justify-between p-4">
//           <Image
//             src="/image/app-logo.png"
//             alt="app logo"
//             width={159}
//             height={32}
//           />
//           <ul className="flex items-center gap-4">
//             <li className="cursor-pointer hover:text-primary-600">
//               <a href="https://tekmonk.edu.vn/category/san-pham-hoc-vien/">
//                 Sản Phẩm
//               </a>
//             </li>
//             <li
//               className="cursor-pointer hover:text-primary-600"
//               onClick={handleMenuClick}
//             >
//               Tuyển dụng
//             </li>
//             <li className="cursor-pointer hover:text-primary-600">
//               <a href="https://tekmonk.edu.vn/gioi-thieu/">Về chúng tôi</a>
//             </li>
//           </ul>
//         </nav>
//         <div className="w-full relative flex justify-center max-h-[360px] z-20">
//           <Image
//             src="/image/home/left-banner-2.png"
//             alt="left banner"
//             className="absolute left-0 mt-16"
//             width={350}
//             height={350}
//           />
//           <Image
//             src="/image/landing/right-banner-pic.png"
//             alt="right banner"
//             className="absolute right-0 mt-16"
//             width={320}
//             height={320}
//           />
//         </div>
//         <div className="z-50 flex flex-col items-center text-center justify-center w-full mt-16">
//           <div
//             className={`mt-3 text-[58px] text-primary-950 font-bold ${kanit.className} w-2/5 leading-none`}
//           >
//             Vui chơi, sáng tạo và kết nối cộng đồng
//           </div>
//           <div className="text-xl text-gray-500 w-1/4 mt-6">
//             Được tin dùng bởi hàng nghìn học sinh và phụ huynh của Tekmonk
//           </div>
//         </div>
//         <div className="bg-cover w-full h-[400px] 2xl:h-[500px] bg-gradient-to-t from-[#E079D4]/80 to-[#EE94E5]/10 fixed -bottom-8 2xl:bottom-0 flex justify-center items-center gap-x-8 rounded-t-[50%] z-0 scale-105"></div>
//         <Image
//           src="/image/landing/left-stars.png"
//           alt="coin"
//           width={60}
//           height={77}
//           className="fixed top-24 left-[20%] scale-110"
//         />
//         <Image
//           src="/image/landing/middle-stars.png"
//           alt="coin"
//           width={60}
//           height={53}
//           className="fixed top-16 left-[50%] scale-110"
//         />
//         <Image
//           src="/image/landing/right-stars.png"
//           alt="coin"
//           width={120}
//           height={114}
//           className="fixed top-24 right-[18%] scale-110"
//         />
//         <Image
//           src="/image/landing/coins-x15.png"
//           alt="coin"
//           width={160}
//           height={160}
//           className="fixed bottom-20 left-20 scale-110"
//         />
//         <Image
//           src="/image/landing/fire-x15.png"
//           alt="coin"
//           width={160}
//           height={160}
//           className="fixed -bottom-16 right-20 rotate-[-10deg] scale-125"
//         />
//         <div className="w-full text-SubheadXl text-center mt-24 2xl:mt-60 text-primary-950">
//           Bắt đầu với vai trò...
//         </div>
//         <div className="w-full flex justify-center items-center gap-x-8 z-20 mt-5">
//           <FunnelCard
//             title="Phụ huynh"
//             imageUrl="/image/home/parent-icon.png"
//             onClick={handleCardClick}
//           />
//           <FunnelCard
//             title="Học viên"
//             imageUrl="/image/home/student-icon.png"
//             onClick={handleCard1Click}
//           />
//           <FunnelCard
//             title="Giáo viên"
//             imageUrl="/image/home/teacher-icon.png"
//             onClick={handleCard2Click}
//           />
//         </div>
//       </div>
//     </>
//     : router.push("/")
//   );
// }
"use client";

import {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {CardContest, CardContestContent,} from "@/components/common/CardContest";
import {LAYERS} from "@/contants/layer";
import Clock from "@/components/contest/Clock";
import TypingAnimation from "@/components/ui/typing-animation";
import BlurFade from "@/components/ui/blur-fade";
import {shareOnMobile} from "react-mobile-share";
import {getContest} from "@/requests/contest";
import ContestLayout from "@/components/layout/ContestLayout";
import {Share} from "lucide-react";
import ContestRules from "@/components/contest/rules/ContestRules";
import {Button} from "@/components/common/Button";
import {IconDisPlay} from "@/components/contest/IconDisplay";
import {AccordionContest} from "@/components/contest/rules/AccordionContest";
import {Contest as TypeContest} from "@/types/common-types";

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
    } catch (error) {
    }
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
                      {contestData && (
                        <Clock contestData={contestData}/>
                      )}
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
                            src="/image/contest/22222.jpg"
                            alt="Contest participants"
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg max-mobile:rounded-md"
                          />

                          <div className="p-6 w-full max-mobile:p-2">
                            
                            <div className="mt-2 flex w-full justify-center items-center gap-x-5 
                            max-mobile:flex-col
                            max-mobile:gap-y-3
                            
                            ">
                            <Button
                                className="border border-gray-300 !rounded-[3rem] shadow-custom-gray min-w-[200px] "
                                outlined={true}
                                onClick={() =>
                                  window.open(
                                    "https://tekdojo-be.s3.ap-southeast-1.amazonaws.com/Contest-Submission/Tekmonk_rule_1ed7a0d6b8.pdf",
                                    "_blank"
                                  )
                                }
                              >
                                Chi tiết thể lệ cuộc thi
                              </Button>
                              <Button
                                className="border border-gray-300 !rounded-[3rem] shadow-custom-gray min-w-[200px]  "
                                outlined={true}
                                onClick={() =>
                                  shareOnMobile({
                                    text: "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
                                    url: process.env.NEXT_PUBLIC_BASE_URL,
                                    title: "CUỘC THI SÁNG TẠO TRẺ",
                                    // images: ["/image/contest/Frame-43.png"],
                                  })
                                }
                              >
                                Chia sẻ cuộc thi
                                <Share className="ml-2"/>
                              </Button>
                              
                            </div>
                            
                            <div
                              id="rules"
                              className="mt-6 font-bold text-[32px] text-gray-950 text-center max-mobile:text-[24px] max-md:text-[28px]"
                            >
                              Thể lệ giải vô địch TEKMONK CODING OLYMPIAD
                            </div>
                            <div className="mt-10 text-gray-950 text-bodyLg max-mobile:text-base">
                              Giải đấu Tekmonk Coding Olympiad được tổ chức bởi
                              Học viện Công nghệ Tekmonk, thuộc Tập đoàn Hanoi
                              Telecom, là sân chơi trí tuệ hàng đầu dành cho học
                              sinh yêu thích lập trình từ lớp 3 đến lớp 12. Với
                              sứ mệnh mang lập trình đến gần hơn với thế hệ trẻ,
                              Tekmonk Coding Olympiad không chỉ là một cuộc thi
                              mà còn là cơ hội để các em phát triển tư duy logic
                              và rèn luyện kỹ năng giải quyết vấn đề thực tiễn.
                            </div>
                            <div className="mt-6 text-gray-950 text-bodyLg max-mobile:text-base">
                              Top 20 thí sinh xuất sắc nhất của Giải đấu sẽ được
                              lựa chọn tham gia Olympic STEM Quốc tế, với cơ hội
                              dự thi vòng chung kết tại Barcelona, Tây Ban Nha
                              vào tháng 7 năm 2025.
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
