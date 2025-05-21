"use client";
import Image from "next/image";
import { CommonTag } from "@/components/common/CommonTag";
import { CommonCard } from "@/components/common/CommonCard";
import { Facebook, Linkedin, Share2 } from "lucide-react";
import { RelatedInfo } from "@/components/new/RelatedInfo";
import { LandingFooter } from "@/components/new/NewsFooter";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ReqGetAllNews, ReqGetNewsById, ReqGetRamdomNews } from "@/requests/news";
import Loading from "@/app/loading";
import { get } from "lodash";
import moment from "moment";
import qs from "qs";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useSnackbarStore } from "@/store/SnackbarStore";
export default function Page() {
  //get id from url
  const router = useCustomRouter();
  const [success] = useSnackbarStore((state) => [state.success]);

  const handleRedirect = (id: number) => {

    router.push(`${ROUTE.NEWS}/${id}`);
  };

  const { id } = useParams();
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["news", id],
    queryFn: async () => {
      try {
        const res = await ReqGetNewsById(id as string);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const { data: randomNews } = useQuery({
    queryKey: ["news/random"],
    queryFn: async () => {
      try {
        return await ReqGetRamdomNews("news");
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const handleShare = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tin-tuc/${id}`;
    window.navigator.clipboard.writeText(url);
    success("Tin tức ", "Đã copy link tin tức");
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full container mx-auto grid grid-cols-3 gap-12 pt-[28px] pb-[64px]">
      <div className="w-full flex flex-col gap-8 col-span-2 mt-16">
        <div className="w-full flex flex-col items-center justify-center gap-4 ">
          <Image
            alt="Demo image"
            src={data?.thumbnail || "/image/landing/demo1.png"}
            width={800}
            height={360}
            className="w-full h-[360px] object-cover rounded-2xl"
          />
          <div className="flex items-center justify-between w-full md:flex-row flex-col gap-2">
            <div className="flex items-start justify-center gap-2 ">
              {data?.tags &&
                data.tags
                  .split(",")
                  .map((tag, index) => (
                    <CommonTag key={index}>{tag.trim()}</CommonTag>
                  ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-BodySm text-gray-70  inline-flex items-center gap-2">
                Chia sẻ bài đăng:
                <Share2
                  onClick={handleShare}
                  size={18}
                  className="text-gray-95 hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-HeadingMd text-gray-95">
              {data && data.title}
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-BodySm text-gray-70">
                {data && moment(data.startTime).format("DD/MM/YYYY HH:mm")}
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="text-BodySm text-gray-70">Đăng tải bởi:</div>
                <div className="text-SubheadSm text-gray-95">{'TekMonk'}</div>
              </div>
            </div>
            <div
              className="text-BodyMd text-gray-95 w-full"
              dangerouslySetInnerHTML={{
                __html: (data && data.content) || "",
              }}
            ></div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-[1px] bg-gray-20"></div>
        </div>
        {/* <RelatedInfo
          type="news"
          data={get(randomNews, "data", [])}
          title="TIN TỨC LIÊN QUAN"
        /> */}
      </div>
      <div className="flex flex-col gap-4 col-span-1 mt-16">
        {randomNews && randomNews.data.map((newsItem) => (
          <div
            key={newsItem.id}
            className="h-[80px] w-full flex items-start justify-center gap-4"
            onClick={() => handleRedirect(newsItem.id)}
          >
            <Image
              src={newsItem.thumbnail ? newsItem.thumbnail : ""}
              alt=""
              width= {108}
              height={80}
              className="h-full object-cover rounded-2xl"
            />
            <div className="flex-1 flex flex-col gap-2">
              <time className="text-BodySm text-gray-70">
                {moment(newsItem.startTime).format("DD/MM/YYYY HH:mm")}
              </time>
              <div
                className="text-SubheadMd text-gray-95 max-h-16 overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: (get(newsItem, "title", "") || "")
                    .replace(/<[^>]+>/g, "")
                    .trim()
                    .slice(0, 50)
                    .concat(get(newsItem, "title", "").length > 50 ? "..." : ""),
                }}
              ></div>
            </div>
          </div>
        ))}
        <Image
          src="/image/home/banner-layout.png"
          alt="Default"
          width={220}
          height={350}
          className="w-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
