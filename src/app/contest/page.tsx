"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import {
  CardContest,
  CardContestContent,
} from "@/components/common/CardContest";
import { LAYERS } from "@/contants/layer";
import Clock from "@/components/contest/Clock";
import Share from "@/components/common/Share";
import TypingAnimation from "@/components/ui/typing-animation";
import BlurFade from "@/components/ui/blur-fade";
import NumberTicker from "@/components/ui/number-ticker";
import FormSubmitContest from "@/components/contest/FormSubmitContest";

export default function Contest() {
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState<boolean>(false);
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
      <div ref={ref} className="min-h-screen relative max-width-pc">
        <div className="w-full mx-auto px-4 py-8 relative flex justify-center">
          <div className="max-md:hidden">
            <Image
              src="/image/contest/Saly-12.png"
              alt="Stylized mobile phone"
              width={360}
              height={360}
              className={`absolute top-16 -left-10 -z-[${LAYERS.ICON_CONTEST}]`}
              style={{
                transform: `translateY(${scrollY * 0.9}px)`,
              }}
            />

            <Image
              src="/image/contest/Saly-43.png"
              alt="Cartoon rocket"
              width={360}
              height={360}
              className={`absolute top-16 -right-12 -z-[${LAYERS.ICON_CONTEST}]`}
              style={{
                transform: `translateY(${scrollY * 0.9}px)`,
              }}
            />

            <Image
              src="/image/contest/gold.png"
              alt="gold"
              width={184}
              height={184}
              className={`absolute top-[600px] left-0 -z-[${LAYERS.ICON_CONTEST}]`}
              style={{
                transform: `translateY(${scrollY * 0.8}px)`,
              }}
            />

            <Image
              src="/image/contest/img.png"
              alt="fire"
              width={272}
              height={272}
              className={`absolute top-[700px] right-0 -z-[${LAYERS.ICON_CONTEST}]`}
              style={{
                transform: `translateY(${scrollY * 0.8}px)`,
              }}
            />

            <Image
              src="/image/contest/Group-10.png"
              alt="decor"
              width={60}
              height={77}
              className={`absolute top-10 left-72 -z-[${LAYERS.ICON_CONTEST}]`}
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
              className={`absolute top-10 right-[10%] -z-[${LAYERS.ICON_CONTEST}]`}
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

              <div className="mt-[52px] flex items-center justify-center gap-4">
                <FormSubmitContest>
                  <Button
                    className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary"
                    outlined={false}
                    style={{
                      borderRadius: "4rem",
                    }}
                  >
                    Nộp bài thi
                  </Button>
                </FormSubmitContest>
                <Button
                  className="w-[312px] h-[52px] max-[460px]:w-[280px] shadow-custom-gray"
                  outlined={true}
                  style={{
                    borderRadius: "4rem",
                  }}
                >
                  Tổng hợp bài dự thi
                </Button>
              </div>
            </div>
            
              <div
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
              </div>
            
            <section>
              <BlurFade delay={0.25 + 3 * 0.05} inView>
                <Clock />
              </BlurFade>

              <BlurFade delay={0.25 + 4 * 0.05} inView>
                <CardContest
                  className={`mt-12  flex flex-col justify-center items-center min-[686px]:max-w-4xl mx-auto overflow-hidden p-6 z-[${LAYERS.POST}]
                    
                    max-[685px]:w-[580px]
                    max-[685px]:p-4
                    
                    max-mobile:w-[380px]
                    max-mobile:p-0
                    max-mobile:rounded-lg
                    
                  `}
                >
                  <CardContestContent className="p-0 w-full ">
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
                      <div className="mt-6 flex justify-center gap-3 space-x-2">
                        <Share />
                      </div>

                      <div className="mt-4 font-bold text-[32px] text-primary-900 text-center">
                        THỂ LỆ CUỘC THI
                      </div>

                      <div className="text-gray-950 font-medium text-lg max-mobile:text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet facilisis metus masuada consectetur. A eget amet
                        vitae neque euismod eu erat viverra. Aliquam interdum
                        sapien risus congue facilisis vitae. In mattis tortor
                        interdum sed. Eget commodo commodo sagittis faucibus
                        ultrices in imperdiet. Id pulvinar lectus amet laoreet
                        blandit interdum facilisis. At id faucibus purus egestas
                        eros sagittis semper. In at quis lectus vitae.
                      </div>
                      <div className="mt-2 text-gray-950 font-medium text-lg max-mobile:text-base">
                        Ac massa elementum leo egestas lectus. Commodo hendrerit
                        potenti pulvinar gravida nunc. Condimentum neque a orci
                        eget ridiculus fauciat posuere locus. Cras pellentesque
                        sed ut mi eget pharetra congue risus. Integer aliquam
                        eget orci arcu quis accumsan massa amet. Ultricies vel
                        quis blandit curabitur cursus tellus et in augue. Morbi
                        enim volutpat enim est tincidunt. Fusce aliquet
                        consectetur nisl morbi sit convallis. Nunc eget
                        facilisis facilisis lacus.
                      </div>
                      <div className="mt-2 text-gray-950 font-medium text-lg max-mobile:text-base">
                        Ac massa elementum leo egestas lectus. Commodo hendrerit
                        potenti pulvinar gravida nunc. Condimentum neque a orci
                        eget ridiculus fauciat posuere locus. Cras pellentesque
                        sed ut mi eget pharetra congue risus. Integer aliquam
                        eget orci arcu quis accumsan massa amet. Ultricies vel
                        quis blandit curabitur cursus tellus et in augue. Morbi
                        enim volutpat enim est tincidunt. Fusce aliquet
                        consectetur nisl morbi sit convallis. Nunc eget
                        facilisis facilisis lacus.
                      </div>
                      <div className="mt-2 text-gray-950 font-medium text-lg max-mobile:text-base">
                        Ac massa elementum leo egestas lectus. Commodo hendrerit
                        potenti pulvinar gravida nunc. Condimentum neque a orci
                        eget ridiculus fauciat posuere locus. Cras pellentesque
                        sed ut mi eget pharetra congue risus. Integer aliquam
                        eget orci arcu quis accumsan massa amet. Ultricies vel
                        quis blandit curabitur cursus tellus et in augue. Morbi
                        enim volutpat enim est tincidunt. Fusce aliquet
                        consectetur nisl morbi sit convallis. Nunc eget
                        facilisis facilisis lacus.
                      </div>
                      <div className="mt-2 text-gray-950 font-medium text-lg max-mobile:text-base">
                        Ac massa elementum leo egestas lectus. Commodo hendrerit
                        potenti pulvinar gravida nunc. Condimentum neque a orci
                        eget ridiculus fauciat posuere locus. Cras pellentesque
                        sed ut mi eget pharetra congue risus. Integer aliquam
                        eget orci arcu quis accumsan massa amet. Ultricies vel
                        quis blandit curabitur cursus tellus et in augue. Morbi
                        enim volutpat enim est tincidunt. Fusce aliquet
                        consectetur nisl morbi sit convallis. Nunc eget
                        facilisis facilisis lacus.
                      </div>
                    </div>
                  </CardContestContent>
                </CardContest>
              </BlurFade>
            </section>
          </div>
        </div>
      </div>
    )
  );
}
