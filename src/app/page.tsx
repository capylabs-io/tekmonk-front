"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import { Navbar } from "@/components/common/Navbar";
import { ArrowRight, ChevronRight, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { LAYERS } from "@/contants/layer";
import { BannerCard } from "@/components/new/BannerCard";
import { LandingFooter } from "@/components/new/NewsFooter";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import Link from "next/link";
import { Button } from "@/components/common/button/Button";
import GridPattern from "@/components/ui/grid-pattern";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimateIn } from "@/components/landing/ScrollAnimationContent";

type TCourseSection = {
  title: string;
  description: string;
  imageSrc?: string;
  imageContent?: React.ReactNode;
  iconSrc: string;
  connectSrc: string;
  state?: boolean;
};

const listReview = [
  "/image/landing/group-image-1.png",
  "/image/landing/group-image-2.png",
  "/image/landing/group-image-3.png",
  "/image/landing/group-image-4.png",
  "/image/landing/group-image-5.png",
  "/image/landing/group-image-6.png",
  "/image/landing/group-image-7.png",
];

const accordionData = [
  {
    title: "Sáng tạo",
    content:
      "Tại TekMonk, chúng tôi khuyến khích mọi người vượt ra ngoài vùng an toàn của mình để thử nghiệm những ý tưởng mới, dù là khác biệt và chưa từng có tiền lệ. Chúng tôi không ngừng cải tiến sản phẩm và dịch vụ để mang lại giá trị tốt nhất cho học viên, đối tác, nhà đầu tư và cộng đồng.",
  },
  {
    title: "Dũng cảm",
    content: "Content for Dũng cảm section...",
  },
  {
    title: "Năng động",
    content: "Content for Năng động section...",
  },
  {
    title: "Tư duy",
    content: "Content for Tư duy section...",
  },
];

const CoreValueComponent = () => {
  const listCoreValue = [
    {
      title: "Sáng tạo",
      description: "Thúc đẩy tư duy đổi mới không ngừng, khuyến khích học viên và giáo viên ứng dụng công nghệ để tạo ra những giải pháp đột phá.",
      imageSrc: "/image/landing/core-value-1.svg",
    },
    {
      title: "Dũng cảm",
      description: "Nuôi dưỡng tinh thần dũng cảm – dám nghĩ lớn, dám làm khác, không sợ thất bại để dẫn dắt hành trình đổi mới giáo dục công nghệ.",
      imageSrc: "/image/landing/core-value-2.svg",
    },
    {
      title: "Năng động",
      description: "Chủ động thích nghi, linh hoạt thay đổi để tạo nên môi trường học tập hiện đại, sáng tạo và đầy năng lượng.",
      imageSrc: "/image/landing/core-value-3.svg",
    },
    {
      title: "Tư duy",
      description: "Đề cao tư duy phản biện, học hỏi suốt đời và khả năng kết nối kiến thức với thực tiễn, nhằm trang bị cho học viên nền tảng vững chắc.",
      imageSrc: "/image/landing/core-value-4.svg",
    },
  ];
  return (
    <ScrollAnimateIn
      animation="fade-up"
      className="w-full container mx-auto h-max flex flex-col items-center justify-center p-[80px]"
      threshold={0.2}
    >
      <ScrollAnimateIn
        animation="fade-up"
        className="flex flex-col items-center gap-2"
        delay={0.1}
      >
        <div className="text-DisplayXs text-[#320130]">Giá trị cốt lõi</div>
      </ScrollAnimateIn>
      <ScrollAnimateIn
        animation="stagger-fade"
        className="mt-12 flex items-center gap-8"
        threshold={0.2}
      >
        {
          listCoreValue.map((item, index) => (
            <div
              key={item.title + (index + 1)}
              className="w-[296px] h-[232px] p-6 border-gray-30 border rounded-2xl flex flex-col items-center justify-center gap-2"
            >
              <Image
                src={item.imageSrc}
                alt=""
                width={40}
                height={40}
              />
              <div className="text-HeadingSm text-gray-95">{item.title}</div>
              <div className="text-BodyMd text-gray-60">{item.description}</div>
            </div>
          ))
        }
      </ScrollAnimateIn>
    </ScrollAnimateIn>
  );
};

const CourseSection = ({
  imageSrc,
  imageContent,
  iconSrc,
  connectSrc,
  title,
  description,
  state = true,
}: TCourseSection) => {
  return (
    <ScrollAnimateIn
      animation="fade-up"
      className="w-full container mx-auto min-h-[512px] grid grid-cols-1 lg:grid-cols-2 items-center relative"
      threshold={0.2}
    >
      {/* Text Section - Always First on Mobile */}
      <div
        className={cn(
          "flex flex-col gap-4 mx-auto z-20 order-1",
          state ? "lg:order-1" : "lg:order-2"
        )}
      >

        <Image
          src={iconSrc}
          alt=""
          width={64}
          height={64}
          className={cn(
            "object-cover z-20 rounded-[100%]"
          )}
        />

        <ScrollAnimateIn
          animation="fade-up"
          delay={0.4}
          className="text-HeadingMd text-gray-95"
        >
          {title}
        </ScrollAnimateIn>

        <ScrollAnimateIn
          animation="fade-up"
          delay={0.5}

          className="text-BodyLg text-gray-60"
        >
          {description}
        </ScrollAnimateIn>
      </div>

      {/* Image Section - Ordered Dynamically */}
      <ScrollAnimateIn
        animation={state ? "slide-left" : "slide-right"}
        delay={0.3}
        className={cn(
          "mx-auto z-20 order-2 ",
          state ? "lg:order-2" : "lg:order-1"
        )}
      >
        {
          imageSrc && (
            <Image
              src={imageSrc}
              alt=""
              width={515}
              height={320}
              className="2xl:scale-110 hover:scale-125 transition-all duration-300 hover:cursor-pointer"
            />
          )
        }
        {imageContent}
      </ScrollAnimateIn>

      {/* Background Connection Image (Optional) */}
      {connectSrc && (
        <ScrollAnimateIn
          animation="fade-up"
          delay={0.8}
          className="absolute  left-[30%] top-[70%] transform -translate-x-1/2 z-0 lg:block hidden"
        >
          <Image
            alt=""
            src={connectSrc}
            width={527}
            height={364}
          />
        </ScrollAnimateIn>
      )}
    </ScrollAnimateIn>
  );
};

const AboutCourseComponent = () => {
  return (
    <ScrollAnimateIn
      animation="fade-up"
      className="w-full container mx-auto min-h-[2236px] flex flex-col items-center justify-start"
      threshold={0.1}

    >
      <ScrollAnimateIn
        animation="fade-up"
        className="text-DisplayXs text-[#320130] text-center"
        delay={0.1}

      >
        Sự đặc biệt của khóa học
      </ScrollAnimateIn>
      <div className="flex-1 w-full flex flex-col items-center justify-start lg:gap-20 gap-14">
        <CourseSection
          imageContent={
            <div className="relative h-[400px] w-[400px]">
              <Image
                src="/image/landing/about/reward-1.png"
                alt=""
                width={218}
                height={300}
                className="z-20 absolute right-2 top-40 -translate-y-1/2 hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[30px]"
              />
              <Image
                src="/image/landing/about/vector.png"
                alt=""
                width={400}
                height={400}
                className="-z-[1] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
              <Image
                src="/image/landing/about/reward.png"
                alt=""
                width={218}
                height={300}
                className="z-10 absolute left-2 top-52 -translate-y-1/2 hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[-30px]"
              />
            </div>
          }
          iconSrc="/image/landing/course1.svg"
          connectSrc="/image/landing/connect1.png"
          title="Game hoá quá trình học tập"
          description="Khóa học được thiết kế theo mô hình game hóa, biến mỗi bài học thành một hành trình khám phá hấp dẫn. Học viên sẽ “lên cấp”, mở khóa thử thách, tích lũy điểm thưởng và nhận phần quà khi hoàn thành nhiệm vụ."
        />
        <CourseSection
          imageContent={
            <div className="relative h-[400px] w-[400px]">
              <Image
                src="/image/landing/about/reward-3.png"
                alt=""
                width={218}
                height={300}
                className="z-10 absolute right-[-50px] bottom-[60px] hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[30px]"
              />
              <Image
                src="/image/landing/about/vector-2.png"
                alt=""
                width={400}
                height={400}
                className="-z-[1] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
              <Image
                src="/image/landing/about/reward-2.png"
                alt=""
                width={218}
                height={300}
                className="z-10 absolute left-[-50px] bottom-[60px] hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[-30px]"
              />
              <Image
                src="/image/landing/about/reward-4.png"
                alt=""
                width={218}
                height={300}
                className="z-20 absolute left-1/2 -translate-x-1/2 top-[140px] -translate-y-1/2 hover:cursor-pointer transition-all duration-300 hover:-translate-y-[30px]"
              />
            </div>
          }
          iconSrc="/image/landing/course2.svg"
          connectSrc="/image/landing/connect2.png"
          title="Bài giảng được thiết kế trực quan"
          description="Bài giảng được thiết kế trực quan, sinh động, sử dụng đồ họa, video minh họa và mô phỏng tương tác để biến những khái niệm trừu tượng thành trải nghiệm dễ hiểu và dễ nhớ. Học viên không chỉ nghe và đọc, mà còn được “nhìn thấy” và “trải nghiệm” kiến thức"
          state={false}
        />
        <CourseSection
          imageContent={
            <div className="relative h-[400px] w-[400px]">
              <Image
                src="/image/landing/about/post-2.png"
                alt=""
                width={218}
                height={300}
                className="z-20 absolute right-2 top-52 -translate-y-1/2 hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[30px]"
              />
              <Image
                src="/image/landing/about/vector-1.png"
                alt=""
                width={400}
                height={400}
                className="-z-[1] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
              <Image
                src="/image/landing/about/post-1.png"
                alt=""
                width={218}
                height={300}
                className="z-10 absolute left-2 top-40 -translate-y-1/2 hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:translate-x-[-30px]"
              />
            </div>
          }
          // imageSrc="/image/landing/course-road-3.png"
          iconSrc="/image/landing/course3.svg"
          connectSrc="/image/landing/connect3.png"
          title="Thế giới quan độc đáo của từng học viên"
          description="Khóa học được thiết kế để khuyến khích tư duy độc lập, thử nghiệm và sáng tạo, giúp học viên khám phá những cách tiếp cận mới mẻ, từ đó phát triển kỹ năng công nghệ mạnh mẽ và tư duy đổi mới không giới hạn."
        />
        <CourseSection
          imageContent={
            <div className="relative h-[400px] w-[400px]">
              <Image
                src="/image/landing/about/vector-3.png"
                alt=""
                width={400}
                height={400}
                className="-z-[1] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              />
              <Image
                src="/image/landing/about/Stat.png"
                alt=""
                width={330}
                height={330}
                className="z-10 absolute left-[53%] -translate-x-1/2 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </div>
          }

          iconSrc="/image/landing/course4.svg"
          connectSrc=""
          title="Đồng hành cùng con trong quá trình học"
          description="Chúng tôi luôn đồng hành cùng con trong từng bước học, hỗ trợ và khích lệ để con phát huy tối đa khả năng của mình. Mỗi bài học là một cơ hội để con học hỏi, sáng tạo và vượt qua thử thách, với sự hướng dẫn tận tâm từ đội ngũ giảng viên."
          state={false}
        />
      </div>
    </ScrollAnimateIn>
  );
};

const ImageIntroduce = () => {
  return (
    <ScrollAnimateIn
      animation="fade-up"
      className="w-full min-h-[912px] flex flex-col items-center justify-center gap-12 bg-[#F5F4F5]"
      threshold={0.1}

    >
      <ScrollAnimateIn
        animation="fade-up"
        className="text-DisplayXs text-[#320130] max-w-[579px] text-center"
        delay={0.1}
      >
        Vì một thế hệ trẻ năng động với công nghệ
      </ScrollAnimateIn>
      <ScrollAnimateIn
        animation="fade-up"
        className="w-full h-[512px] flex flex-col"
        delay={0.3}

      >
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
          <Marquee pauseOnHover className="[--duration:50s]">
            {listReview.map((review, index) => (
              <Image
                key={index + review}
                alt=""
                src={review}
                width={400}
                height={248}
                className="rounded-[8px] object-cover mx-4 shadow-md"
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:70s]">
            {listReview.map((review, index) => (
              <Image
                key={index + review}
                alt=""
                src={review}
                width={400}
                height={248}
                className="rounded-[8px] object-cover mx-4 shadow-md"
              />
            ))}
          </Marquee>
        </div>
      </ScrollAnimateIn>
    </ScrollAnimateIn>
  );
};

const ReviewFromCommunity = () => {
  return (
    <ScrollAnimateIn
      animation="fade-up"
      className="w-full min-h-[600px] flex flex-col items-center justify-center lg:gap-24 gap-10 relative"
      threshold={0.1}

    >
      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(200%_circle_at_center,white,transparent)]",
          `absolute top-0 h-full z-[${LAYERS.BACKGROUND_1}]`
        )}
        width={40}
        height={40}
        strokeWidth={0.5}
        strokeColor="#F5D0EF"
        lineSpacing={3}
      />
      <ScrollAnimateIn
        animation="fade-up"
        className="text-DisplayXs text-[#320130] text-center"
        delay={0.1}
      >
        Lời khen ngợi từ cộng đồng
      </ScrollAnimateIn>
      <ScrollAnimateIn
        animation="fade-up"
        className="w-full z-0 bg-white"
        delay={0.3}

      >
        <Marquee pauseOnHover className="[--duration:50s] w-full">
          {listReview.map((review, index) => (
            <div
              key={index + review}
              className="lg:w-[560px] w-[320px] h-[256px] border-[2px] border-gray-30 rounded-3xl flex flex-col "
              style={{
                boxShadow: "0px 8px 0px #DDD0DD",
              }}
            >
              <div className="flex items-center gap-4 p-4">
                <Image
                  alt=""
                  src="/image/profile/avatar-x2.png"
                  width={48}
                  height={48}
                  className="rounded-[100%]"
                />
                <div className="flex flex-col gap-2">
                  <div className="text-lg leading-[24px] font-medium">
                    Chị Minh Tâm
                  </div>
                  <div className="text-sm leading-[20px] font-normal text-gray-50">
                    Mẹ cháu Gia Khang (10 tuổi)
                  </div>
                </div>
              </div>
              <div className="lg:p-4 px-4 text-gray-95 text-BodyMd text-ellipsis h-[120px]">
                Tôi rất tin tưởng khi cho con học tại Tekmonk. Mặc dù sợ rằng con
                sẽ chơi game và dùng máy tính vào mục đích ngoài học tập nhưng con
                rất tự giác. Tôi thấy con thực sự đam mê với môn học này. Gia đình
                không ép buộc con phải học ngành nào mà muốn tự con trải nghiệm.
                Những gì học được ở Tekmonk là cơ hội để định hướng tương lai của
                con.
              </div>
            </div>
          ))}
        </Marquee>
      </ScrollAnimateIn>
    </ScrollAnimateIn>
  );
};

// const BannerBottom = () => {
//   return (
//     <div className="overflow-hidden w-full h-[560px] relative">
//       <div className="bg-[url('/image/contest/Frame-43.png')] h-full bg-cover bg-no-repeat flex flex-col items-center justify-center gap-9 overflow-hidden ">
//         <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 mix-blend-multiply" />
//         <div className="text-gray-10 sm:text-DisplayMd text-DisplayXs text-center max-w-[500px] z-10 p-2">
//           Phát triển cùng chúng tôi
//         </div>
//         <div className="flex flex-col items-center gap-7 z-10">
//           <CommonButton
//             className="text-white border-[2px] w-[203px] h-[52px]"
//             childrenClassName="flex items-center justify-center gap-2"
//           >
//             <Link href={ROUTE.HOME}>Khám phá ngay</Link>
//             <ChevronRight size={24} color="#ffffff" className="mt-1" />
//           </CommonButton>
//         </div>
//       </div>
//       {/* Show icon, character here */}
//     </div>
//   );
// };

export default function Page() {
  const router = useCustomRouter();
  const handleRedirectMainPage = () => {
    router.push(`${ROUTE.NEWS_FEED}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] mt-16 flex flex-col items-center justify-center">
        <div className="w-full flex">
          <ScrollAnimateIn
            animation="slide-right"
            className="w-1/2 bg-primary-05 relative overflow-hidden flex flex-col items-center justify-center"
            delay={0.2}
          >
            <Image
              width={325}
              height={319}
              src="/image/landing/introduction-feature-2.png"
              alt=""
              className="object-cover absolute top-0 left-0"
            />
            <Image
              width={325}
              height={319}
              src="/image/landing/introduction-feature-1.png"
              alt=""
              className="object-cover absolute bottom-0 right-0"
            />
            <ScrollAnimateIn
              animation="fade-up"
              className="z-20 w-[80%]"
              delay={0.4}
            >
              <div className="lg:text-DisplayXl md:text-DisplayLg sm:text-DisplayMd text-DisplayXs p-2">
                Vui chơi, sáng tạo
                & kết nối cộng đồng
              </div>
              <div className="!font-normal md:text-HeadingSm text-HeadingXs text-gray-70 mt-4">
                Được tin dùng bởi hơn 1 triệu phụ huynh & học sinh tại Việt Nam
              </div>
              <ScrollAnimateIn
                animation="fade-up"
                delay={0.6}
              >
                <Button
                  className="text-white border-[2px] !w-max h-[52px] mt-8"
                  onClick={handleRedirectMainPage}
                >
                  <div className="flex items-center justify-center gap-2">
                    Khám phá ngay <ArrowRight size={24} color="#ffffff" />
                  </div>
                </Button>
              </ScrollAnimateIn>
            </ScrollAnimateIn>
          </ScrollAnimateIn>
          <ScrollAnimateIn
            animation="slide-left"
            className="w-1/2 h-[615px] bg-[url('/image/landing/introduction-image.png')] bg-cover bg-no-repeat bg-center"
            delay={0.2}
          >
            <div className="w-full h-full" />
          </ScrollAnimateIn>
        </div>
        <CoreValueComponent />
        <AboutCourseComponent />
        <ImageIntroduce />
        <ReviewFromCommunity />
        <LandingFooter />
      </div>
    </>
  );
}
