"use client";
import { useEffect, useState } from "react";
import { RecruitmentDetail } from "@/types/common-types";
import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "@/requests/axios.config";
import { get } from "lodash";

export const useRecruitmentDetail = (paramsId: string) => {
  const [recruitmentDetail, setRecruitmentDetail] =
    useState<RecruitmentDetail | null>(null);

  useEffect(() => {
    const fetchRecruitmentDetail = async () => {
      try {
        const response = await tekdojoAxios.get<RecruitmentDetail>(
          `${BASE_URL}/news/${paramsId}`
        );
        setRecruitmentDetail(get(response.data, "data", null));
        //truy cập trường data của response.data
      } catch (error) {
        console.error("Error fetching recruitment details:", error);
      }
    };

    fetchRecruitmentDetail();
  }, [paramsId]);

  const updateRecruitmentDetail = (
    key: keyof RecruitmentDetail["attributes"],
    value: string
  ) => {
    if (recruitmentDetail) {
      const updatedDetail = { ...recruitmentDetail };
      updatedDetail.attributes[key] = value;
      setRecruitmentDetail(updatedDetail);
    }
  };

  return {
    recruitmentDetail,
    updateRecruitmentDetail,
  };
};
