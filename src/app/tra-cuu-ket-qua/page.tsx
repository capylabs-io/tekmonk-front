"use client";

import Image from "next/image";
import { useState } from "react";
import { ContestSubmission } from "@/types/contestSubmit";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/LoadingStore";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const submissionSchema = z.object({
    candidateNumber: z.string({required_error: 'Số báo danh không được để trống'}),
    phoneNumber: z.string({required_error: 'Số điện thoại không được để trống'})
  })

export default function searchResults() {
  const router = useRouter();

  //define state
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
        candidateNumber: '',
        phoneNumber: '',
    }
  })

  //use state
  const [searchResults, setSearchResults] = useState<ContestSubmission[]>([]);

  //use store
  const [hideLoading, showLoading, loading] = useLoadingStore((state) => [
    state.hide,
    state.show,
    state.isShowing,
  ]);
  return (
    <div className="mx-auto max-w-[720px] border-gray-200 bg-white min-h-[calc(100vh-64px-4px)] 
        shadow-md border-l border-r border-b border-b-gray-300 rounded-none rounded-b-xl border-t-0 
        mb-3 mt-3 pb-3">
      <div className="space-y-6">
        <Image
          src={`/image/contest/tong-hop-bai-du-thi.jpg`}
          alt={`Banner`}
          width={720}
          height={480}
          priority
          style={{ objectFit: "contain" }}
          quality={100}
        />
      </div>

      <div className="mt-8 text-bodyLg">
        <div className="text-center">Thí sinh nhập số báo danh và số điện thoại vào các ô dưới đây để tra cứu thông tin</div>
        <div className="w-full h-[76px] flex mt-4 items-end px-4">
            <div className="w-10/12 flex gap-x-3">
                <div className={``}>
                    <div className="text-gray-950 text-SubheadSm">Số báo danh <span className="text-red-500">*</span></div>
                    <Input type="text" placeholder="Nhập số báo danh" customClassNames="w-[264px] mt-2"/>
                </div>
                <div className={``}>
                    <div className="text-gray-950 text-SubheadSm">Số điện thoại <span className="text-red-500">*</span></div>
                    <Input type="text" placeholder="Nhập số điện thoại" customClassNames="w-[264px] mt-2"/>
                </div>
            </div>
            <Button className={`!rounded-[3rem] h-[40px] w-2/12 max-w-[106px]`}>Tra cứu</Button>
        </div>
      </div>
    </div>
  );
}
