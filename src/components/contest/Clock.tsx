"use client"

import { useEffect, useRef, useState } from "react";
import { CardContest } from "../common/CardContest"

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const calculateTimeLeft = (endDate: Date): TimeLeft => {
    const difference = +endDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
        return timeLeft;
    }

    return timeLeft;
};
export default function Clock() {
    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft(new Date("2024-12-31"))
    ); // Set your end date here
    const ref = useRef<HTMLDivElement>(null);
    const timeLeftComponents = [
        { label: "NGÀY", value: timeLeft.days },
        { label: "GIỜ", value: timeLeft.hours },
        { label: "PHÚT", value: timeLeft.minutes },
        { label: "GIÂY", value: timeLeft.seconds },
    ];
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(new Date("2024-12-31")));
        }, 1000);

        return () => clearTimeout(timer);
    });
    return (
        <div className=" text-center mb-12">
            <div className="mt-[52px] text-2xl font-bold text-gray-600 
            
                max-[545px]:text-xl max-[845px]:text-xl
            ">
                Cuộc thi kết thúc sau:
            </div>
            <div className="mt-[26px] flex justify-center space-x-4">
                {timeLeftComponents.map(({ label, value }, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <CardContest className="w-[200px] h-[200px] 
                        max-[865px]:w-[120px] max-[865px]:h-[120px]
                        max-[545px]:w-[80px] max-[845px]:h-[80px]
                         flex flex-col items-center justify-center relative shadow-custom-gray bg-white">
                            <div className=" text-SubheadXl max-[865px]:text-sm max-[865px]:font-bold text-gray-500">
                                {label}
                            </div>
                            <div className=" text-primary-700 font-dela max-[865px]:text-4xl text-7xl">
                                {value !== undefined
                                    ? value.toString().padStart(2, "0")
                                    : "00"}
                            </div>
                        </CardContest>
                    </div>
                ))}
            </div>
        </div>
    )
}