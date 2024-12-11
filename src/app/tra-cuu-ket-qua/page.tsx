"use client";

import Image from "next/image";
import { useState } from "react";
import { ContestSubmission } from "@/types/contestSubmit";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/LoadingStore";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { z } from 'zod'
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import qs from 'qs';

const phoneRegex = /^(\+84|0)\d{9,10}$/;
const searchResultScheme = z.object({
    candidateNumber: z.string({required_error: 'Số báo danh không được để trống'}).min(1, "Số báo danh ít nhất 1 ký tự"),
    phoneNumber: z.string({ required_error: "Số điện thoại của phụ huynh là bắt buộc" })
    .min(1, "Số điện thoại của phụ huynh là bắt buộc")
    .regex(phoneRegex, "Số điện thoại không hợp lệ"),
  })

export default function searchResults() {
  const router = useRouter();

  //define state
  const method = useForm({
    resolver: zodResolver(searchResultScheme),
    mode: 'onChange',
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

  //onClick functions
  const handleSearch = async (data: any) => {
    showLoading();
    try {
      //call api here
      
      const query = {
        candidateNumber: data.candidateNumber,
        phoneNumber: data.phoneNumber,
      }
      setSearchResults([]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  }
  return (
    <div className="mx-auto max-w-[720px] border-gray-200 bg-white min-h-[calc(100vh-64px-4px)] 
        shadow-md border-l border-r border-b border-b-gray-300 rounded-none rounded-b-xl border-t-0 
        mb-3 pb-3">
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
        <div className="w-full h-[76px] flex mt-8 items-end px-4 gap-x-2">
          <FormProvider {...method}>
            <div className="w-11/12 flex gap-x-3">
                <div className={`w-[45%]`}>
                    <div className="text-gray-950 text-SubheadSm">Số báo danh <span className="text-red-500">*</span></div>
                    <Controller 
                      name="candidateNumber"
                      control={method.control}
                      render={({field: {value, onChange}, fieldState}) => (
                        <Input 
                          value={value}
                          onChange={onChange}
                          type="text"
                          placeholder="Nhập số báo danh" 
                          customClassNames="w-[264px] mt-2" 
                          error={fieldState && fieldState.error?.message}
                        />
                      )}
                    />
                </div>
                <div className={`w-[45%]`}>
                    <div className="text-gray-950 text-SubheadSm">Số điện thoại <span className="text-red-500">*</span></div>
                    <Controller
                      control={method.control}
                      name="phoneNumber"
                      render={({ field: { value, onChange }, fieldState }) => (
                        <Input
                          type="text"
                          value={value}
                          onChange={onChange}
                          placeholder="Nhập số điện thoại"
                          customClassNames="mt-2 w-[264px] mt-2"
                          error={fieldState && fieldState.error?.message}
                        />
                      )}
                    /> 
                </div>
            </div>
            <Button className={`!rounded-[3rem] h-[40px] w-2/12 max-w-[106px]`} onClick={method.handleSubmit(handleSearch)}>Tra cứu</Button>
          </FormProvider>
        </div>
        <div className={`mt-8 w-full border border-gray-300`}></div>

        <div>
        {/* 
          * show result here
        */}
          <div className={`flex h-14 items-center justify-between px-4`}>
            <div className={`text-SubheadLg text-gray-950`}>Thông tin thí sinh</div>
            <Button outlined={true} className={`border border-gray-300 !rounded-[3rem] w-[132px] h-10`}>Xem bài thi</Button>
          </div>
          <div className={`mt-4 px-4 grid grid-cols-2`}>
            <div className="flex gap-3">
              <div className="text-bodyLg text-gray-600 space-y-3">
                <div>Họ tên:</div>
                <div>Bảng thi:</div>
                <div>Hạng mục:</div>
              </div>
              <div className="text-SubheadMd text-gray-800 space-y-2">
                <div>Nguyễn Văn A</div>
                <div>D</div>
                <div className="">Thi nhóm</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-bodyLg text-gray-600 space-y-3">
                <div>Họ tên:</div>
                <div>Bảng thi:</div>
                <div>Hạng mục:</div>
              </div>
              <div className="text-SubheadMd text-gray-800 space-y-2">
                <div>Nguyễn Văn A</div>
                <div>D</div>
                <div className="">Thi nhóm</div>
              </div>
            </div>
          </div>
        </div>
          {1 === 1 && 
            <div className="mb-3">
              <div className={`mt-8 w-full border border-gray-300`}></div>
              <div className="mt-4 px-4">
              {/**
               * show group member info here
               */}
                <div className={`text-SubheadLg text-gray-950`}>Thành viên cùng nhóm</div>
                  <div className="mt-4 flex gap-3">
                    <div className="text-bodyLg text-gray-600 space-y-3">
                      <div>Họ tên:</div>
                      <div>Họ tên:</div>
                    </div>
                    <div className="text-SubheadMd text-gray-800 space-y-2">
                      <div>Nguyễn Văn A</div>
                      <div>Nguyễn Văn B</div>
                    </div>
                  </div>
              </div>
            </div>
          }
      </div>
    </div>
  );
}
