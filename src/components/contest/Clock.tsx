"use client";

import { memo, useEffect, useState } from "react";
import { CardContest } from "../common/CardContest";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { Link as LinkToScroll } from "react-scroll";
import { getContestGroupStageByCandidateNumber } from "@/requests/contestEntry";
import GroupStageDialog from "./GroupStageDialog";
import { ContestGroupStage } from "@/types/common-types";
import DateTimeDisplay from "./DateTimeDisplay";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Clock = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const router = useRouter();
  //use state
  const [isContestStarted, setIsContestStarted] = useState({
    started: false,
    ended: false,
  });
  const [contestTimeLeft, setContestTimeLeft] = useState<string>(startTime);

  const candidateNumber = useUserStore((state) => state.candidateNumber);

  const [dataGroupStage, setDataGroupStage] = useState<ContestGroupStage>(
    {} as ContestGroupStage
  );

  const isConnected = useUserStore((state) => state.isConnected);
  const getRelevantTime = (startTime: string, endTime: string) => {
    const currentTime = new Date();
    if (currentTime < new Date(startTime)) {
      setIsContestStarted({ started: false, ended: false });
      return startTime;
    } else {
      setIsContestStarted({ started: true, ended: false });
      return endTime;
    }
  };

  const handleTimeOver = () => {
    if (!isContestStarted.started) {
      setIsContestStarted({ started: true, ended: false });
      return;
    }
    if (!isContestStarted.ended) {
      setIsContestStarted({ started: true, ended: true });
      return;
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
      return;
    }
  };
  useEffect(() => {
    fetchDataGroupStage();
    setContestTimeLeft(getRelevantTime(startTime, endTime));
  }, [isContestStarted.started, isContestStarted.ended]);

  const isRegisterDisabled = new Date() > new Date(endTime);

  return (
    <div className="text-center mb-12">
      <TooltipProvider>
        <div className="mt-[52px] flex items-center justify-center gap-4 flex-col">
          {!isConnected() ? (
            <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem]  shadow-custom-primary text-SubheadLg 
              
              max-[460px]:text-[16px]
                max-[460px]:h-[50px]
              "
              outlined={false}
              onClick={() => router.push("register-contest")}
              disabled={
                isRegisterDisabled ||
                !isContestStarted.started ||
                isContestStarted.ended
              }
            >
              Đăng ký
            </Button>
          ) : (
            <GroupStageDialog groupStageData={dataGroupStage} />
          )}

          <Tooltip>
            <TooltipTrigger>
              <Button
                className="w-[312px] h-[52px] max-[460px]:w-[280px]  border border-gray-200 shadow-custom-gray text-SubheadLg 
                max-[460px]:text-[16px]
                max-[460px]:h-[50px]
                "
                outlined={true}
                // onClick={() => router.push("tong-hop-bai-du-thi")}
              >
                Tổng hợp bài dự thi
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sắp diễn ra</p>
            </TooltipContent>
          </Tooltip>
          <LinkToScroll to="rules" smooth={true} duration={500}>
            <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] border border-gray-200 shadow-custom-gray text-SubheadLg 
              max-[460px]:text-[16px]
                max-[460px]:h-[50px]
              
              "
              outlined={true}
            >
              Thể lệ
            </Button>
          </LinkToScroll>
        </div>

        <div className="mt-[52px] text-2xl font-bold text-gray-600 max-md:text-xl">
          {isContestStarted.started
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
                {contestTimeLeft && (
                  <DateTimeDisplay dataTime={contestTimeLeft} type={"days"} />
                )}
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
                {contestTimeLeft && (
                  <DateTimeDisplay dataTime={contestTimeLeft} type={"hours"} />
                )}
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
                {contestTimeLeft && (
                  <DateTimeDisplay
                    dataTime={contestTimeLeft}
                    type={"minutes"}
                  />
                )}
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
                {contestTimeLeft && (
                  <DateTimeDisplay
                    dataTime={contestTimeLeft}
                    type={"seconds"}
                    onTimeOver={handleTimeOver}
                  />
                )}
              </div>
            </CardContest>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default memo(Clock);
