"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CardContest,
  CardContestContent,
} from "@/components/common/CardContest";
import { LAYERS } from "@/contants/layer";
import { Clock } from "@/components/contest/Clock";
import TypingAnimation from "@/components/ui/typing-animation";
import BlurFade from "@/components/ui/blur-fade";
import { useRouter } from "next/navigation";
import { Snackbar } from "@/components/common/Snackbar";
import { Loading } from "@/components/common/Loading";
import { Share } from "lucide-react";
import { shareOnMobile } from "react-mobile-share";

export default function Contest() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const startTime = process.env.NEXT_PUBLIC_START_TIME_CONTEST ? process.env.NEXT_PUBLIC_START_TIME_CONTEST.toString() : "";
  const endTime = process.env.NEXT_PUBLIC_END_TIME_CONTEST ? process.env.NEXT_PUBLIC_END_TIME_CONTEST.toString() : "";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isClient && (
      <>
        <div ref={ref} className="min-h-screen relative max-width-pc">
          <div className="w-full mx-auto px-4 py-8 relative flex justify-center">
            <div className="max-md:hidden">
              <Image
                src="/image/contest/Saly-12.png"
                alt="Stylized mobile phone"
                width={360}
                height={360}
                className={`absolute top-16 -left-[20%] -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.9}px)`,
                }}
              />

              <Image
                src="/image/contest/Saly-43.png"
                alt="Cartoon rocket"
                width={360}
                height={360}
                className={`absolute top-16 -right-[20%] -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.9}px)`,
                }}
              />

              <Image
                src="/image/contest/gold.png"
                alt="gold"
                width={184}
                height={184}
                className={`absolute top-[600px] -left-[20%] -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.8}px)`,
                }}
              />

              <Image
                src="/image/contest/img.png"
                alt="fire"
                width={272}
                height={272}
                className={`absolute top-[700px] -right-[20%] -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.8}px)`,
                }}
              />

              <Image
                src="/image/contest/Group-10.png"
                alt="decor"
                width={60}
                height={77}
                className={`absolute top-10 -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.8}px)`,
                }}
              />
              <Image
                src="/image/contest/Group-11.png"
                alt="Cartoon rocket"
                width={60}
                height={53}
                className={`absolute top-0 right-[40%] -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.2}px)`,
                }}
              />
              <Image
                src="/image/contest/Group-12.png"
                alt="Cartoon rocket"
                width={120}
                height={114}
                sizes="auto"
                className={`absolute top-10 right-0 -z-[${LAYERS.ICON_CONTEST}]`}
                style={{
                  transform: `translateY(${scrollY * 0.8}px)`,
                }}
              />
            </div>

            <div className="w-[884px] mt-4 relative">
              <div className="text-center mb-8 flex-col justify-center">
                <TypingAnimation
                  texts={["CUỘC THI", "SÁNG TẠO TRẺ"]}
                  className="text-primary-700 uppercase mb-2 font font-dela text-5xl md:text-6xl lg:text-7xl max-[460px]:text-4xl"
                />

                <div className="mt-7 text-Subhead3Xl text-primary-950 max-[460px]:text-xl">
                  BÁO TIỀN PHONG TỔ CHỨC
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

              <section>
                <BlurFade delay={0.25 + 3 * 0.05} inView>
                  <Clock startTime={startTime} endTime={endTime} />
                </BlurFade>

                <BlurFade delay={0.25 + 4 * 0.05} inView>
                  <CardContest
                    className={`mt-12 px-6 flex flex-col justify-center items-center min-[686px]:max-w-4xl mx-auto overflow-hidden shadow-custom-gray p-6 z-[${LAYERS.POST}]
                      
                      max-[685px]:w-[580px]
                      max-[685px]:p-4
                      
                      max-mobile:w-[360px]
                      max-mobile:px-4
                      max-mobile:rounded-lg
                      
                    `}
                  >
                    <CardContestContent className="p-0 w-full">
                      <Image
                        src="/image/contest/Frame-43.png"
                        alt="Contest participants"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-lg max-mobile:rounded-md"
                      />

                      <div className="p-6 w-full">
                        <div className="w-full text-center text-gray-950 text-base mx-auto">
                          Chia sẻ thông tin
                        </div>
                        <div className="mt-6 flex justify-center cursor-pointer gap-3 space-x-2"
                          onClick={() =>
                            shareOnMobile({
                              text: "Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.",
                              url: process.env.NEXT_PUBLIC_URL_CONTEST + '/contest',
                              title: "CUỘC THI SÁNG TẠO TRẺ",
                              images: [
                                "/image/contest/Frame-43.png",
                              ],
                            })
                          }
                        >
                          <Share />
                        </div>
                        <div className="font-bold text-[32px] text-gray-950 text-center">
                          THỂ LỆ CUỘC THI
                        </div>
                        <div className="mt-4 text-gray-950 text-base max-mobile:text-base">
                          Học viện công nghệ Tekmonk phối hợp cùng Công ty cổ phần Tiền Phong tổ chức cuộc thi “VIETNAM CODING OLYMPIAD 2024” được bảo trợ bởi Báo Tiền Phong với chủ đề: “Năng Lượng Xanh”. Cuộc thi với mục tiêu tạo sân chơi, cơ hội giao lưu và học tập cho học sinh trên toàn quốc.
                        </div>
                        <div className="mt-4 ">
                          <span className="text-gray-950 font-medium text-base max-mobile:text-base">Thời gian: </span><span className="text-black">11/11/2024</span>
                        </div>
                        <div className="mt-4 ">
                          <span className="text-gray-950 font-medium text-base max-mobile:text-base">Địa chỉ: </span>
                          <span className="text-black">Nhà thi đấu Trịnh Hoài Đức</span>
                        </div>
                        <div className="mt-4 ">
                          <span className="text-gray-950 font-medium text-base max-mobile:text-base">Đối tượng dự thi: </span><span className="text-black">Học sinh từ 6 đến 17 tuổi trên toàn quốc</span>
                        </div>
                        <div className="mt-4 ">
                          <span className="text-gray-950 font-medium text-base max-mobile:text-base">Lệ phí tham dự: </span><span className="text-black">300,000 VND / thí sinh</span>
                        </div>
                        <div className="mt-4 ">
                          <span className="text-gray-950 font-medium text-base max-mobile:text-base">Hạn cuối nhận đăng ký: </span><span className="text-black">31/10/2024</span>
                        </div>
                        <div className="mt-4 w-full min-h-[112px] px-[10px] bg-primary-100 flex flex-col  justify-around rounded-md">
                          <div className="text-base fill-black">Thông tin chuyển khoản: Công ty Cổ phần Tiền Phong</div>
                          <div className="text-base">STK: 1027549219 - Ngân Hàng TMCP Ngoại thương Việt Nam</div>
                          <div className="text-base">Cú pháp CK: Tên thí sinh + Số điện thoại</div>
                        </div>
                      </div>
                    </CardContestContent>
                  </CardContest>
                </BlurFade>
              </section>
            </div>
          </div>
        </div>
      </>
    )
  );
}
