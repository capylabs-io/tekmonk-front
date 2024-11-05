import { ContestEntry, Media } from "@/types/common-types";

export type ContestSubmission = {
  id: string;
  title: string;
  assets?: Media[];
  thumbnail: Media;
  description?: string;
  contest_entry: ContestEntry | null;
  tags?: string[];
  createdAt: string;
  url?: string;
  source?: any;
  QualifiedExam: boolean | null;
};

export type DataContestSubmission = {
  title: string;
  description?: string;
  url?: string;
  tags?: {
    data: string[];
  };
  contest_entry: string | null;
  progress: number | 0
};
