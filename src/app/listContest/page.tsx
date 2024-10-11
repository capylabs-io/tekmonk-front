"use client";

import CardContestItem from "@/components/contest/CardContestItem";
import Image from "next/image";
import contestListMock from "@/mock/contestList-mock.json";
import { useEffect, useState } from "react";
import tekdojoAxios from "@/requests/axios.config";
import { getContest } from "@/requests/contest";
import { Contest } from "@/types/common-types";

const ContestList: React.FC = () => {
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  const [contestList, setContestList] = useState([]);


  useEffect(() => {
    const fetchContestList = async () => {
      try {
        const submitContestList = await getContest();
        setContestList(submitContestList.data);
      } catch (error) {
        console.error("Failed to fetch contest list:", error);
      }
    };

    fetchContestList();
  }, []);

  return (
    <>
      <h1 className="text-primary-900 text-SubheadLg py-5 px-8 w-full">
        Danh sách các cuộc thi
      </h1>
      <Image
        src="/image/contest/tienphongbanner.png"
        alt="Banner contest"
        width={1440}
        height={480}
        priority
        quality={100}
      />
      <div className="px-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {contestList.map((contest: Contest, index) => (
          <CardContestItem
            id={contest.id}
            key={index}
            title={contest.name}
            status={new Date(contest.endTime) > new Date() && new Date(contest.startTime) < new Date() ? true : false}
            thumbnail={contest.thumbnail?.url}
            endDate={new Date(contest.endTime).toUTCString()}
            startDate={new Date(contest.startTime).toUTCString()}
          />
        ))}
      </div>
    </>
  );
};

export default ContestList;
