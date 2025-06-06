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
import { getMe } from "@/requests/login";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { useCustomRouter } from "../common/router/CustomRouter";

export default function GroupStageGuard({ children }: any) {
  const router = useCustomRouter();

  //use state
  const [isSubmitted, setIsSubmitted] = useState(false);
  //
  const [contestGroupStage, setContestGroupStage] = useState<
    ContestGroupStage | undefined
  >(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);

  //use store
  const candidateNumber = useUserStore((state) => state.candidateNumber);
  const warning = useSnackbarStore((state) => state.warn);
  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);

  const isExistContestSubmission = async () => {
    if (!candidateNumber) return false;
    const contestEntry = await getOneContestEntry(candidateNumber);
    const contestSubmission = await getContestSubmissionByContestEntry(
      contestEntry.id
    );
    return contestSubmission.data.length > 0;
  };

  const fetchContestGroupStage = async () => {
    if (!candidateNumber) {
      warning(
        "Không thành công",
        "Không tìm thấy số báo danh, vui lòng đăng nhập lại"
      );
      router.push("/");
      return;
    }
    try {
      const data = await getContestGroupStageByCandidateNumber(candidateNumber);
      console.log("guard stage", data);
      if (!!data) {
        setContestGroupStage(data);
        return data;
      }
    } catch (error) {
      console.error(error);
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

  const fetAllData = async () => {
    try {
      show();
      const checkIsSubmited = await isExistContestSubmission();
      if (checkIsSubmited) {
        warning("Không thành công", "Bạn đã nộp bài thi");
        router.push("/");
      }
      const groupStage = await fetchContestGroupStage();
      await checkExistContestSubmission();
      if (!groupStage) {
        warning("Không thành công", "Lỗi lấy dữ liệu cho cuộc thi");
        router.push("/");
        return; // or any loading indicator
      }
      if (new Date(groupStage.startTime) > new Date()) {
        warning("Không thành công", "Vòng chung kết chưa bắt đầu");
        router.push("/");
        return;
      }
      if (new Date(groupStage.endTime) < new Date()) {
        warning("Không thành công", "Vòng chung kết đã kết thúc");
        router.push("/");
        return;
      }
      setIsValid(true);
    } catch (error) {
      // hide();
      console.error(error);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetAllData();
  }, []);

  return isValid ? children : <div>Loading</div>;
}
