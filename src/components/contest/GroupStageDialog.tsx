"use client";
import { get, set } from "lodash";
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
import { Input } from "../common/Input";

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
  const [isShowMessage, setIsShowMessage] = useState(false)  
  const [isClient, setIsClient] = useState(false);

  //arrow function
  const handleTimeOver = () => {
    setIsGroupStageStarted(true);
  };

  const handleExam = () => {
    if (!isGroupStageStarted) {
      setIsShowMessage(true);
    } else {
      if (router) {
        router.push(`/lam-bai-thi`);
      }
    }
  };



  useEffect(() => {
    // Check if the group stage has already started
    const hasStarted = new Date(groupStageData.startTime) <= new Date();
    setIsGroupStageStarted(hasStarted);
    
    setIsClient(true);
  }, [groupStageData.startTime]);
  return (
    isClient && (
      <>
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
                    Cuộc thi đã bắt đầu !
                  </div>
                  {/* <div className="max-h-12 max-w-[372px] mx-auto mb-4">
                    <Input
                      type="text"
                      customClassNames="h-full text-bodyLg"
                      placeholder="Mã tham dự"
                      onChange={handleCodeCombatId}
                    />
                  </div> */}
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
                      Chưa đến giờ cuộc thi diễn ra, vui lòng truy cập sau bạn
                      nhé!
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
                {isGroupStageStarted &&                 <Button
                  className="w-[156px] h-[48px] !rounded-[3rem]"
                  onClick={handleExam}
                >
                  Vào thi
                </Button>}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  );
};

export default memo(GroupStageDialog);
