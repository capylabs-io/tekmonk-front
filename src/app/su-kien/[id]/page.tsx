"use client";
import Image from "next/image";
import { CommonTag } from "@/components/common/CommonTag";
import { CommonCard } from "@/components/common/CommonCard";
import { Clock8, Facebook, Linkedin, MapPin } from "lucide-react";
import { RelatedInfo } from "@/components/new/RelatedInfo";
import { LandingFooter } from "@/components/new/NewsFooter";
import { newsData } from "@/app/tin-tuc/page";
import { CalendarCard } from "@/components/event/CalendarCard";
export default function Page() {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full max-w-[628px] mt-16 p-2 flex flex-col items-center justify-center gap-4 ">
        <div className="w-full h-[360px] rounded-2xl relative">
          <Image
            alt="Demo image"
            src="/image/landing/demo1.png"
            width={100}
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
            {newsData[0].tags.split(",").map((tag, index) => (
              <CommonTag key={index}>{tag.trim()}</CommonTag>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="text-BodySm text-gray-70 md:block hidden">
              Chia sẻ bài đăng:{" "}
            </div>
            <CommonCard
              size="small"
              className="w-9 h-9 flex items-center justify-center"
            >
              <Facebook
                size={24}
                color="#ffffff"
                fill="#ffffff"
                className="bg-primary-70 rounded-[100%] p-1"
              />
            </CommonCard>
            <CommonCard
              size="small"
              className="w-9 h-9 flex items-center justify-center"
            >
              <Linkedin
                size={24}
                color="#ffffff"
                fill="#ffffff"
                className="bg-primary-70 rounded-sm p-1"
              />
            </CommonCard>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-2">
          <div className="flex items-center text-SubheadMd text-gray-95 gap-2">
            <Clock8 className="text-gray-70" size={16} />
            <div>Chủ Nhật, 03/12/2023 (15:00 - 23:00)</div>
          </div>
          <div className="flex items-start text-BodyMd text-gray-95 gap-2">
            <MapPin className="text-gray-70 mt-1" size={16} />
            <div>Số 101 Đ. Xuân La, Xuân La, District Tay Ho, Ha Noi City</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-HeadingMd text-gray-95">
            TekMonk nhận đầu tư 15 triệu USD vòng Series B, dẫn đầu phát triển
            năng lực công nghệ Việt Nam
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="text-BodySm text-gray-70">12/10/2025</div>
            <div className="flex items-center justify-center gap-1">
              <div className="text-BodySm text-gray-70">Đăng tải bởi:</div>
              <div className="text-SubheadSm text-gray-95">Admin</div>
            </div>
          </div>
          <div className="text-BodyMd text-gray-95">
            <div>
              Mới đây, startup giáo dục Công nghệ TekMonk đã huy động thành công
              15 triệu USD vòng series B do quỹ đầu tư Kaizenvest của Singapore
              dẫn dắt. Đây chính là cột mốc quan trọng, đánh dấu sự phát triển
              mạnh mẽ và vững vàng của TekMonk trong hiện tại cũng như tiềm năng
              tương lai.
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur. Pharetra pretium diam
              egestas diam nibh nibh. Nam dignissim ac non cras aliquam tellus
              vitae. Dui sollicitudin quisque sed vitae. Dignissim ac sed
              pellentesque in non aenean cursus. Vel magna condimentum mollis
              aliquam. Et sed porta morbi nunc felis velit pellentesque ut
              morbi. Dictum fermentum orci aliquet sollicitudin eget id morbi.
              Nibh ultricies consequat lorem pellentesque aliquet. Amet ut
              imperdiet senectus leo odio massa. Elit massa adipiscing massa
              lectus. Nullam massa est ultricies in laoreet natoque molestie
              morbi libero. Ut lorem porttitor elementum bibendum viverra.
              Viverra sapien malesuada ut scelerisque. Aliquet viverra vehicula
              eu ipsum. Sagittis vestibulum elit ut quam. Tincidunt ac nunc urna
              sit. Enim nisl vitae non purus massa nibh in blandit feugiat. Non
              pretium gravida sit pretium. Arcu pharetra eget at ornare. Egestas
              vestibulum lacus at facilisi pulvinar. Porttitor enim leo
              ullamcorper euismod interdum eros tristique. Sagittis diam cum id
              eget proin et lectus augue ut. Egestas scelerisque feugiat vitae
              mi orci tempor. Dui elit risus eget condimentum. Ac nibh mauris
              commodo vulputate pharetra risus. Aliquet purus in neque at id
              facilisi ultrices in proin. Risus ut mi nisi mollis in.. Ultricies
              quisque curabitur ut condimentum risus. Malesuada amet a vitae
              aliquet aliquam in tempus est neque. Urna semper viverra justo
              lectus vitae. Tempus risus vitae velit in arcu. Blandit euismod
              mattis ut porttitor. Nunc purus mattis suspendisse aliquam Lorem
              ipsum dolor sit amet consectetur. Pharetra pretium diam egestas
              diam nibh nibh. Nam dignissim ac non cras aliquam tellus vitae.
              Dui sollicitudin quisque sed vitae. Dignissim ac sed pellentesque
              in non aenean cursus. Vel magna condimentum mollis aliquam. Et sed
              porta morbi nunc felis velit pellentesque ut morbi. Dictum
              fermentum orci aliquet sollicitudin eget id morbi. Nibh ultricies
              consequat lorem pellentesque aliquet. Amet ut imperdiet senectus
              leo odio massa. Elit massa adipiscing massa lectus. Nullam massa
              est ultricies in laoreet natoque molestie morbi libero. Ut lorem
              porttitor elementum bibendum viverra. Viverra sapien malesuada ut
              scelerisque. Aliquet viverra vehicula eu ipsum. Sagittis
              vestibulum elit ut quam. Tincidunt ac nunc urna sit. Enim nisl
              vitae non purus massa nibh in blandit feugiat. Non pretium gravida
              sit pretium. Arcu pharetra eget at ornare. Egestas vestibulum
              lacus at facilisi pulvinar. Porttitor enim leo ullamcorper euismod
              interdum eros tristique. Sagittis diam cum id eget proin et lectus
              augue ut. Egestas scelerisque feugiat vitae mi orci tempor. Dui
              elit risus eget condimentum. Ac nibh mauris commodo vulputate
              pharetra risus. Aliquet purus in neque at id facilisi ultrices in
              proin. Risus ut mi nisi mollis in. Ultricies quisque curabitur ut
              condimentum risus. Malesuada amet a vitae aliquet aliquam in
              tempus est neque. Urna semper viverra justo lectus vitae. Tempus
              risus vitae velit in arcu. Blandit euismod mattis ut porttitor.
              Nunc purus mattis suspendisse aliquam.
            </div>
          </div>
        </div>
      </div>
      <RelatedInfo data={newsData} title="SỰ KIỆN GẦN ĐÂY" />
      <LandingFooter />
    </div>
  );
}
