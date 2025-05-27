"use client";
import Image from "next/image";
import { CommonTag } from "@/components/common/CommonTag";
import { CommonCard } from "@/components/common/CommonCard";
import { Banknote, Facebook, Linkedin, MapPin, Share2 } from "lucide-react";
import { RelatedInfo } from "@/components/new/RelatedInfo";
import { LandingFooter } from "@/components/new/NewsFooter";
import { useParams } from "next/navigation";
import { ReqGetNewsById, ReqGetRamdomNews } from "@/requests/news";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { get } from "lodash";
import { useEffect } from "react";
import moment from "moment";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { ROUTE } from "@/contants/router";
import Share from "@/components/common/Share";
export default function Page() {
  const router = useCustomRouter();
  const [success] = useSnackbarStore((state) => [state.success]);

  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      return await ReqGetNewsById(id as string);
    },
  });

  const { data: randomNews, isLoading: isLoadingRandomNews } = useQuery({
    queryKey: ["news/random"],
    queryFn: async () => {
      try {
        return await ReqGetRamdomNews("hiring");
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.HIRING}/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full container mx-auto grid grid-cols-3 gap-12 pt-[28px] pb-[64px]">
      <div className="w-full flex flex-col gap-8 col-span-2">
        <div className="w-full mt-16 flex flex-col items-center justify-center gap-4 ">
          <Image
            alt="Demo image"
            src={data?.data.thumbnail || "/image/landing/demo1.png"}
            width={800}
            height={360}
            className="w-full h-[360px] object-cover rounded-2xl"
          />
          <div className="flex items-center justify-between w-full md:flex-row flex-col gap-2">
            <div className="flex items-start justify-center gap-2 ">
              {data?.data.tags &&
                data.data.tags
                  .split(",")
                  .map((tag, index) => (
                    <CommonTag key={index}>{tag.trim()}</CommonTag>
                  ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-BodySm text-gray-70  inline-flex items-center gap-2">
                <Share
                  url={`${process.env.NEXT_PUBLIC_BASE_URL}/tuyen-dung/${data?.data.id}`}
                  title={data?.data.title}
                  description={
                    data?.data.content
                      ?.replace(/<[^>]*>?/gm, "")
                      .substring(0, 200) || ""
                  }
                  hashtags={data?.data.tags?.split(",") || []}
                  image={data?.data.thumbnail || ""}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <div className="flex items-center text-SubheadMd text-gray-95 gap-2">
              <Banknote className="text-gray-70" size={16} />
              <div>
                {data && data.data.minSalary && data.data.maxSalary
                  ? `${data?.data.minSalary} - ${data?.data.maxSalary}`
                  : "Lương thỏa thuận"}
              </div>
            </div>
            <div className="flex items-start text-BodyMd text-gray-95 gap-2">
              <MapPin className="text-gray-70 mt-1" size={16} />
              <div>{(data && data.data.location) || "Không xác định"}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-HeadingMd text-gray-95">
              {data && data.data.title}
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-BodySm text-gray-70">
                {data && moment(data.data.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="text-BodySm text-gray-70">Đăng tải bởi:</div>
                <div className="text-SubheadSm text-gray-95">Tekmonk</div>
              </div>
            </div>
            <div className="text-BodyMd text-gray-95  w-full">
              <div
                dangerouslySetInnerHTML={{
                  __html: (data && data.data.content) || "",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-[1px] bg-gray-20"></div>
        </div>
        {/* <RelatedInfo
          type="hiring"
          data={get(randomNews, "data", [])}
          title="TIN TUYỂN DỤNG MỚI"
        /> */}
      </div>
      <div className="w-full flex flex-col gap-8 col-span-1 mt-16">
        <div className="text-HeadingSm text-[#320130]">
          Tin tức tuyển dụng khác
        </div>
        {randomNews &&
          randomNews.data
            .filter((item) => item.type === "hiring")
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
