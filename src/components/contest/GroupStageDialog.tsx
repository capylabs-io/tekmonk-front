"use client";
import { get } from "lodash";
import { Button } from "../common/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContestGroupStage } from "@/types/common-types";
import DateTimeDisplay from "./DateTimeDisplay";
import { useUserStore } from "@/store/UserStore";
import { getOneContestEntry } from "@/requests/contestEntry";
import { getContestSubmissionByContestEntry } from "@/requests/contestSubmit";

const GroupStageDialog = ({
  groupStageData,
}: {
  groupStageData: ContestGroupStage;
}) => {
  //import others
  const router = useRouter();
  //useState
  const [showDialog, setShowDialog] = useState(false);
  const [isGroupStageStarted, setIsGroupStageStarted] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isGroupStageCodeCombat, setIsGroupStageCodeCombat] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //use store
  const candidateNumber = useUserStore((state) => state.candidateNumber);
  //arrow function
  const handleTimeOver = () => {
    setIsGroupStageStarted(true);
  };

  const redirectGroupStageCodeCombat = () => {
    if (router) {
      router.push(`/bang-dau-codecombat`);
    }
  }

  const handleExam = () => {
    if (!isGroupStageStarted) {
      setIsShowMessage(true);
    } else {
      if (router) {
        if (
          groupStageData.code == "A" ||
          groupStageData.code == "B" ||
          groupStageData.code == "C"
        ) {
          router.push(`/bang-dau-codecombat`);
        } else {
          router.push(`/lam-bai-thi`);
        }
      }
    }
  };

  const checkExistContestSubmission = async () => {
    if (!candidateNumber) {
      router.push("/");
      return;
    }
    const contestEntry = await getOneContestEntry(candidateNumber);
    const contestSubmission = await getContestSubmissionByContestEntry(
      contestEntry.id
    );
    setIsSubmitted(contestSubmission.data.length > 0);
  };

  const handleRedirectToMyContest = async () => {
    try {
      // if (!is_show_full) return;
      const contestEntry = await getOneContestEntry(
        useUserStore.getState().candidateNumber || ""
      );
      const contestSubmission = await getContestSubmissionByContestEntry(
        contestEntry.id
      );
      if (contestSubmission.data.length === 0) {
        return;
      }
      router.push(`/tong-hop-bai-du-thi/${contestSubmission.data[0].id}`);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // Check if the group stage has already started
    const hasStarted = new Date(groupStageData.startTime) <= new Date();
    setIsGroupStageStarted(hasStarted);
    if (
      groupStageData.code == "A" ||
      groupStageData.code == "B" ||
      groupStageData.code == "C"
    ) {
      setIsGroupStageCodeCombat(true);
    }
    checkExistContestSubmission();
    setIsClient(true);
  }, [groupStageData.startTime]);
  return (
    isClient && (
      <>
        {isGroupStageCodeCombat ? (
          <>
          {!isSubmitted && <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg 
              max-[460px]:text-[16px]
                max-[460px]:h-[50px]
              "
              outlined={false}
              onClick={redirectGroupStageCodeCombat}
            >
              Vào làm bài
            </Button>}
            
          </>
        ) : (
          <>
          {isSubmitted ? <>
            <Button
              className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg 
              max-[460px]:text-[16px]
                max-[460px]:h-[50px]
              "
              outlined={false}
              onClick={handleRedirectToMyContest}
            >
              Xem bài thi
            </Button>
          </> : 
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger>
                <Button
                  className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg 
              max-[460px]:text-[16px]
                max-[460px]:h-[50px]
              "
                  outlined={false}
                >
                  Vào làm bài
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[480px] bg-white p-0"
                style={{ borderRadius: "16px" }}
              >
                <DialogHeader className="pt-6">
                  <DialogTitle className="text-center text-SubheadLg text-primary-900 m-0 p-0">
                    Bảng {get(groupStageData, "code", "")}
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full border-t border-gray-300 "></div>

                <div className="flex flex-col items-center justify-center h-[120px]">
                  {isGroupStageStarted ? (
                    <div className="py-4 px-[33px]">
                      <div className="text-gray-700 text-xl text-center">
                        {isGroupStageCodeCombat ? (
                          "Cuộc thi đã bắt đầu, chúc bạn thi tốt"
                        ) : (
                          <div className="gap-y-1">
                            <div>Cuộc thi đã bắt đầu !</div>
                            <div className="mt-2">
                              Thời gian bắt đầu:{" "}
                              <span className="font-bold">
                                00:00 25/11/2024
                              </span>
                            </div>
                            <div>
                              Thời gian kết thúc:{" "}
                              <span className="font-bold">
                                23:59 08/12/2024
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-bodyLg">Mở cổng thi sau</div>
                      <div className="text-gray-700">
                        <span className="text-SubheadLg text-gray-950 flex items-center justify-center gap-x-2">
                          {
                            <DateTimeDisplay
                              dataTime={groupStageData.startTime}
                              type={"days"}
                            />
                          }{" "}
                          <span className="mt-1 text-bodyLg">Ngày</span>{" "}
                          {
                            <DateTimeDisplay
                              dataTime={groupStageData.startTime}
                              type={"hours"}
                            />
                          }{" "}
                          <span className="mt-1 text-bodyLg">Giờ</span>{" "}
                          {
                            <DateTimeDisplay
                              dataTime={groupStageData.startTime}
                              type={"minutes"}
                            />
                          }{" "}
                          <span className="mt-1 text-bodyLg">Phút</span>{" "}
                          {
                            <DateTimeDisplay
                              dataTime={groupStageData.startTime}
                              type={"seconds"}
                              onTimeOver={handleTimeOver}
                            />
                          }{" "}
                          <span className="mt-1 text-bodyLg">Giây</span>
                        </span>
                      </div>
                      {isShowMessage && (
                        <div className="text-bodyLg text-red-700 text-center">
                          Chưa đến giờ cuộc thi diễn ra, vui lòng truy cập sau
                          bạn nhé!
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="w-full border-t border-gray-300 "></div>
                <DialogFooter className="p-0 m-0 pb-3">
                  <div className="flex items-center justify-center gap-4 w-full">
                    <Button
                      outlined={true}
                      className="w-[156px] h-[48px] !rounded-[3rem] border"
                      onClick={() => {
                        setShowDialog(false);
                        setIsShowMessage(false);
                      }}
                    >
                      Quay lại
                    </Button>
                    {isGroupStageStarted && (
                      <Button
                        className="w-[156px] h-[48px] !rounded-[3rem]"
                        onClick={handleExam}
                      >
                        Vào thi
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
          </>
        )}
      </>
    )
  );
};

export default memo(GroupStageDialog);
