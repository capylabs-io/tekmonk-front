"use client";

import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock9, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import ShowResultGuard, { TResultCodeCombatFinal } from "@/components/hoc/ShowResultGuard";


const TableResult = ({data} : {data: TResultCodeCombatFinal[]}) => {
  return (
    <div className="container mx-auto py-10 mt-3 overflow-x-auto h-[400px]">
      <Table>
      <TableHeader>
        <TableRow>
        <TableHead className="w-[50%] text-left">Câu</TableHead>
        <TableHead className="w-[25%] text-left">Trạng thái</TableHead>
        <TableHead className="w-[25%] text-left">Thời gian</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index:number) => (
        <TableRow key={index}>
          <TableCell className="font-medium text-left">Câu {index + 1}</TableCell>
          <TableCell className="text-left">
            {row.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
          </TableCell>
          <TableCell className="md:table-cell text-left">
            {row.isCompleted ? row.playtime : "--"}
          </TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


const NopBaiThanhCong = ({
  resultData,
}: { resultData: TResultCodeCombatFinal[] }) => {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  const [totalNotCompleted, setTotalNotCompleted] = useState<number>(0);

  useEffect(() => {
    const totalTime = resultData.reduce((acc, curr) => {
      return acc + curr.playtime;
    }, 0);
    setTotalTime(totalTime);
    const totalCompleted = resultData.filter((item) => item.isCompleted).length;
    setTotalCompleted(totalCompleted);
    const totalNotCompleted = resultData.filter((item) => !item.isCompleted).length;
    setTotalNotCompleted(totalNotCompleted);
  })
  return (
    <>
      <div className="min-h-screen w-full max-md:p-2">
        <div className="md:w-[720px] min-h-[calc(100vh-200px)] bg-white border border-gray-300 rounded-2xl mx-auto flex flex-col justify-between">
          <div className="w-full border-b border-b-gray-300 h-16 text-SubheadLg text-primary-900 px-8 pt-5">
            Nộp bài thành công
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="text-xl text-[rgb(42,43,43)]">
              Chúc mừng bạn đã hoàn thành bài thi với thành tích:
            </div>
            <div className="mt-5 w-[90%] h-[80px] border border-gray-300 rounded-lg grid grid-cols-3">
              <div className="flex flex-col items-center justify-center">
                <CheckCircle className="text-primary-900" />
                <div>{totalCompleted}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-circle-x"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                <div>{totalNotCompleted}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Clock9 />
                <div>{totalTime} s</div>
              </div>
            </div>
            <TableResult data={resultData}/>
          </div>
          <div className="w-full h-16 border-t border-gray-300 flex justify-between items-center px-14 max-tabletHeader:px-8 max-mobile:px-1">
            <Button
              outlined={true}
              className="border border-gray-300 h-10 !rounded-[3rem] max-tabletHeader:p-1"
              onClick={() => router.push("/")}
            >
              Quay lại trang chủ
            </Button>
            <Button
              className="border border-gray-300 h-10 !rounded-[3rem] max-tabletHeader:p-1"
              onClick={() => router.push("/")}
            >
              Thể lệ cuộc thi
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowResultGuard(NopBaiThanhCong);