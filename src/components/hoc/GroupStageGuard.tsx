"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import {
  getContestGroupStageByCandidateNumber,
  getOneContestEntry,
} from "@/requests/contestEntry";
import { ContestGroupStage } from "@/types/common-types";
import { getContestSubmissionByContestEntry } from "@/requests/contestSubmit";

interface WrappedComponentProps {
  contestGroupStage: ContestGroupStage;
  isSubmitted: boolean;
}

const GroupStageGuard = (WrappedComponent: React.FC<WrappedComponentProps>) => {
  const Comp: React.FC = (props) => {
    const router = useRouter();

    //use state
    const [isSubmitted, setIsSubmitted] = useState(false);
    //
    const [contestGroupStage, setContestGroupStage] =
      useState<ContestGroupStage | null>(null);
    const candidateNumber = useUserStore((state) => state.candidateNumber);

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
      } catch (error) {
        return;
      }
    };

    //handle if user aready submit the form
    //get contest submission by candidate number
    const checkExistContestSubmission = async () => {
      if (!candidateNumber) {
        router.push("/");
        return;
      }
      const contestEntry = await getOneContestEntry(candidateNumber);
      const contestSubmission = await getContestSubmissionByContestEntry(
        contestEntry.id
      );
      setIsSubmitted(contestSubmission.data.length > 0);
    };

    useEffect(() => {
      fetchContestGroupStage();
      checkExistContestSubmission();
    }, [candidateNumber]);

    if (contestGroupStage === null) {
      return <div>Loading...</div>; // or any loading indicator
    }
    if (contestGroupStage.startTime > new Date().toISOString()) {
      router.push("/");
    } else
      return (
        <WrappedComponent
          {...props}
          contestGroupStage={contestGroupStage}
          isSubmitted={isSubmitted}
        />
      );
  };

  return Comp;
};

export default GroupStageGuard;
