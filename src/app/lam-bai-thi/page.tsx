"use client";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import FormSubmitContest from "@/components/contest/FormSubmitContest";
import { useRouter } from "next/navigation";
import GroupStageGuard from "@/components/hoc/GroupStageGuard";
import { ContestGroupStage } from "@/types/common-types";
import DateTimeDisplay from "@/components/contest/DateTimeDisplay";
import { getOneContestEntry } from "@/requests/contestEntry";
import { useUserStore } from "@/store/UserStore";
import { getContestSubmissionByContestEntry } from "@/requests/contestSubmit";

const ContestGroupStageEntry = ({
  contestGroupStage,
  isSubmitted: isSubmitted,
}: {
  contestGroupStage: ContestGroupStage;
  isSubmitted: boolean;
}) => {
  const router = useRouter();
  console.log("contest start");
  //use state
  const [timeOver, setTimeOver] = useState(false);
  const [groupStageTimeLeft, setGroupStageTimeLeft] = useState<string>(
    contestGroupStage.endTime
  );
  const [isClient, setIsClient] = useState(false);

  //
  const candidateNumber = useUserStore((state) => state.candidateNumber);

  const handleTimeOver = () => {
    setTimeOver(true);
  };

  //function handler
  const handleRedirectToMyContest = async () => {
    try {
      if (!candidateNumber) return;
      const contestEntry = await getOneContestEntry(candidateNumber);
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
    setIsClient(true);
    //check if start time is less than current time
    if (new Date(contestGroupStage.startTime) > new Date()) {
      router.push("/");
    }
    setGroupStageTimeLeft(contestGroupStage.endTime);
  }, []);

  return (
    isClient && (
      <div className="min-h-screen max-w-[768px] mx-auto bg-white mb-10">
        <Card className="max-w-4xl mx-auto p-0">
          <CardContent className="p-0">
            <div className="">
              <div className="flex justify-between items-center h-[64px] px-8 py-5">
                <Button
                  outlined={true}
                  style={{ borderRadius: "4rem" }}
                  className="w-[110px] h-[40px] rounded-[3rem] border"
                  onClick={() => router.push("/")}
                >
                  Quay lại
                </Button>
                {isSubmitted ? (
                  <Button
                    style={{ borderRadius: "4rem" }}
                    className=" h-[40px] rounded-[3rem]"
                    onClick={handleRedirectToMyContest}
                  >
                    Bài dự thi của tôi
                  </Button>
                ) : (
                  <FormSubmitContest>
                    <Button
                      style={{ borderRadius: "4rem" }}
                      className="w-[110px] h-[40px] rounded-[3rem]"
                      disabled={timeOver || isSubmitted}
                    >
                      Nộp bài
                    </Button>
                  </FormSubmitContest>
                )}
              </div>
              <div className="w-full border-t border-gray-300 "></div>
              <div className="flex justify-between items-center h-[64px] px-8 py-5">
                <div className="text-SubheadLg text-primary-900">
                  BẢNG {contestGroupStage.code}
                </div>
                <div className="text-SubheadLg text-primary-900">
                  {!timeOver
                    ? contestGroupStage.endTime && (
                        <>
                          <DateTimeDisplay
                            dataTime={groupStageTimeLeft}
                            type="hours"
                          />
                          <span>:</span>
                          <DateTimeDisplay
                            dataTime={groupStageTimeLeft}
                            type="minutes"
                          />
                          <span>:</span>
                          <DateTimeDisplay
                            dataTime={groupStageTimeLeft}
                            type="seconds"
                            onTimeOver={handleTimeOver}
                          />
                        </>
                      )
                    : "Hết giờ"}
                  {/* {formatTime(timeLeft)} */}
                </div>
              </div>
                      <div className="flex justify-between items-center h-[64px] px-8 py-5">
                        <div></div>
                        <div></div>
                        <div></div>
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
    )
  );
};
export default GroupStageGuard(ContestGroupStageEntry);
