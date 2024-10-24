"use client";

import Tag from "@/components/contest/Tag";
import { Dock, DockIcon } from "@/components/ui/dock";
import { getOneContestSubmission } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import {
  ArrowLeft,
  Facebook,
  Instagram,
  Mail,
  Send,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { shareOnMobile } from "react-mobile-share";
import { useParams } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import { EmptySearch } from "@/components/common/EmptySearch";
import { ImageCustom } from "@/components/common/ImageCustom";
import { Button } from "@/components/common/Button";
import { useState, useEffect } from "react";
import { useTagStore } from "@/store/TagStore";
import { get } from "lodash";

const ContestDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [contestDetail, setContestDetail] = useState<ContestSubmission | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const setSelectedTag = useTagStore((state) => state.setSelectedTag);

  const fetchContestDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getOneContestSubmission(id as string);
      if (response && response.data) {
        setContestDetail(response.data);
      } else {
        setContestDetail(null);
      }
    } catch (error) {
      setContestDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchContestDetail();
  }, [id]);

  const handleClickTag = (tag: string) => {
    // Store the tag in Zustand store
    setSelectedTag(tag);
    // Navigate to the all contest entries page
    router.push("/tong-hop-bai-du-thi");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src={"/image/contest/Hourglass.gif"}
          alt="loading gif"
          width={64}
          height={64}
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </div>
    );
  }

  if (!contestDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <EmptySearch
          buttonText="Trở về"
          message="Không tìm thấy bài thi"
          onAction={() => router.push("/tong-hop-bai-du-thi")}
        />
      </div>
    );
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/tong-hop-bai-du-thi/${id}`;
  const shareTitle = contestDetail?.title || "Check out this contest entry!";
  const shareDescription =
    contestDetail?.description || "An amazing contest submission";
  const shareImage =
    contestDetail?.assets?.[selectedImageIndex]?.url ||
    `${process.env.NEXT_PUBLIC_BASE_URL}/image/contest/Saly-12.png`;

  return (
    <>
      <div className="max-w-[720px] mx-auto border-r border-l border-gray-200 bg-white h-full shadow-md">
        <div className="">
          <div className="h-12 mobile:h-16 flex items-center px-8">
            <ArrowLeft
              size={24}
              onClick={() => router.push("/tong-hop-bai-du-thi")}
              className="cursor-pointer"
            />
            <span className="text-grey-500 text-sm font-medium ml-2 select-none">
              Quay lại
            </span>
          </div>
          <div className="">
            <section className="">
              <header className="px-8 border-b border-grey-200 pb-4">
                <p className="mb-3">
                  <span className="text-SubheadSm !font-medium mr-2">
                    {get(contestDetail, "contest_entry.user.fullName", "")}
                  </span>
                  <span className="text-grey-500 text-sm">
                    Số báo danh:{" "}
                    {get(contestDetail, "contest_entry.candidateNumber", "")}
                  </span>
                </p>
                <h1 className="text-SubheadLg text-grey-700 uppercase">
                  {contestDetail.title}
                </h1>
                <div className="py-2">
                  {contestDetail.tags?.map((tag, index) => (
                    <Tag
                      key={index}
                      text={tag}
                      className="mr-2 cursor-pointer"
                      size="medium"
                      type="secondary"
                      onClick={() => handleClickTag(tag)}
                    />
                  ))}
                </div>
              </header>
              <div
                className="py-4 px-8 ql-viewer"
                dangerouslySetInnerHTML={{
                  __html: contestDetail.description || "",
                }}
              ></div>
              <div className="">
                {contestDetail.url && (
                  <p className="px-8">
                    <span className="text-grey-500 text-sm">
                      Link bài thi:{" "}
                    </span>
                    <a
                      className="text-blue-500 text-sm "
                      target="_blank"
                      href={contestDetail.url}
                    >
                      {contestDetail.url}
                    </a>
                  </p>
                )}
                {contestDetail.source && (
                  <p className="px-8">
                    <span className="text-grey-500 text-sm">
                      Tệp đính kèm:{" "}
                    </span>
                    <a
                      className="text-sm underline text-blue-500"
                      href={contestDetail?.source?.[0]?.url}
                      target="_blank"
                    >
                      {contestDetail.title}
                    </a>
                  </p>
                )}
              </div>
              <div className="w-full mx-auto pt-4 sm:px-8">
                <div className="hidden sm:block">
                  <AspectRatio ratio={16 / 9}>
                    {contestDetail.assets?.[selectedImageIndex]?.url && (
                      <div className="relative w-full h-full">
                        <ImageCustom
                          src={contestDetail.assets[selectedImageIndex].url}
                          alt={`Selected image for ${contestDetail.title}`}
                          className="rounded-md object-contain"
                          quality={80}
                          fill
                        />
                      </div>
                    )}
                  </AspectRatio>
                </div>
                <div className="mt-6 mb-4 sm:px-12 px-14">
                  <Carousel opts={{ align: "center" }} className="w-full">
                    <CarouselContent className="m-0">
                      {contestDetail.assets?.map((item, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-1 md:basis-1/2 lg:basis-1/3 select-none"
                        >
                          <div
                            className={`relative cursor-pointer rounded-md overflow-hidden ${
                              selectedImageIndex === index
                                ? "border-2 border-blue-500"
                                : ""
                            }`}
                            style={{ aspectRatio: "16 / 9" }}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <ImageCustom
                              src={item.url}
                              alt={`Contest entry image ${index + 1}`}
                              fill
                              className="object-contain"
                              quality={40}
                              sizes="(max-width: 640px) 25vw, 20vw"
                              loading="lazy"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </section>
          </div>
        </div>
        <hr />
        <div className="py-4">
          <Dock direction="middle" className="m-0 mx-auto px-3 hidden sm:flex">
            <DockIcon className="bg-black/10 dark:bg-white/10">
              <FacebookShareButton
                url={shareUrl}
                hashtag={contestDetail.tags?.map((tag) => `#${tag}`).join("")}
                className="h-full w-full flex justify-center items-center"
                about={shareTitle}
                aria-description={shareDescription}
                content={shareDescription}
              >
                <Facebook size={16} />
              </FacebookShareButton>
            </DockIcon>
            <DockIcon className="bg-black/10 dark:bg-white/10">
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                via="montek"
                hashtags={contestDetail.tags?.map((tag) => `${tag}`)}
                className="h-full w-full flex justify-center items-center"
              >
                <Twitter size={16} />
              </TwitterShareButton>
            </DockIcon>
            <DockIcon className="bg-black/10 dark:bg-white/10">
              <TelegramShareButton
                url={shareUrl}
                title={shareTitle}
                className="h-full w-full flex justify-center items-center"
              >
                <Send size={16} className="!fill-none" />
              </TelegramShareButton>
            </DockIcon>
            <DockIcon className="bg-black/10 dark:bg-white/10">
              <EmailShareButton
                url={shareUrl}
                title={shareTitle}
                className="h-full w-full flex justify-center items-center"
              >
                <Mail size={16} />
              </EmailShareButton>
            </DockIcon>
          </Dock>
          <div className="flex justify-center items-center mt-6 sm:hidden">
            <Button
              className="w-fit !bg-blue-600"
              onClick={() =>
                shareOnMobile({
                  text: shareDescription,
                  url: shareUrl,
                  title: shareTitle,
                })
              }
            >
              Chia sẻ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestDetail;
