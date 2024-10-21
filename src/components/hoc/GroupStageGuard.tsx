"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { getContestGroupStageByCandidateNumber } from "@/requests/contestEntry";
import { ContestGroupStage } from "@/types/common-types";

interface WrappedComponentProps {
  contestGroupStage: ContestGroupStage;
}

const GroupStageGuard = (WrappedComponent: React.FC<WrappedComponentProps>) => {
  const Comp: React.FC = (props) => {
    const router = useRouter();
    const [contestGroupStage, setContestGroupStage] =
      useState<ContestGroupStage | null>(null);
    const candidateNumber = useUserStore((state) => state.candidateNumber);

    useEffect(() => {
      const fetchContestGroupStage = async () => {
        if (!candidateNumber) {
          router.push("/");
          return;
        }
        try {
          const data = await getContestGroupStageByCandidateNumber(
            candidateNumber
          );
          console.log("res = ", data);
          setContestGroupStage(data);
        } catch (error) {
          return;
        }
      };
      fetchContestGroupStage();
    }, [candidateNumber]);

    if (contestGroupStage === null) {
      return <div>Loading...</div>; // or any loading indicator
    }
    if (contestGroupStage.startTime > new Date().toISOString()) {
      router.push("/");
    } else
      return (
        <WrappedComponent {...props} contestGroupStage={contestGroupStage} />
      );
  };

  return Comp;
};

export default GroupStageGuard;
