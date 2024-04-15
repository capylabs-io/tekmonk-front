"use client";
import { useEffect, useState } from "react";
import { NewDetail } from "@/types/common-types";
import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "@/requests/axios.config";
import { get } from "lodash";

export const useNewDetail = (paramsId: string) => {
  const [newDetail, setNewDetail] = useState<NewDetail | null>(null);

  useEffect(() => {
    const fetchNewDetail = async () => {
      try {
        const response = await tekdojoAxios.get<NewDetail>(
          `${BASE_URL}/news/${paramsId}`
        );
        setNewDetail(get(response.data, "data", null));
        //truy cập trường data của response.data
      } catch (error) {
        console.error("Error fetching new details:", error);
      }
    };

    fetchNewDetail();
  }, [paramsId]);

  const updateNewDetail = (
    key: keyof NewDetail["attributes"],
    value: string
  ) => {
    if (newDetail) {
      const updatedDetail = { ...newDetail };
      updatedDetail.attributes[key] = value;
      setNewDetail(updatedDetail);
    }
  };

  return {
    newDetail,
    updateNewDetail,
  };
};
