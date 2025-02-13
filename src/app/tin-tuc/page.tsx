"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { TNews } from "@/types/common-types";
import { CommonCard } from "@/components/common/CommonCard";
import { CommonTag } from "@/components/common/CommonTag";
import { Input } from "@/components/common/Input";

//fake data for news
const newsData: TNews[] = [
  {
    id: 1,
    title: "News Title 1",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
  },
  {
    id: 2,
    title: "News Title 2",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
  },
  {
    id: 3,
    title: "News Title 3",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
  },
  {
    id: 4,
    title: "News Title 4",
    content:
      "Học online đang trở thành xu hướng tất yếu trong thời đại số, đặc biệt là với ngành Marketing. Trong bài viết này, TekMonk sẽ giới thiệu 7 khóa học Marketing",
    thumbnail: "/image/contest/banner.png",
    startTime: "2023-10-01",
    endTime: "2023-10-01",
    type: "news",
    tags: "Tin tức, Nổi bật",
    isActived: true,
    priority: true,
  },
];

const ShowCarouselItemsComponent = ({ data }: { data: TNews[] }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();

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
                <div className="w-full h-full relative flex flex-col items-center justify-center gap-4">
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

              <div className="text-HeadingSm text-gray-95">
                {newsItem.title}
              </div>

              <div className="text-BodyMd text-gray-95">{newsItem.content}</div>

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
            <div className="text-SubheadMd text-gray-95">{newsItem.title}</div>
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
      <Navbar />
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
