"use client";

import { Button } from "@/components/common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Clock9, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/store/UserStore";
import { getProgress } from "@/requests/code-combat";
import { get } from "lodash";
import { useEffect, useState } from "react";
import GroupStageGuard from "@/components/hoc/GroupStageGuard";
import { ContestGroupStage, TListCourse } from "@/types/common-types";



const data = [
  { id: 1, sentence: "Câu 1", status: "Xong", time: "30s" },
  { id: 2, sentence: "Câu 2", status: "Xong", time: "45s" },
  { id: 3, sentence: "Câu 3", status: "Xong", time: "50s" },
  { id: 4, sentence: "Câu 4", status: "Xong", time: "50s" },
  { id: 5, sentence: "Câu 5", status: "Xong", time: "50s" },
  { id: 6, sentence: "Câu 6", status: "Xong", time: "50s" },
  { id: 7, sentence: "Câu 7", status: "Xong", time: "50s" },
  { id: 8, sentence: "Câu 8", status: "Xong", time: "50s" },
  { id: 9, sentence: "Câu 9", status: "Xong", time: "50s" },
  { id: 10, sentence: "Câu 10", status: "Xong", time: "50s" },
  { id: 11, sentence: "Câu 11", status: "Xong", time: "50s" },
  { id: 12, sentence: "Câu 12", status: "Xong", time: "50s" },
  { id: 13, sentence: "Câu 13", status: "Xong", time: "50s" },
  { id: 14, sentence: "Câu 14", status: "Xong", time: "50s" },
];

type TResultCodeCombat = {
  slug: string;
  courseId: string;
  courseInstanceId: string;
  name: string;
}

const TableResult = ({data} : {data: any}) => {
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
        {data.map((row: any, index:number) => (
        <TableRow key={row.id}>
          <TableCell className="font-medium text-left">Câu {index + 1}</TableCell>
          <TableCell className="text-left">
            Xong
          </TableCell>
          <TableCell className="hidden md:table-cell text-left">
            30s
          </TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


const NopBaiThanhCong = ({
  contestGroupStage,
  isSubmitted: isSubmitted,
}: {
  contestGroupStage: ContestGroupStage;
  isSubmitted: boolean;
}) => {
  const router = useRouter();
  const candidateNumber = useUserStore((state) => state.candidateNumber);
  const codeCombatId = useUserStore((state) => state.codeCombatId);
  const [listSlugs, setListSlugs] = useState<TResultCodeCombat[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleRenderSlugs = (listCourse: TListCourse[]): TResultCodeCombat[] => {
      return listCourse.flatMap((item) =>
        item.slugs.map((slug) => ({
          slug,
          courseId: item.courseId,
          courseInstanceId: item.courseInstanceId,
          name: item.name,
        }))
      );
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
          setResult(res);
        }
      } catch (error) {
        return;
      }
    };

  useEffect(() => {
    handleGetProgress();
    if (contestGroupStage.listCourses) {
      setListSlugs(handleRenderSlugs(contestGroupStage.listCourses));
    }
  },[])
  listSlugs && console.log(listSlugs);
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
                <div>20</div>
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
                <div>10</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Clock9 />
                <div>3000 s</div>
              </div>
            </div>
            <TableResult data={listSlugs}/>
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
export default GroupStageGuard(NopBaiThanhCong);