"use client";

import CardContestItem from "@/components/contest/CardContestItem";
import Image from "next/image";
import contestListMock from "@/mock/contestList-mock.json";
import { useEffect, useState } from "react";
import tekdojoAxios from "@/requests/axios.config";

const ContestList: React.FC = () => {
  const [page, setPage] = useState();


  useEffect(() => {
    const submitContestList = tekdojoAxios.get("/api/contest-submissions")

    console.log(submitContestList);
  }, [])

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
        {/* !todo: create type contest and pass in this, not pass each value of this */}
        {contestListMock.map((contest, index) => (
          <CardContestItem
            id={contest.id}
            key={index}
            title={contest.title}
            status={contest.status}
            thumbnail={contest.thumbnail}
            endDate={contest.endDate}
            startDate={contest.startDate}
          />
        ))}
      </div>
    </>
  );
};

export default ContestList;
