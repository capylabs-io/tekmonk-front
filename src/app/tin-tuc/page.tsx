"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TNews } from "@/types/common-types";
import { CommonCard } from "@/components/common/CommonCard";
import { CommonTag } from "@/components/common/CommonTag";
import { Input } from "@/components/common/Input";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

//fake data for news
export const newsData: TNews[] = [
  {
    id: 1,
    title:
      "Ngày hội phát triển ứng dụng công nghệ cao 2025 Ngày hội phát triển ứng dụng công nghệ cao 2025 Ngày hội phát triển ứng dụng công nghệ cao 2025 Ngày hội phát triển ứng dụng công nghệ cao 2025 Ngày hội phát triển ứng dụng công nghệ cao 2025",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
    salary: "20 tỷ USD",
  },
  {
    id: 2,
    title: "Ngày hội phát triển ứng dụng công nghệ cao 2025",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
    salary: "25 tỷ USD",
  },
  {
    id: 3,
    title: "Ngày hội phát triển ứng dụng công nghệ cao 2025",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
    salary: "30 tỷ USD",
  },
  {
    id: 4,
    title: "Ngày hội phát triển ứng dụng công nghệ cao 2025",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
    salary: "22 tỷ USD",
  },
];

const ShowCarouselItemsComponent = ({ data }: { data: TNews[] }) => {
  const router = useCustomRouter();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();

  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.NEWS}/${id}`);
  };

  // //use effect
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCarouselIndex(api.selectedScrollSnap());
    };

    setCarouselIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <>
      <Carousel
        className="w-full min-h-[400px] "
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
        // opts={{
        //   startIndex: carouselIndex,
        // }}
        onSelect={() => setCarouselIndex(api?.selectedScrollSnap() ?? 0)}
      >
        <CarouselContent>
          {data &&
            data.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  className="w-full h-full relative flex flex-col items-center justify-center gap-4 cursor-pointer"
                  onClick={() => handleRedirect(item.id)}
                >
                  <Image
                    alt=""
                    src={item.thumbnail}
                    width={100}
                    height={360}
                    layout="responsive"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="w-full flex flex-col items-start justify-center gap-4">
                    <div className="flex items-center justify-center gap-2">
                      {item.tags.split(",").map((tag, indexTag) => (
                        <CommonTag key={indexTag}>{tag.trim()}</CommonTag>
                      ))}
                    </div>
                    <div className="text-[#320130] text-HeadingSm">
                      {item.title}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      <div
        className="flex justify-center gap-2 pt-4"
        role="tablist"
        aria-label="Article slides"
      >
        {data.map((article, index) => (
          <button
            key={article.id}
            className={`h-2 min-w-2 rounded-full p-0 transition-all hover:scale-125 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              index === carouselIndex
                ? "bg-primary-60"
                : "bg-primary-30 hover:cursor-pointer"
            }`}
            onClick={() => {
              setCarouselIndex(index);
              api?.scrollTo(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === carouselIndex}
            role="tab"
          />
        ))}
      </div>
    </>
  );
};

const FeaturedNewsComponent = () => {
  return (
    <div className="w-full mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="text-HeadingMd text-[#320130]">TIN TỨC NỔI BẬT</div>
        <div className="flex gap-1">
          <CommonCard
            size="small"
            isActive={true}
            className="h-6 rounded-[4px] px-2 py-1 flex items-center !text-SubheadXs"
          >
            Tất cả
          </CommonCard>
          <CommonCard
            size="small"
            className="h-6 rounded-[4px] px-2 py-1 flex items-center !text-SubheadXs"
          >
            Tin tức
          </CommonCard>
          <CommonCard
            size="small"
            className="h-6 rounded-[4px] px-2 py-1 flex items-center !text-SubheadXs"
          >
            Hướng dẫn
          </CommonCard>
          <CommonCard
            size="small"
            className="h-6 rounded-[4px] px-2 py-1 flex items-center !text-SubheadXs"
          >
            Tutorial
          </CommonCard>
          <CommonCard
            size="small"
            className="h-6 rounded-[4px] px-2 py-1 flex items-center !text-SubheadXs"
          >
            Khóa học
          </CommonCard>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {newsData.map((newsItem) => (
          <CommonCard
            key={newsItem.id}
            size="medium"
            className="h-[220px] w-full flex items-center justify-center"
          >
            <div className="flex-1 flex flex-col gap-2 p-6">
              <div className="flex gap-2">
                {newsItem.tags.split(",").map((tag, index) => (
                  <CommonTag key={index}>{tag.trim()}</CommonTag>
                ))}
              </div>

              <div className="text-HeadingSm text-gray-95 max-h-16 w-full overflow-hidden">
                {newsItem.title}
              </div>

              <div className="text-BodyMd text-gray-95 max-h-12 overflow-hidden">
                {newsItem.content}
              </div>

              <time className="text-BodySm text-gray-70">
                {newsItem.startTime}
              </time>
            </div>

            <Image
              src={newsItem.thumbnail}
              alt=""
              width={220}
              height={220}
              className="h-[220px] object-cover rounded-r-2xl"
            />
          </CommonCard>
        ))}
      </div>
      <CommonCard
        size="medium"
        className="w-[122px] h-12 flex items-center justify-center text-SubheadMd text-primary-95 mx-auto mt-2"
      >
        Xem thêm
      </CommonCard>
    </div>
  );
};

const SuggestComponent = ({ data }: { data: TNews[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((newsItem) => (
        <CommonCard
          key={newsItem.id}
          size="medium"
          className="h-[124px] w-full flex items-center justify-center"
        >
          <Image
            src={newsItem.thumbnail}
            alt=""
            width={108}
            height={220}
            className="h-full object-cover rounded-l-2xl"
          />
          <div className="flex-1 flex flex-col gap-2 p-4">
            <time className="text-BodySm text-gray-70">
              {newsItem.startTime}
            </time>
            <div className="text-SubheadMd text-gray-95 max-h-16 overflow-hidden">
              {newsItem.title}
            </div>
          </div>
        </CommonCard>
      ))}
    </div>
  );
};
export default function News() {
  //use state
  const [randomCarouselItems, setRandomCarouselItems] =
    useState<TNews[]>(newsData);
  return (
    <>
      <div className="w-full min-h-[100vh] mt-16 grid grid-cols-3 gap-4 p-2">
        <div className="lg:col-span-2 col-span-3">
          <ShowCarouselItemsComponent data={randomCarouselItems} />
          <FeaturedNewsComponent />
        </div>
        <div className="col-span-1 flex-col gap-8 lg:flex hidden">
          <Input
            type="text"
            placeholder="Tìm kiếm article theo từ khoá"
            isSearch={true}
          />
          <SuggestComponent data={randomCarouselItems} />
          <Image
            src="/image/home/banner-layout.png"
            alt="Default"
            width={220}
            height={456}
            className="w-full object-cover"
          />
          <Image
            src="/image/home/banner-layout.png"
            alt="Default"
            width={220}
            height={456}
            className="w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
