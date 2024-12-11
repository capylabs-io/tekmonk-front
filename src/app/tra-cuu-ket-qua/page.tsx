"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/LoadingStore";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import qs from "qs";
import { getResultSearchContestSubmisson } from "@/requests/contest-submission";
import { get } from "lodash";

type TSearchResultsProps = {
  QualifiedExam: boolean | null;
  fullName: string;
  contest_group_stage: string;
  category: string;
  group_member: string[];
};

const phoneRegex = /^(\+84|0)\d{9,10}$/;
const searchResultScheme = z.object({
  candidateNumber: z
    .string({ required_error: "Số báo danh không được để trống" })
    .min(1, "Số báo danh ít nhất 1 ký tự"),
  phoneNumber: z
    .string({ required_error: "Số điện thoại của phụ huynh là bắt buộc" })
    .min(1, "Số điện thoại của phụ huynh là bắt buộc")
    .regex(phoneRegex, "Số điện thoại không hợp lệ"),
});

export default function SearchResults() {

  //define state
  const method = useForm({
    resolver: zodResolver(searchResultScheme),
    mode: "onChange",
    defaultValues: {
      candidateNumber: "",
      phoneNumber: "01231235246",
    },
  });

  //use state
  const [searchResults, setSearchResults] = useState<any | undefined>(
    undefined
  );
  const [showResult, setShowResult] = useState<TSearchResultsProps>({
    QualifiedExam: null,
    fullName: "",
    contest_group_stage: "",
    category: "",
    group_member: [],
  });

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
      showLoading();
      const query = {
        filters: {
          contest_entry: {
            candidateNumber: { $eq: data.candidateNumber },
            user: {
              parentPhoneNumber: { $eq: data.phoneNumber },
            },
          },
        },
        populate: {
          contest_entry: {
            populate: {
              user: true,
            },
          },
        },
      };
      const result = await getResultSearchContestSubmisson(
        qs.stringify(query, { encodeValuesOnly: true })
      );
      if (result) {
        setSearchResults(result[0]);
        hideLoading();
      } else {
        setSearchResults(undefined);
        hideLoading();
      }
    } catch (error) {
      console.log(error);
      hideLoading();
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (searchResults) {
      const group_stage = searchResults.contest_entry.candidateNumber
        .toString()
        .split("-")[0];
      let category = "";
      if (group_stage == "D2") {
        category = "Thi nhóm";
      } else {
        category = "Thi cá nhân";
      }
      setShowResult({
        QualifiedExam: searchResults.QualifiedExam,
        fullName: searchResults.contest_entry.user.fullName,
        contest_group_stage: group_stage,
        category: category,
        group_member: [],
      });
      const members: string[] = []
      if (searchResults.contest_entry.groupMemberInfo != null) {
        searchResults.contest_entry.groupMemberInfo.map((member: any) => {
          members.push(member.name);
        });
        setShowResult((prev) => ({ ...prev, group_member: members}));
      }
    }
  }, [searchResults]);
  showResult && console.log("data", showResult);
  return (
    <div
      className="mx-auto max-w-[720px] border-gray-200 bg-white min-h-[calc(100vh-64px-4px)] 
        shadow-md border-l border-r border-b border-b-gray-300 rounded-none rounded-b-xl border-t-0 
        mb-3 pb-3"
    >
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
        <div className="text-center">
          Thí sinh nhập số báo danh và số điện thoại vào các ô dưới đây để tra
          cứu thông tin
        </div>
        <div
          className="w-full h-[76px] sm:flex mt-8 items-end px-4 gap-x-2 
            max-sm:h-[255px] 
          "
        >
          <FormProvider {...method}>
            <div className="sm:w-11/12 sm:flex gap-x-3 ">
              <div className={`sm:w-[45%]`}>
                <div className="text-gray-950 text-SubheadSm">
                  Số báo danh <span className="text-red-500">*</span>
                </div>
                <Controller
                  name="candidateNumber"
                  control={method.control}
                  render={({ field: { value, onChange }, fieldState }) => (
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
              <div className={`sm:w-[45%] max-sm:mt-3`}>
                <div className="text-gray-950 text-SubheadSm">
                  Số điện thoại <span className="text-red-500">*</span>
                </div>
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
            <Button
              className={`!rounded-[3rem] h-[40px] sm:w-2/12 sm:max-w-[106px] max-sm:mt-3 max-sm:w-full`}
              onClick={method.handleSubmit(handleSearch)}
            >
              Tra cứu
            </Button>
          </FormProvider>
        </div>
        <div className={`mt-8 w-full border border-gray-300`}></div>

        {searchResults ? (
          <div>
            {/*
             * show result here
             */}
            <div className={`flex h-14 items-center justify-between px-4`}>
              <div className={`text-SubheadLg text-gray-950`}>
                Thông tin thí sinh
              </div>
              <Button
                outlined={true}
                className={`border border-gray-300 !rounded-[3rem] w-[132px] h-10`}
              >
                Xem bài thi
              </Button>
            </div>
            <div className={`mt-4 px-4 grid sm:grid-cols-2 grid-cols-1`}>
              <div className="flex gap-3">
                <div className="text-bodyLg text-gray-600 space-y-3">
                  <div>Họ tên:</div>
                  <div>Bảng thi:</div>
                  <div>Hạng mục:</div>
                </div>
                <div className="text-SubheadMd text-gray-800 space-y-2">
                  <div>{get(showResult, ["fullName"], "")}</div>
                  <div>{get(showResult, ["contest_group_stage"], "")}</div>
                  <div className="">{get(showResult, ["category"], "")}</div>
                </div>
              </div>
              <div className="flex gap-3 max-sm:mt-3">
                <div className="text-bodyLg text-gray-600 space-y-3">
                  {/* <div>Điểm số:</div> */}
                  <div>Kết quả:</div>
                  {/* <div>Xấp hạng:</div> */}
                </div>
                <div className="text-SubheadMd text-gray-800 space-y-2">
                  {/* <div>30/100</div> */}
                  <div>{showResult.QualifiedExam != null ? showResult.QualifiedExam == true ? "Đạt" : "Không đạt" : "Chưa chấm"}</div>
                  {/* <div className="">1</div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-8 text-bodyLg mb-3">
            <Image
              src={`/image/contest/Social-02.png`}
              alt={`Empty`}
              width={300}
              height={300}
              priority
              quality={100}
              className="mx-auto"
            />
            <div className="text-red-700">Không có kết quả trùng khớp</div>
          </div>
        )}
        {showResult.group_member.length > 0 && (
          <div className="mb-3">
            <div className={`mt-8 w-full border border-gray-300`}></div>
            <div className="mt-4 px-4">
              {/**
               * show group member info here
               */}
              <div className={`text-SubheadLg text-gray-950`}>
                Thành viên cùng nhóm
              </div>
              <div className="mt-4 flex gap-3">
                <div className="text-bodyLg text-gray-600 space-y-3">
                  <div>Họ tên:</div>
                  {showResult.group_member.length > 1 && 
                    <div>Họ tên:</div>
                  }
                </div>
                <div className="text-SubheadMd text-gray-800 space-y-2">
                  <div>{showResult.group_member[0]}</div>
                  {showResult.group_member.length > 1 &&
                    <div>{showResult.group_member[1]}</div>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
