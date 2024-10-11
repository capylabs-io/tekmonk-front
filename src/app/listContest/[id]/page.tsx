"use client";

import Tag from "@/components/contest/Tag";
import { Dock, DockIcon } from "@/components/ui/dock";
import { ArrowLeft, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ContestDetail: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    
  }, []);

  const contestDetail = {
    id: "11111111",
    author: "Henry Nguyen",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    title: "Tên dự án tại đây",
    description:
      "Lorem ipsum dolor sit amet consectetur. Malesuada posuere nulla vehicula in congue suspendisse tempor. Amet non nisl dictum aliquam integer habitant lacus. Quis adipiscing gravida curabitur ultricies natoque iaculis suspendisse sed. Ut sed viverra cursus tincidunt molestie at cum.",
    images: {
      banner: "/image/contest/banner.png",
      grid: [
        "/image/contest/banner.png",
        "/image/contest/banner.png",
        "/image/contest/banner.png",
      ],
    },
  };

  return (
    <div>
      <div className="px-8">
        <div className="h-12 mobile:h-16  flex items-center">
          <ArrowLeft
            size={32}
            onClick={() => router.push("/listContest")}
            className="cursor-pointer"
          />
        </div>
        <div className="py-4">
          <span className="text-grey-500 text-sm">ID: {contestDetail.id}</span>
          <p className="text-SubheadSm mb-4">{contestDetail.author}</p>
          <div>
            {contestDetail.tags.map((tag, index) => (
              <Tag
                key={index}
                text={tag}
                className="mr-2"
                size="medium"
                type="secondary"
              />
            ))}
          </div>
          <section className="mt-4">
            <h1 className="text-SubheadLg text-grey-700 uppercase">
              {contestDetail.title}
            </h1>
            <p className="mb-1">{contestDetail.description}</p>
            <Image
              src={contestDetail.images.banner}
              alt="Banner contest"
              width={1440}
              height={480}
              priority
              style={{ borderRadius: "8px" }}
              quality={80}
            />
            <div className="flex flex-wrap justify-between mt-2 gap-2">
              {contestDetail.images.grid.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.5rem)]"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={item}
                    alt="Ảnh mô tả sản phẩm bài thi"
                    fill
                    style={{ borderRadius: "9px", objectFit: "contain" }}
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <hr />
      <div>
        <Dock direction="middle" className="m-0 my-4 mx-auto">
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Facebook className="h-full" />
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Instagram className="h-full" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
};

export default ContestDetail;
