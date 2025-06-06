import { ReqGetUserShopItems } from "@/requests/shop-item-user";
import { useUserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { useState } from "react";

export const useShopItem = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: myItems } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
          filters: {
            user: {
              id: userInfo?.id,
            },
          },
          pagination: {
            page,
            pageSize,
          },
        });
        return await ReqGetUserShopItems(queryString);
      } catch (error) {
        console.log("Error: ", error);
        return { data: [] };
      }
    },
  });
  return {
    myItems,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
};
