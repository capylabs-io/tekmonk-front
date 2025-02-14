"use client";

import StudentTablePagination from "@/components/admin/student-table-pagination";
import { CommonCard } from "@/components/common/CommonCard";
import { CommonTag } from "@/components/common/CommonTag";
import { Input } from "@/components/common/Input";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { BannerCard } from "@/components/new/BannerCard";
import { LandingFooter } from "@/components/new/NewsFooter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTE } from "@/contants/router";
import Image from "next/image";
import { useState } from "react";
import { newsData } from "../tin-tuc/page";
import { Banknote } from "lucide-react";

const HiringContentComponent = () => {
  const router = useCustomRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const handleRedirectDetail = (id: number) => {
    router.push(`${ROUTE.HIRING}/${id}`);
  };
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between ">
        <Input
          type="text"
          isSearch={true}
          placeholder="Tìm kiếm article theo từ khoá"
          customClassNames="max-w-[410px] h-10"
        />
        <div className="flex items-center gap-1">
          <div className="text-BodySm text-gray-70">Hiển thị theo:</div>
          {/* show select item */}
          <Select>
            <SelectTrigger
              className="w-[100px] h-8 border border-gray-30 rounded-[4px]"
              style={{
                boxShadow: "0px 2px 0px #DDD0DD",
              }}
            >
              <SelectValue placeholder="Mới nhất" />
            </SelectTrigger>
            <SelectContent className="bg-gray-00">
              <SelectGroup>
                <SelectItem value="Mới nhất">Mới nhất</SelectItem>
                <SelectItem value="Cũ nhất">Cũ nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* show item grid here */}
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.map((item, index) => {
          return (
            <CommonCard
              key={index}
              size="medium"
              className="h-[411px] w-full flex flex-col items-center gap-4"
              onClick={() => handleRedirectDetail(item.id)}
            >
              <Image
                alt=""
                src={item.thumbnail}
                width={100}
                height={220}
                className="w-full h-[220px] object-cover rounded-t-[16px]"
              />
              <div className="w-full p-4 pb-6 flex flex-col gap-2">
                <div className="flex items-start gap-2 justify-start">
                  {item.tags.split(",").map((tag, tagIndex) => {
                    return (
                      <CommonTag key={tagIndex} className="tag-class">
                        {tag}
                      </CommonTag>
                    );
                  })}
                </div>
                <div className="text-HeadingSm text-gray-95 max-h-16 w-full overflow-hidden">
                  {item.title}
                </div>
                <div className="text-BodySm text-gray-95 flex gap-2">
                  <Banknote className="text-gray-70" size={16} />
                  <div>Mức lương: {item.salary}</div>
                </div>
              </div>
            </CommonCard>
          );
        })}
      </div>
      <div className=" w-full flex items-end lg:justify-end justify-center">
        <StudentTablePagination
          showDetails={false}
          totalItems={100}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(itemsPerPage) => console.log(itemsPerPage)}
          className="max-w-[444px]"
        />
      </div>
    </div>
  );
};

export default function Hiring() {
  return (
    <div className="mt-16 w-full flex flex-col items-center gap-8">
      <BannerCard className="w-full rounded-3xl h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="text-DisplayMd text-gray-10">
            Tuyển dụng tại TekMonk
          </div>
          <div className="text-center text-SubheadLg text-gray-10 max-w-[560px]">
            LLorem ipsum dolor sit amet consectetur. Pharetra pretium diam
            egestas diam nibh nibh.
          </div>
        </div>
      </BannerCard>
      {1 == 1 ? (
        <HiringContentComponent />
      ) : (
        <div className="w-full h-[440px] flex flex-col items-center justify-center gap-4">
          <Image
            alt="empty-state"
            src="/admin/empty-data.png"
            width={300}
            height={200}
          />
          <div className="flex flex-col items-center">
            <div className="text-SubheadLg text-gray-70">
              Không có sự kiện mới
            </div>
            <div className="text-BodyMd text-gray-50">
              Chúng tôi sẽ sớm cập nhật thông tin mới
            </div>
          </div>
        </div>
      )}
      <LandingFooter />
    </div>
  );
}
