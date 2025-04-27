"use client";
import Autoplay from "embla-carousel-autoplay";

import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "../common/router/CustomRouter";
import Image from "next/image";
import { CommonTag } from "../common/CommonTag";
import { ReqGetAllNews } from "@/requests/news";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const ShowSmallCarouselItems = () => {
  const router = useCustomRouter();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.NEWS}/${id}`);
  };

  const { data } = useQuery({
    queryKey: ["news-newsest"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: 1,
            pageSize: 4,
          },
          filters: {
            type: "news",
            status: "public",
          },
          sort: ["createdAt:desc"],
          populate: "*",
        });
        return await ReqGetAllNews(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  return (
    <>
      <Carousel
        className="w-full items-center flex justify-center h-[200px] overflow-hidden"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data &&
            data.data.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  className="w-full h-full relative flex flex-col items-center justify-center cursor-pointer group"
                  onClick={() => handleRedirect(item.id)}
                >
                  <Image
                    alt=""
                    src={item.thumbnail ? item.thumbnail : ""}
                    width={200}
                    height={360}
                    className="!w-full h-full max-h-[200px] object-cover rounded-2xl transition-opacity duration-300"
                  />
                  <div className="absolute w-full bottom-0 h-1/2 bg-black bg-opacity-50 rounded-b-2xl flex flex-col items-start justify-end p-6">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-BodySm font-semibold line-clamp-3 overflow-hidden">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};
