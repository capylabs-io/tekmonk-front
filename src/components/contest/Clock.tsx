"use client";

import { useEffect, useState } from "react";
import { CardContest } from "../common/CardContest";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Link as LinkToScroll } from "react-scroll";
import { getContestGroupStageByCandidateNumber } from "@/requests/contestEntry";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const getRelevantTime = (startTime: string, endTime: string): Date => {
  const currentTime = new Date();
  return currentTime < new Date(startTime)
    ? new Date(startTime)
    : new Date(endTime);
};

export const Clock = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const [isContestStarted, setIsContestStarted] = useState(false);
  const [isContestStart, setIsContestStart] = useState(true);
  const [contestStartTime, setContestStartTime] = useState<Date | undefined>(
    undefined
  );

  const candidateNumber = useUserStore((state) => state.candidateNumber);

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(getRelevantTime(startTime, endTime))
  );
  const [contestTimeLeft, setContestTimeLeft] = useState(
    calculateTimeLeft(contestStartTime || new Date(0))
  );
  const isConnected = useUserStore((state) => state.isConnected);

  const timeLeftComponents = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ];

  useEffect(() => {
    const fetContestGroupStage = async () => {
      if (!candidateNumber) return;
      const data = await getContestGroupStageByCandidateNumber(
        candidateNumber || ""
      );
      setContestStartTime(new Date(data.startTime));
    };

    fetContestGroupStage();
    const timer = setInterval(() => {
      const currentTime = new Date();
      if (currentTime >= new Date(startTime) && !isContestStarted) {
        setIsContestStarted(true);
      }

      const targetTime = isContestStarted ? endTime : startTime;
      setTimeLeft(calculateTimeLeft(new Date(targetTime)));
      setContestTimeLeft(calculateTimeLeft(new Date(contestStartTime || 0)));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime, isContestStarted]);

  const handleExam = () => {
    if (!contestStartTime || contestStartTime == null) {
      return;
    }
    if (new Date() < new Date(contestStartTime)) {
      setIsContestStart(false);
      return;
    }
    router.push("/lam-bai-thi");
  };

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
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger>
              <Button
                className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg"
                outlined={false}
              >
                Vào làm bài
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px] bg-white p-0"
              style={{ borderRadius: "16px" }}
            >
              <DialogHeader className="pt-6">
                <DialogTitle className="text-center text-SubheadLg text-primary-900 m-0 p-0">
                  Bảng A
                </DialogTitle>
              </DialogHeader>
              <div className="w-full border-t border-gray-300 "></div>

              <div className="flex flex-col items-center justify-center h-[110px]">
                {contestStartTime && new Date() > new Date(contestStartTime) ? (
                  <div className="text-gray-700 text-xl">
                    Cuộc thi đã bắt đầu
                  </div>
                ) : (
                  <>
                    <div className="text-bodyLg">Mở cổng thi sau</div>
                    <div className="text-gray-700">
                      <span className="text-SubheadLg text-gray-950">
                        {contestTimeLeft.days}{" "}
                        <span className="text-bodyLg">Ngày</span>{" "}
                        {contestTimeLeft.hours}{" "}
                        <span className="text-bodyLg">Giờ</span>{" "}
                        {contestTimeLeft.minutes}{" "}
                        <span className="text-bodyLg">Phút</span>{" "}
                        {contestTimeLeft.seconds}{" "}
                        <span className="text-bodyLg">Giây</span>
                      </span>
                    </div>
                    {!isContestStart && (
                      <div className="text-bodyLg text-red-700">
                        Chưa đến giờ thi!
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
                    className="w-[156px] h-[48px] rounded-[3rem] border"
                    onClick={() => {
                      setIsContestStart(true);
                      setShowDialog(false);
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button
                    className="w-[156px] h-[48px] rounded-[3rem]"
                    onClick={handleExam}
                  >
                    Vào thi
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
        {timeLeftComponents.map(({ label, value }, index) => (
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
        ))}
      </div>
    </div>
  );
};
