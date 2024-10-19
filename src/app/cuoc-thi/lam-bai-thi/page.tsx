"use client";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import FormSubmitContest from "@/components/contest/FormSubmitContest";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";

export default function ContestEntry() {
  const router = useRouter();
  const getContestGroupStage = useUserStore((state) => state.getContestGroupStage);
  const [timeOut, setTimeOut] = useState(false);
  
  
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
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(getContestGroupStage()?.endTime || 0))
  ); // 30 minutes in seconds

  useEffect(() => {
    //handle fetch data contest group stage here


    const timer = setInterval(() => {
      
      setTimeLeft((prevTime) => {
        const newTime = { ...prevTime };
        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else if (newTime.minutes > 0) {
          newTime.minutes -= 1;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours -= 1;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else if (newTime.days > 0) {
          newTime.days -= 1;
          newTime.hours = 23;
          newTime.minutes = 59;
          newTime.seconds = 59;
        }
        if(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
          setTimeOut(true);
        }
        return newTime;
      });
    }, 1000);
    console.log("timeLeft", timeLeft);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeLeft: TimeLeft) => {
      const { days, hours, minutes, seconds } = timeLeft;
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

  return (
    <div className="min-h-screen max-w-[768px] mx-auto">
      <Card className="max-w-4xl mx-auto p-0">
        <CardContent className="p-0">
          <div className="">
              <div className="flex justify-between items-center h-[64px] px-8 y-5">
                <div className="text-SubheadLg text-primary-900">BẢNG {getContestGroupStage()?.code}</div>
                <div className="text-SubheadLg text-primary-900">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="w-full border-t border-gray-300 "></div>
              <div className="flex justify-between items-center h-[64px] px-8 py-5">
                <Button
                  outlined={true}
                  style={{ borderRadius: "4rem" }}
                  className="w-[110px] h-[40px] rounded-[3rem] border"
                  onClick={() => router.push("/cuoc-thi")}
                >
                  Quay lại
                </Button>
                <FormSubmitContest >
                  <Button
                  style={{ borderRadius: "4rem" }}
                  className="w-[110px] h-[40px] rounded-[3rem]"
                  disabled={timeOut}
                >
                  Nộp bài
                </Button>
                </FormSubmitContest>
                
              </div>
            <div
              className="bg-white overflow-hidden"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <iframe
                src="/placeholder.pdf"
                className="w-full h-full"
                title="Exam PDF"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
