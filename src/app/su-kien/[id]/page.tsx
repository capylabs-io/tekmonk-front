"use client";
import Image from "next/image";
import { CommonTag } from "@/components/common/CommonTag";
import { CommonCard } from "@/components/common/CommonCard";
import { Clock8, Facebook, Linkedin, MapPin, Share2 } from "lucide-react";
import { RelatedInfo } from "@/components/new/RelatedInfo";
import { LandingFooter } from "@/components/new/NewsFooter";
import { CalendarCard } from "@/components/event/CalendarCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ReqGetNewsById, ReqGetRamdomNews } from "@/requests/news";
import Loading from "@/app/loading";
import { get } from "lodash";
import moment from "moment";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useSnackbarStore } from "@/store/SnackbarStore";
export default function Page() {
  const router = useCustomRouter();
  const { id } = useParams();
  const [success] = useSnackbarStore((state) => [state.success]);

  const { data: news, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const res = await ReqGetNewsById(id.toString());
      return res.data;
    },
  });

  const { data: randomNews } = useQuery({
    queryKey: ["news/random"],
    queryFn: async () => {
      try {
        return await ReqGetRamdomNews("event");
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const handleShare = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/su-kien/${id}`;
    window.navigator.clipboard.writeText(url);
    success("Sự kiện ", "Đã copy link sự kiện");
  };
  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.EVENTS}/${id}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full container mx-auto grid grid-cols-3 gap-12 pt-[28px] pb-[64px]">
      <div className="w-full flex flex-col gap-8 col-span-2">
        <div className="w-full mt-16 flex flex-col items-center justify-center gap-4 ">
          <div className="w-full h-[360px] rounded-2xl relative">
            <Image
              alt="Demo image"
              src={news?.thumbnail || "/image/landing/demo1.png"}
              width={800}
              height={360}
              className="w-full h-[360px] object-cover rounded-2xl"
            />
            <CalendarCard
              day="03"
              month="12"
              week="Chủ nhật"
              className="absolute right-2 top-2"
            />
          </div>
          <div className="flex items-center justify-between w-full md:flex-row flex-col gap-2">
            <div className="flex items-start justify-center gap-2 ">
              {news?.tags &&
                news?.tags
                  ?.split(",")
                  .map((tag: string, index: number) => (
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
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <div className="flex items-center text-SubheadMd text-gray-95 gap-2">
              <Clock8 className="text-gray-70" size={16} />
              <div>{moment(news?.startTime).format("HH:mm A")}</div>
            </div>
            <div className="flex items-start text-BodyMd text-gray-95 gap-2">
              <MapPin className="text-gray-70 mt-1" size={16} />
              <div>{news?.location || "Không xác định"}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-HeadingMd text-gray-95">{news?.title}</div>
            <div className="flex items-center justify-between w-full">
              <div className="text-BodySm text-gray-70">
                {moment(news?.startTime).format("DD/MM/YYYY")}
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="text-BodySm text-gray-70">Đăng tải bởi:</div>
                <div className="text-SubheadSm text-gray-95">Tekmonk</div>
              </div>
            </div>
            <div className="text-BodyMd text-gray-95 w-full">
              <div
                dangerouslySetInnerHTML={{
                  __html: (news && news.content) || "",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-[1px] bg-gray-20"></div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 col-span-1 mt-16">
        {randomNews &&
          randomNews.data
            .filter((item) => item.type === "event")
            .map((newsItem) => (
              <div
                key={newsItem.id}
                className="h-[80px] w-full flex items-start justify-center gap-4"
                onClick={() => handleRedirect(newsItem.id)}
              >
                <Image
                  src={newsItem.thumbnail ? newsItem.thumbnail : ""}
                  alt=""
                  width={108}
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
                        .concat(
                          get(newsItem, "title", "").length > 50 ? "..." : ""
                        ),
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
