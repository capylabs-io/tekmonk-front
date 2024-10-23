"use client";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import FormSubmitContest from "@/components/contest/FormSubmitContest";
import { useRouter } from "next/navigation";
import GroupStageGuard from "@/components/hoc/GroupStageGuard";
import { ContestGroupStage } from "@/types/common-types";
import DateTimeDisplay from "@/components/contest/DateTimeDisplay";


const ContestGroupStageEntry = ({ contestGroupStage }: { contestGroupStage: ContestGroupStage}) => {
  const router = useRouter();
  console.log("contest start")
  const [timeOver, setTimeOver] = useState(false);
  const [groupStageTimeLeft, setGroupStageTimeLeft] = useState<string>(contestGroupStage.endTime);

  const handleTimeOver = () => {
    setTimeOver(true);
  }

  useEffect(() => {
    //check if start time is less than current time
    if(new Date(contestGroupStage.startTime) > new Date()) {
      router.push("/");
    }
    setGroupStageTimeLeft(contestGroupStage.endTime);
  }, []);


  return (
    <div className="min-h-screen max-w-[768px] mx-auto bg-white mb-10">
      <Card className="max-w-4xl mx-auto p-0">
        <CardContent className="p-0">
          <div className="">
            <div className="flex justify-between items-center h-[64px] px-8 py-5">
              <div className="text-SubheadLg text-primary-900">
                BẢNG {contestGroupStage.code}
              </div>
              <div className="text-SubheadLg text-primary-900">
                {/* {formatTime(timeLeft)} */}
                <DateTimeDisplay dataTime={groupStageTimeLeft} type="hours"/><span>:</span>
                <DateTimeDisplay dataTime={groupStageTimeLeft} type="minutes"/><span>:</span>
                <DateTimeDisplay dataTime={groupStageTimeLeft} type="seconds" onTimeOver={handleTimeOver}/>
              </div>
            </div>
            <div className="w-full border-t border-gray-300 "></div>
            <div className="flex justify-between items-center h-[64px] px-8 py-5">
              <Button
                outlined={true}
                style={{ borderRadius: "4rem" }}
                className="w-[110px] h-[40px] rounded-[3rem] border"
                onClick={() => router.push("/")}
              >
                Quay lại
              </Button>
              <FormSubmitContest>
                <Button
                  style={{ borderRadius: "4rem" }}
                  className="w-[110px] h-[40px] rounded-[3rem]"
                  disabled={timeOver}
                >
                  Nộp bài
                </Button>
              </FormSubmitContest>
            </div>
            <div
              className="bg-white overflow-hidden"
              style={{ height: "calc(100vh - 50px)" }}
            >
              <iframe
                src={
                  contestGroupStage?.contestEntryFile?.[0].url
                    ? contestGroupStage?.contestEntryFile?.[0].url
                    : "/pdf-test.pdf"
                }
                className="w-full h-full"
                title="Exam PDF"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default GroupStageGuard(ContestGroupStageEntry);
