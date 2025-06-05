import React, { useEffect, useMemo, useState } from "react";
import { useCustomRouter } from "../common/router/CustomRouter";
import { useUserStore } from "@/store/UserStore";
import { ROUTE } from "@/contants/router";
import { CommonCard } from "../common/CommonCard";
import { useQuery } from "@tanstack/react-query";
import { ReqGetClasses } from "@/requests/class";
import qs from "qs";
import { get } from "lodash";
import { ReqGetClassSessionDetail } from "@/requests/class-session-detail";
import { CommonEmptyState } from "../common/CommonEmptyState";

export const StudentClass = ({ id }: { id: number }) => {
  const router = useCustomRouter();
  const [showMissionDialog, setShowMissionDialog] = useState(false);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const { data: classSessionDetail } = useQuery({
    queryKey: ["classSessionDetail"],
    queryFn: async () => {
      try {
        //query all if user role is admin
        let queryString = "";
        queryString = qs.stringify({
          filters: {
            student: {
              id: {
                $in: [get(userInfo, ["id"], "")],
              },
            },
          },
          populate: "class_session.class, class_session.class.course",
        });

        return await ReqGetClassSessionDetail(queryString);
      } catch (error) {
        console.log("failed to fetch class", error);
      }
    },
    refetchOnWindowFocus: false,
  });

  const myClassList = useMemo(() => {
    if (!classSessionDetail?.data?.length) return [];

    const uniqueClasses = new Map();

    classSessionDetail.data.forEach((session) => {
      const classData = session.class_session?.class;
      if (classData && !uniqueClasses.has(classData.id)) {
        uniqueClasses.set(classData.id, {
          ...classData,
          course: classData.course,
        });
      }
    });

    return Array.from(uniqueClasses.values());
  }, [classSessionDetail]);
  // const { data: classData } = useQuery({
  //   queryKey: ["class"],
  //   queryFn: async () => {
  //     try {
  //       //query all if user role is admin
  //       let queryString = "";
  //       queryString = qs.stringify({
  //         filters: {
  //           class_sessions: {
  //             id: {
  //               $eq: get(userInfo, ["id"], ""),
  //             },
  //           },
  //         },
  //         populate: "*",
  //       });

  //       return await ReqGetClasses(queryString);
  //     } catch (error) {
  //       console.log("failed to fetch class", error);
  //     }
  //   },
  //   refetchOnWindowFocus: false,
  // });

  const handleShowMore = () => {
    if (userInfo?.id === id) {
      router.push(ROUTE.MY_CLASS);
      return;
    }
    setShowMissionDialog(true);
  };

  return (
    <div className="px-6 mt-3">
      <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
        <div className="text-gray-95 text-SubheadLg">Lớp học của tôi</div>
        <div className="cursor-pointer">
        </div>
        {/* <div className="cursor-pointer" onClick={handleShowMore}>
          Xem thêm
        </div> */}
      </div>
      <div className="flex flex-col mt-4">
        {myClassList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {myClassList.map((classItem) => {
              return (
                <CommonCard
                  key={classItem.id}
                  className="rounded-xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 h-max"
                >
                  <div className="flex flex-col items-start justify-between h-full w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 text-xl font-bold">
                          {get(classItem, "name", "")[0]}
                        </span>
                      </div>
                      <div className="text-SubheadMd text-gray-95 font-semibold">
                        {get(classItem, "name", "")}
                      </div>
                    </div>

                    <div className="space-y-3 w-full">
                      <div className="flex items-center text-BodySm text-gray-600 bg-gray-100 p-2 rounded-lg">
                        <span className="font-medium text-gray-700 mr-2">
                          Khoá học:
                        </span>
                        <span className="text-gray-95">
                          {get(classItem, "course.name", "")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-BodySm">
                          <span className="font-medium text-gray-700 mr-2">
                            Trạng thái:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${new Date(
                              get(classItem, "endTime", "")
                            ).getTime() > new Date().getTime()
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {new Date(get(classItem, "endTime", "")).getTime() >
                              new Date().getTime()
                              ? "Đang diễn ra"
                              : "Đã kết thúc"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CommonCard>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg mt-4">
            <CommonEmptyState />
            <p className="text-sm text-gray-500 text-center max-w-md mt-2">
              Bạn chưa tham gia lớp học nào
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
