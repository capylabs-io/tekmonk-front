import { Media } from "@/types/common-types";

export type ContestSubmission = {
    id: string;
    title: string;
    assets?: Media[];
    thumbnail: Media;
    description?: string;
    tags?: string[],
    createdAt: string;
    url?: string;
}

export type DataContestSubmission = {
    title: string;
    description?: string;
    url?: string;
    tags?: {
        "data": string[]
    },
    contest_entry?: string 
}