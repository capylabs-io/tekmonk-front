"use client"

import { useEffect, useState } from "react";
import { CardContest } from "../common/CardContest";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import FormSubmitContest from "./FormSubmitContest";

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
    return currentTime < new Date(startTime) ? new Date(startTime) : new Date(endTime);
}

export const Clock = ({ startTime, endTime }: { startTime: string; endTime: string; }) => {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft(getRelevantTime(startTime, endTime))
    );
    const [isContestStarted, setIsContestStarted] = useState(false);
    const isConnected = useUserStore((state) => state.isConnected);

    const timeLeftComponents = [
        { label: "NGÀY", value: timeLeft.days },
        { label: "GIỜ", value: timeLeft.hours },
        { label: "PHÚT", value: timeLeft.minutes },
        { label: "GIÂY", value: timeLeft.seconds },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= new Date(startTime) && !isContestStarted) {
                setIsContestStarted(true);
            }

            const targetTime = isContestStarted ? endTime : startTime;
            setTimeLeft(calculateTimeLeft(new Date(targetTime)));
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime, endTime, isContestStarted]);

    const isRegisterDisabled = new Date() > new Date(endTime);
    return (
        <div className="text-center mb-12">
            <div className="mt-[52px] max-[640px]:flex-col flex items-center justify-center gap-4">
                {!isConnected() ? <>
                
                    <Button
                    className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg"
                    outlined={false}
                    style={{ borderRadius: "4rem" }}
                    onClick={() => router.push("register-contest")}
                    disabled={isRegisterDisabled} // Vô hiệu hóa nút nếu cần
                >
                    Đăng ký
                </Button>
                </> : <>
                <FormSubmitContest >
                    <Button
                    className="w-[312px] h-[52px] max-[460px]:w-[280px] rounded-[4rem] shadow-custom-primary text-SubheadLg"
                    outlined={false}
                    style={{ borderRadius: "4rem" }}
                    // disabled={true} // Vô hiệu hóa nút nếu cần
                    >Nộp bài</Button>
                </FormSubmitContest>
                </>}
                
                <Button
                    className="w-[312px] h-[52px] max-[460px]:w-[280px] border border-gray-200 shadow-custom-gray text-SubheadLg"
                    outlined={true}
                    style={{ borderRadius: "4rem" }}
		    //disabled={isConnected()}
		    disabled={true}
                >
                    Tổng hợp bài dự thi
                </Button>
            </div>
            <div className="mt-[52px] text-2xl font-bold text-gray-600 max-[545px]:text-xl max-[845px]:text-xl">
                {isContestStarted ? "Cuộc thi sẽ kết thúc sau:" : "Cuộc thi bắt đầu sau:"}
            </div>
            <div className="mt-[26px] flex justify-center gap-4">
                {timeLeftComponents.map(({ label, value }, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <CardContest className=" w-[200px] h-[168px] flex flex-col items-center justify-center border border-gray-200 relative shadow-custom-gray bg-white
                        max-[865px]:w-[120px] max-[865px]:h-[120px] 
                        max-[545px]:w-[80px] max-[545px]:h-[80px] ">
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
}
