"use client";

import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import { User } from "@/types/common-types";
import classNames from "classnames";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useInfiniteSearchUsers } from "@/hooks/use-user-query";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FILTER_CATEGORY_ENUM } from "@/contants/search/filter-category";

type Props = {
  queryParam: string;
  className?: string;
  page?: number;
  limit?: number;
  canSeeMoreDetail?: boolean;
  limitSeeMoreDetail?: number;
};

export const SearchUserResultItem = ({
  queryParam,
  className,
  page = 1,
  limit = 10,
  limitSeeMoreDetail = 3,
  canSeeMoreDetail = false,
}: Props) => {
  const router = useCustomRouter();
  const [users, setUsers] = useState<User[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteSearchUsers({
      page,
      limit: canSeeMoreDetail ? limitSeeMoreDetail : limit,
      username: queryParam,
    });

  const handleRedirectWithFilterParam = () => {
    router.push(
      `${ROUTE.SEARCH}?q=${queryParam}&filter=${FILTER_CATEGORY_ENUM.PEOPLE}`
    );
  };

  useEffect(() => {
    if (data) {
      const allUsers = data.pages.flatMap((page) => page.data || []);
      setUsers(allUsers);
    }
  }, [data, queryParam]);

  const handleRedirect = (userId: number) => {
    router.push(`${ROUTE.PROFILE}/${userId}`);
  };

  if (isLoading) {
    return <div className="p-4">Đang tải người dùng...</div>;
  }

  if (users.length === 0) {
    return <div className="p-4">Không tìm thấy người dùng</div>;
  }

  return (
    <div className={classNames("space-y-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-70">Người dùng</p>
        {canSeeMoreDetail && (
          <div className="flex justify-center hover:cursor-pointer hover:text-primary-60">
            <Button
              onClick={handleRedirectWithFilterParam}
              disabled={isFetchingNextPage}
            >
              Xem thêm
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={`user-${user.id}`}
            className={classNames(
              "flex gap-4 p-4 mt-4 rounded-lg border border-gray-20 hover:bg-gray-05 transition-colors"
            )}
          >
            <div className="flex-shrink-0 items-center justify-center">
              {user.imageURL ? (
                <div className="my-auto">
                  <Image
                    src={user.imageURL}
                    alt={user.username}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 bg-primary-10 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary-60" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-90 font-medium text-lg truncate">
                {user.username} {user.specialName && `@${user.specialName}`}
              </h3>

              <div className="flex gap-2">
                {user.point !== undefined && (
                  <div className="flex items-center">
                    <Image
                      src="/image/PointIcon.png"
                      alt="coin pic"
                      width={16}
                      height={16}
                    />
                    <span className="text-xs text-gray-60">
                      Điểm: {user.point || 0}
                    </span>
                  </div>
                )}
                {user.totalPrice !== undefined && (
                  <div className="flex items-center">
                    <Image
                      src="/image/home/coin.png"
                      alt="coin pic"
                      width={16}
                      height={16}
                    />
                    <span className="text-xs text-gray-60">
                      Tổng tiền: {user.totalPrice || 0}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className="text-primary-60 text-sm cursor-pointer"
              onClick={() => handleRedirect(user.id)}
            >
              Xem chi tiết
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && !canSeeMoreDetail && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-60 disabled:opacity-50 transition-colors"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center">
                <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang tải...
              </span>
            ) : (
              "Xem thêm"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
