"use client";

import Tag from "@/components/contest/Tag";
import { Dock, DockIcon } from "@/components/ui/dock";
import { getOneContestSubmission } from "@/requests/contestSubmit";
import { ContestSubmission } from "@/types/contestSubmit";
import { ArrowLeft, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ContestDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [contestDetail, setContestDetail] = useState<ContestSubmission | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchContestDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getOneContestSubmission(id as string);
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
        No contest details found.
      </div>
    );
  }

  return (
    <div>
      <div className="px-8">
        <div className="h-12 mobile:h-16 flex items-center">
          <ArrowLeft
            size={32}
            onClick={() => router.push("/all-contest-entries")}
            className="cursor-pointer"
          />
        </div>
        <div className="py-4">
          <span className="text-grey-500 text-sm">ID: {contestDetail.id}</span>
          <p className="text-SubheadSm mb-4">{contestDetail.contest_entry?.user.fullName}</p>
          <div>
            {contestDetail.tags?.map((tag, index) => (
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
            {contestDetail.thumbnail?.url && (
              <Image
                src={`http://localhost:1337${contestDetail.thumbnail.url}`}
                alt={`Banner for ${contestDetail.title}`}
                width={960}
                height={480}
                priority
                style={{ borderRadius: "8px", objectFit: "contain" }}
                quality={100}
              />
            )}
            <div className="flex flex-wrap justify-between mt-2 gap-2">
              {contestDetail.assets?.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.5rem)]"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={`http://localhost:1337${item.url}`}
                    alt={`Contest entry image ${index + 1}`}
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
