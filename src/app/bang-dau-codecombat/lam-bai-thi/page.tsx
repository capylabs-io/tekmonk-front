"use client";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContestGroupStage, TListCourse, TProgressResult } from "@/types/common-types";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import DateTimeDisplay from "@/components/contest/DateTimeDisplay";
import { useEffect, useState } from "react";
import { get, round, set } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOneContestEntry } from "@/requests/contestEntry";
import { createContestSubmission, getContestSubmissionByContestEntry } from "@/requests/contestSubmit";
import { useUserStore } from "@/store/UserStore";
import { getProgress } from "@/requests/code-combat";
import { CheckCircle } from "lucide-react";
import _ from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useRouter } from "next/navigation";
import GroupStageGuard from "@/components/hoc/GroupStageGuard";
type TDialogSubmit = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmid: () => void;
};

type TCourseRender = {
  slug: string;
  courseId: string;
  courseInstanceId: string;
  name: string;
}


const DialogAcceptSubmit = (data: TDialogSubmit) => {
  const handleSubmid = () => {
    data.handleSubmid();
    data.onClose();
  };
  return (
    <>
      <Dialog open={data.isOpen} onOpenChange={data.onClose}>
        <DialogContent
          className="sm:max-w-[480px] bg-white p-0"
          style={{ borderRadius: "16px" }}
        >
          <DialogHeader className="pt-6">
            <DialogTitle className="text-center text-SubheadLg text-primary-900 m-0 p-0">
              Xác nhận nộp bài
            </DialogTitle>
          </DialogHeader>
          <div className="w-full border-t border-gray-300 "></div>

          <div className="flex flex-col items-center justify-center h-[120px]">
            <div className="py-4 px-[33px]">
              <div className="text-gray-700 text-lg text-center">
                Mỗi thí sinh chỉ được nộp bài một lần duy nhất. Bạn không thể
                chỉnh sửa sau khi đã nộp bài. Bạn đã chắc chắn muốn nộp bài thi
                chưa?
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-300 "></div>
          <DialogFooter className="p-0 m-0 pb-3">
            <div className="flex items-center justify-center gap-4 w-full">
              <Button
                outlined={true}
                className="w-[156px] h-[48px] !rounded-[3rem] border"
                onClick={data.onClose}
              >
                Quay lại
              </Button>
              <Button className="w-[156px] h-[48px] !rounded-[3rem]" onClick={handleSubmid}>
                Nộp bài
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const GroupStageCodeCombat = ({
  contestGroupStage,
  isSubmitted: isSubmitted,
}: {
  contestGroupStage: ContestGroupStage;
  isSubmitted: boolean;
}) => {
  const router = useRouter();
  //use state
  const [timeOver, setTimeOver] = useState(false);
  const [groupStageTimeLeft, setGroupStageTimeLeft] = useState<string>(
    contestGroupStage.endTime
  );
  const candidateNumber = useUserStore((state) => state.candidateNumber);
  const codeCombatId = useUserStore((state) => state.codeCombatId);

  const [progress, setProgress] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [diaLogOpen, setDialogOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<TProgressResult[]>([]);
  const [listSlugs, setListSlugs] = useState<TCourseRender[]>([]);
  const [reloadProgress, setReloadProgress] = useState(false);

  //use store
  const fullNameUser = useUserStore((state) => state.userInfo?.fullName);
  const [success, error, warn] = useSnackbarStore((state) => [
    state.success,
    state.error,
    state.warn,
  ]);
  
  //handle function
  const isExistContestSubmission = async () => {
    if(!candidateNumber) return false;
    const contestEntry = await getOneContestEntry(
      candidateNumber
    )
    const contestSubmission = await getContestSubmissionByContestEntry(
      contestEntry.id
    )
    return contestSubmission.data.length > 0
  }
  const handleAutoSubmit = async () => {
    try {
      //check if user already submitted => return
      useLoadingStore.getState().show()
      if(await isExistContestSubmission() || isSubmitted) {
        warn("Lỗi", "Bạn đã nộp bài rồi");
        return;
      }
      //check if contestGroupStage is not D1 or D2 => auto submit
      const firstChar = candidateNumber?.charAt(0);
      if (firstChar != "D") {
        const contestEntry = await getOneContestEntry(
          useUserStore.getState().candidateNumber || ""
        );
        const contestResult = {
          title: fullNameUser || "",
          tags: { data: ["codecombat"] },
          contest_entry: contestEntry.id,
          classIndex: get(contestGroupStage, "id", ""),
          memberId: codeCombatId || "",
          data: null,
        };
        await createContestSubmission(contestResult);
        success("xong", "Nộp bài thành công");
        useUserStore.setState({ isSubmitted: true })
        router.push(`/bang-dau-codecombat/nop-bai-thanh-cong`);
      }
      return;
    } catch (err) {
      //console.error(err);
      error("Lỗi", "Nộp bài không thành công");
      return;
    } finally {
      useLoadingStore.getState().hide()
    }
  };
  const handleGetProgress = async () => {
    try {
      const firstChar = candidateNumber?.charAt(0);
      if(firstChar == "D") return;
      if (!codeCombatId) return;
      const res: any = await getProgress(
        codeCombatId,
        Number(get(contestGroupStage, "id", 0))
      );
      
      if (res) {
        setCurrentResult(res);
        setReloadProgress(!reloadProgress);
      }
    } catch (error) {
      return;
    }
  };
  const handleTimeOver = (validCountDown: boolean) => {
    setTimeOver(true);
    if (!isSubmitted && validCountDown) {
      handleAutoSubmit();
    }
  };
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
      //console.error(err);
      return;
    }
  };

  const handleRenderSlugs = (listCourse: TListCourse[]): TCourseRender[] => {
    return listCourse.flatMap((item) =>
      item.slugs.map((slug) => ({
        slug,
        courseId: item.courseId,
        courseInstanceId: item.courseInstanceId,
        name: item.name,
      }))
    );
  };
  const handleRedirectToCodeCombat = (data: TCourseRender) => {
    const url = `https://codecombat.com/play/level/${data.slug}?course=${data.courseId}&course-instance=${data.courseInstanceId}`;
    window.open(url, "_blank");
  }

  //use effect
  useEffect(() => {
    setGroupStageTimeLeft(contestGroupStage.endTime);
    if (contestGroupStage.listCourses) {
      setListSlugs(handleRenderSlugs(contestGroupStage.listCourses));
    }
    handleGetProgress();
  },[]);

  useEffect(() => {
    let total = 0;
    let current = 0;
    currentResult && currentResult.forEach((item: TProgressResult) => {
      total += item.totalLevel;
      current += item.currentLevel;
    });
    setTotalProgress(total);
    setProgress(current);
  }, [currentResult]);

  useEffect(() => {
    // if (!isSubmitted && !timeOver) {
      const interval = setInterval(() => {
        handleGetProgress();
      }, 10000);

      return () => clearInterval(interval);
    // }
  }, [isSubmitted, timeOver]);
  return (
    <div className="max-w-3xl mx-auto border border-gray-300 rounded-xl space-y-6 bg-white mt-3 mb-3">
      <div className={``}>
        <div className={`w-full flex item-center justify-between px-8 py-3`}>
          <Button
            outlined={true}
            className={`border border-gray-300 !rounded-[3rem] w-[120px] h-[44px]`}
            onClick={() => router.back()}
          >
            Quay lại
          </Button>
          {!isSubmitted ? (
            <Button
              className={`!rounded-[3rem] w-[120px] h-[44px]`}
              onClick={() => setDialogOpen(true)}
            >
              Nộp bài
            </Button>
          ) : (
            <Button className={`!rounded-[3rem] w-[170px] h-[44px]`}
            onClick={handleRedirectToMyContest}>
              Bài dự thi của tôi
            </Button>
          )}
          <DialogAcceptSubmit
            isOpen={diaLogOpen}
            onClose={() => setDialogOpen(false)}
            handleSubmid={handleAutoSubmit}
          />
        </div>
        <div className={`border w-full border-gray-300`}></div>
        <div className="space-y-2 block">
          <div className="flex justify-between items-center h-[48px] px-8">
            <div className="text-SubheadLg text-primary-900">
              BẢNG {contestGroupStage.code}
            </div>
            <div className="text-SubheadLg text-primary-900">
              {!timeOver
                ? contestGroupStage.endTime && (
                    <>
                      <DateTimeDisplay
                        dataTime={groupStageTimeLeft}
                        type="days"
                      />
                      <span>:</span>
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
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-primary-700 font-semibold max-md:hidden">Tiến độ</div>
            <Progress
              value={round((progress / (totalProgress != 0 ? totalProgress : 1)) * 100, 1)}
              className="h-3 bg-gray-100 w-3/4"
            />
            <div className="text-primary-700 font-semibold">{progress}/{totalProgress != 0 ? totalProgress : 1}</div>
          </div>
        </div>
      </div>
                  <div className={`border border-gray-300 w-full`}></div>
      <Card className="px-6 border-none">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {Array.isArray(listSlugs)&&listSlugs.map((item:TCourseRender, index:number) => {
              //handle function check if slug is match with current slug
              let isCompleted = false;
              for (const result of currentResult) {
                for (const slug of result.listSlug) {
                  if (slug === item.slug) {
                    isCompleted = true;
                    break;
                  }
                }
                if(isCompleted) break;
              }
              return (
                <Button
                  key={index}
                  outlined={true}
                  className={`h-12 border font-bold text-lg
                    
                     `}
                  onClick={() => handleRedirectToCodeCombat(item)}
                  disabled={isCompleted || isSubmitted}
                >
                  <div className={`flex items-center gap-x-3`}>
                    {isCompleted && <CheckCircle className="text-primary-900" />}
                    {!isCompleted && index + 1}
                  </div>
                </Button>
              )
            })}
          </div>

          <div className="mt-6 space-y-4 text-base text-gray-600 font-semibold">
            <p>Thí sinh nhấn vào từng thứ tự để làm bài.</p>
            <p>
              Thí sinh đã được điền trước trong CodeCombat trong một tab mới.
            </p>
            <p>Thí sinh làm bài trong tab này.</p>
            <p>
              Khi làm xong 1 thử thách, thí sinh nhấn nút Done, đóng tab
              CodeCombat, sau đó quay trở lại trang đề thi để tiếp tục.
            </p>
            <p>Tiến độ làm bài sẽ được cập nhật mỗi 01 phút.</p>
            <p>Khi hoàn thành hết các thử thách, thí sinh nhấn nút Nộp bài.</p>
            <p>Bài thi sẽ tự động nộp khi hết thời gian.</p>
            <p>
              Xem hướng dẫn chi tiết{" "}
              <Link
                href="#"
                target="_blank"
                className="text-primary-950 underline"
              >
                tại đây
              </Link>
              .
            </p>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default GroupStageGuard(GroupStageCodeCombat);
