"use client";

import { memo, useEffect, useState } from "react";
import { CardContest } from "../common/CardContest";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { Link as LinkToScroll } from "react-scroll";
import { getContestGroupStageByCandidateNumber } from "@/requests/contestEntry";
import GroupStageDialog from "./GroupStageDialog";
import { ContestGroupStage, TimeLeft } from "@/types/common-types";
import DateTimeDisplay from "./DateTimeDisplay";



export const Clock = memo(
  ({ startTime, endTime }: { startTime: string; endTime: string }) => {
    const router = useRouter();
    const [isContestStarted, setIsContestStarted] = useState(false);
    const [contestStartTime, setContestStartTime] = useState<string>(
      startTime
    );

    const candidateNumber = useUserStore((state) => state.candidateNumber);


    const [dataGroupStage, setDataGroupStage] = useState<ContestGroupStage>(
      {} as ContestGroupStage
    );

    const isConnected = useUserStore((state) => state.isConnected);
    const getRelevantTime = (startTime: string, endTime: string) => {
      const currentTime = new Date();
      if( currentTime < new Date(startTime) ) {
        setIsContestStarted(false);
        return startTime;
      }else {
        setIsContestStarted(true);
        return endTime;
      }
    };

    const fetchDataGroupStage = async () => {
      try {
        if (!candidateNumber) {
          return;
        }
        const response = await getContestGroupStageByCandidateNumber(
          candidateNumber
        );
        if (!response || !response.startTime) {
          return;
        }
        setDataGroupStage(response);
      } catch (err) {
        console.log("err (GroupStageDialog -> FetchDataGroupStage): ", err);
        return;
      }
    };
    useEffect(() => {
      fetchDataGroupStage();
      getRelevantTime(startTime, endTime);
    }, []);

    const isRegisterDisabled = new Date() > new Date(endTime);

    return (
      <div className="text-center mb-12">
        <div className="mt-[52px] flex items-center justify-center gap-4 flex-col">
          {!isConnected() ? (
            <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg"
              outlined={false}
              onClick={() => router.push("register-contest")}
              disabled={isRegisterDisabled}
            >
              Đăng ký
            </Button>
          ) : (
            <GroupStageDialog groupStageData={dataGroupStage} />
          )}

          <Button
            className="w-[312px] h-[52px] max-[460px]:w-[280px] border border-gray-200 shadow-custom-gray text-SubheadLg"
            outlined={true}
            onClick={() => router.push("tong-hop-bai-du-thi")}
          >
            Tổng hợp bài dự thi
          </Button>
          <LinkToScroll to="rules" smooth={true} duration={500}>
            <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] border border-gray-200 shadow-custom-gray text-SubheadLg"
              outlined={true}
            >
              Thể lệ
            </Button>
          </LinkToScroll>
        </div>

        <div className="mt-[52px] text-2xl font-bold text-gray-600">
          {isContestStarted
            ? "Thời gian đăng ký kết thúc sau:"
            : "Thời gian đăng ký bắt đầu sau:"}
        </div>

        <div className="mt-[26px] flex justify-center gap-4">
          {/* {timeLeftComponents.map(({ label, value }, index) => (
          <div key={index} className="flex flex-col items-center">
            <CardContest
              className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] "
            >
              <div className="text-SubheadLg max-[865px]:text-sm max-[865px]:font-bold max-mobile:text-bodyXs text-gray-500">
                {label}
              </div>
              <div className="text-primary-700 font-dela max-[865px]:text-4xl max-mobile:text-2xl text-[64px]">
                {value !== undefined ? value.toString().padStart(2, "0") : "00"}
              </div>
            </CardContest>
          </div>
        ))} */}
          <div className="flex flex-col items-center">
            <CardContest
              className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] "
            >
              <div className="text-SubheadLg max-[865px]:text-sm max-[865px]:font-bold max-mobile:text-bodyXs text-gray-500">
                NGÀY
              </div>
              <div className="text-primary-700 font-dela max-[865px]:text-4xl max-mobile:text-2xl text-[64px]">
                { contestStartTime &&
                  <DateTimeDisplay
                    dataTime={contestStartTime}
                    type={"days"}
                  />
                }
              </div>
            </CardContest>
          </div>

          <div className="flex flex-col items-center">
            <CardContest
              className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] "
            >
              <div className="text-SubheadLg max-[865px]:text-sm max-[865px]:font-bold max-mobile:text-bodyXs text-gray-500">
                GIỜ
              </div>
              <div className="text-primary-700 font-dela max-[865px]:text-4xl max-mobile:text-2xl text-[64px]">
                {contestStartTime &&
                  <DateTimeDisplay
                    dataTime={contestStartTime}
                    type={"hours"}
                  />
                }
              </div>
            </CardContest>
          </div>

          <div className="flex flex-col items-center">
            <CardContest
              className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] "
            >
              <div className="text-SubheadLg max-[865px]:text-sm max-[865px]:font-bold max-mobile:text-bodyXs text-gray-500">
                PHÚT
              </div>
              <div className="text-primary-700 font-dela max-[865px]:text-4xl max-mobile:text-2xl text-[64px]">
                {contestStartTime &&
                  <DateTimeDisplay
                    dataTime={contestStartTime}
                    type={"minutes"}
                  />
                }
              </div>
            </CardContest>
          </div>

          <div className="flex flex-col items-center">
            <CardContest
              className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] "
            >
              <div className="text-SubheadLg max-[865px]:text-sm max-[865px]:font-bold max-mobile:text-bodyXs text-gray-500">
                GIÂY
              </div>
              <div className="text-primary-700 font-dela max-[865px]:text-4xl max-mobile:text-2xl text-[64px]">
                {contestStartTime &&
                  <DateTimeDisplay
                    dataTime={contestStartTime}
                    type={"seconds"}
                  />
                }
              </div>
            </CardContest>
          </div>
        </div>
      </div>
    );
  }
);
