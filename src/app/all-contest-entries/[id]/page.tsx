"use client";

import Tag from "@/components/contest/Tag";
import { Dock, DockIcon } from "@/components/ui/dock";
import { getOneContestSubmission } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import { ArrowLeft, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { EmptySearch } from "@/components/common/EmptySearch";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCustom } from "@/components/common/ImageCustom";
import Head from "next/head";

const ContestDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [contestDetail, setContestDetail] = useState<ContestSubmission | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchContestDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getOneContestSubmission(id as string);
        console.log(response.data);
        if (response && response.data) {
          setContestDetail(response.data);
        } else {
          console.error("No data received from API");
          setContestDetail(null);
        }
      } catch (error) {
        console.error("Failed to fetch contest detail:", error);
        setContestDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestDetail();
  }, [id]);

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
        <EmptySearch buttonText="Trở về" message="Không tìm thấy bài thi" onAction={() => router.push("/all-contest-entries")} />
      </div>
    );
  }

  const shareUrl = `http://localhost:3000/all-contest-entries/${id}`;
  const shareTitle = contestDetail?.title || "Check out this contest entry!";
  const shareDescription = contestDetail?.description || "An amazing contest submission";

  return (
    <>
      <Head>
        <title>{contestDetail.title}</title>
        <meta property="og:title" content={contestDetail.title} />
        <meta property="og:description" content={contestDetail.description} />
        <meta property="og:image" content={contestDetail.assets?.[selectedImageIndex]?.url} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="max-w-[720px] mx-auto">
        <div className="">
          <div className="h-12 mobile:h-16 flex items-center px-8">
            <ArrowLeft
              size={24}
              onClick={() => router.push("/all-contest-entries")}
              className="cursor-pointer"
            />
            <span className="text-grey-500 text-sm font-medium ml-2 select-none">Quay lại</span>
          </div>
          <div className="pb-4">
            <section className="">
              <header className="px-8 border-b border-grey-200 pb-4">
                <p className="mb-3">
                  <span className="text-SubheadSm !font-medium mr-2">
                    {contestDetail.contest_entry?.user.fullName}
                  </span>
                  <span className="text-grey-500 text-sm">Số báo danh: {contestDetail.contest_entry?.candidateNumber}</span>
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
                    />
                  ))}
                </div>
              </header>
              <p className="my-4 px-8">{contestDetail.description}</p>

              <div className="w-full mx-auto pt-4 px-8">
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
                <div className="mt-6 mb-4 sm:px-16">
                  <Carousel opts={{ align: "center" }} className="w-full">
                    <CarouselContent className="m-0">
                      {contestDetail.assets?.map((item, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-1 md:basis-1/2 lg:basis-1/3 select-none"
                        >
                          <div
                            className={`relative cursor-pointer rounded-md overflow-hidden ${selectedImageIndex === index
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
        <div>
          <Dock direction="middle" className="m-0 my-4 mx-auto">
            <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
              <FacebookShareButton
                url={shareUrl}
                // quote={`${shareTitle}\n\n${shareDescription}`}
                hashtag="#montek"
                className="h-full"
              >
                <Facebook size={16} />
              </FacebookShareButton>
            </DockIcon>
            <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                via="YourTwitterHandle"
                hashtags={["contest", "submission"]}
                className="h-full "
              >
                <Twitter size={16} />
              </TwitterShareButton>
            </DockIcon>
          </Dock>
        </div>
      </div>

    </>
  );
};

export default ContestDetail;
