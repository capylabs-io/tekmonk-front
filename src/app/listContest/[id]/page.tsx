"use client";

import Tag from "@/components/contest/Tag";
import { Dock, DockIcon } from "@/components/ui/dock";
import { getOneContestSubmission } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import { ArrowLeft, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams to get dynamic route params

const ContestDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [contestDetail, setContestDetail] = useState<ContestSubmission | null>(null);
  
  useEffect(() => {
    if (!id) return;

    const fetchContestList = async () => {
      try {
        const contest = await getOneContestSubmission(id as string); 
        console.log(contest.data)
        setContestDetail(contest.data);
      } catch (error) {
        console.error("Failed to fetch contest list:", error);
      }
    };

    fetchContestList();
  }, [id]);

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
          <span className="text-grey-500 text-sm">ID: {contestDetail?.id}</span>
          <p className="text-SubheadSm mb-4">{contestDetail?.title}</p>
          <div>
            {contestDetail?.tags?.map((tag, index) => (
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
              {contestDetail?.title}
            </h1>
            <p className="mb-1">{contestDetail?.description}</p>
            <Image
              src={contestDetail?.thumbnail?.[0] ?`http://localhost:1337${contestDetail?.thumbnail?.[0].url}` : "/image/contest/tienphongbanner.png"}
              alt="Banner contest"
              width={1440}
              height={480}
              priority
              style={{ borderRadius: "8px" }}
              quality={100}
              // loading="lazy"
            />
            <div className="flex flex-wrap justify-between mt-2 gap-2">
              {contestDetail?.thumbnail?.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.5rem)]"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={item.url ?`http://localhost:1337${item.url}` : "/image/contest/tienphongbanner.png"}
                    alt="Ảnh mô tả sản phẩm bài thi"
                    fill
                    style={{ borderRadius: "9px", objectFit: "contain" }}
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
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
