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
import { getProgress } from "@/requests/code-combat";
import { get } from "lodash";
import { getContestGroupStageByCandidateNumber, getOneContestEntry } from "@/requests/contestEntry";
import { useUserStore } from "@/store/UserStore";
import { ContestGroupStage, TListCourse } from "@/types/common-types";


export type TTimeContest = {
  startTime: string;
  endTime: string;
}

export type TResultCodeCombatFinal = {
    slug: string;
    playtime: number;
    isCompleted: boolean;
}

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


export default function NopBaiThanhCong() {
  const router = useRouter();
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  const [totalNotCompleted, setTotalNotCompleted] = useState<number>(0);

  const [progress, setProgress] = useState<any>();
      const [listCourse, setListCourse] = useState<TListCourse[]>();
      const [result, setResult] = useState<TResultCodeCombatFinal[]>();
      const [timeContest, setTimeContest] = useState<TTimeContest>();
      //use state
      
      //
      const [contestGroupStage, setContestGroupStage] =
        useState<ContestGroupStage | null>(null);
  
      //use store
      const candidateNumber = useUserStore((state) => state.candidateNumber);
      const codeCombatId = useUserStore((state) => state.codeCombatId);
  
      const fetchContestGroupStage = async () => {
        if (!candidateNumber) {
          router.push("/");
          return;
        }
        try {
          const data = await getContestGroupStageByCandidateNumber(
            candidateNumber
          );
          data && setContestGroupStage(data);
          data && setListCourse(data.listCourses);
        } catch (error) {
          return;
        }
      };
  
      const handleGetProgress = async () => {
          try {
            const firstChar = candidateNumber?.charAt(0);
            if(firstChar == "D") return;
            if (!codeCombatId) return;
            const res: any = await getProgress(
              codeCombatId,
              Number(get(contestGroupStage, "id", 6))
            );
            
            if (res) {
              setProgress(res);
            }
          } catch (error) {
            return;
          }
      };
  
      function transformData(progress: any[], listcourse: any[]): TResultCodeCombatFinal[] {
          const result: TResultCodeCombatFinal[] = [];
        
          for (const course of listcourse) {
            // Tìm thông tin progress tương ứng với course hiện tại
            const courseProgress = progress.find(
              (p) => p.courseId === course.courseId && p.courseInstanceId === course.courseInstanceId
            );
        
            // Tạo một Map từ listSlug của progress để dễ dàng tra cứu playtime
            const playtimeMap = new Map<string, number>(
              courseProgress?.listSlug.map((slugObj: { name: string; playtime: number }) => [
                slugObj.name,
                slugObj.playtime,
              ])
            );
        
            // Lấy currentLevel từ progress để đánh dấu các slug đã hoàn thành
            const currentLevel = courseProgress?.currentLevel || 0;
        
            for (let i = 0; i < course.slugs.length; i++) {
              const slug = course.slugs[i];
              const playtime = playtimeMap.get(slug) || 0;
              const isCompleted = i < currentLevel;
        
              result.push({
                slug,
                playtime,
                isCompleted,
              });
            }
          }
        
          return result;
      }
  
      const handleGetContestEntry = async () => {
        try {
          if(!candidateNumber) return;
          const contestEntry = await getOneContestEntry(candidateNumber);
          if(contestEntry) {
            return contestEntry;
          }
        } catch (error) {
          console.error(error);
        }
      }
      const handleGetTimeResultContest = async () => {
        try {
          const data = await handleGetContestEntry();
            const startTime = new Date(get(data, "startTime", localStorage.getItem('startTime')?.toString() || "")).toLocaleString();
            const endTime = new Date(get(data, "endTime", "")).toLocaleString();
            setTimeContest({
            startTime,
            endTime
            });
        } catch (error) {
          console.error(error);
        }
      }
      const fetAllData = async () => {
        await fetchContestGroupStage();
        await handleGetProgress();
        await handleGetTimeResultContest();
      }
      
      useEffect(() => {
        fetAllData();
      }, [candidateNumber]);

      useEffect(() => {
        if (listCourse && progress) {
            const transformedResult = transformData(progress, listCourse);
            setResult(transformedResult);
        }
      }, [listCourse, progress]);

  useEffect(() => {
    if(!result) return;
    const totalTime = result.reduce((acc, curr) => {
      return acc + curr.playtime;
    }, 0);
    setTotalTime(totalTime);
    const totalCompleted = result.filter((item) => item.isCompleted).length;
    setTotalCompleted(totalCompleted);
    const totalNotCompleted = result.filter((item) => !item.isCompleted).length;
    setTotalNotCompleted(totalNotCompleted);
  },[result])
  return result && (
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
            <div className="flex">
              <div>Thời gian bắt đầu làm bài: </div>
              <div className="font-bold">{timeContest?.startTime}</div>
            </div>
            <TableResult data={result}/>
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