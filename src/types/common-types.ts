import { metadata } from "./../app/layout";
import { BackgroundCard } from "@/components/shop/BackgroundCard";
import { LeaderboardTable } from "./../components/leaderboard/LeaderboardTable";
export type User = {
  id: string;
  username: string;
  email: string;
  userRank: string;
  specialName: string;
  imageURL?: string;
  twitterName?: string;
  role: {
    name: string;
  };
};
export interface Certificate {
  name: string;
  type: string;
  progress: string;
  mission: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}
export type Project = {
  name: string;
  author: User;
  thumbnailUrl: string;
  imageUrls: string[];
  createdAt: string;
  projectCategories: string[];
  description: string;
  likeCount: string;
  commentCount: string;
};

export type LeaderboardData = {
  user: User;
  score: string;
};

// declare type for type, not interface
export type Recruitment = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};

export type RecruitmentDetail = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};
export type Event = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};

export type EventDetail = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};

export type Achievement = {
  name: string;
  imageUrl: string;
};

export type Notification = {
  title: string;
  createdAt: string;
};

export type AvatarShop = {
  id: string;
  image: string;
  title: string;
  price: string;
};

export type BackgroundShop = {
  image: string;
  title: string;
  price: string;
};

export type New = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};

export type NewDetail = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};

export type Hiring = {
  id: number;
  attributes: {
    backgroundImgUrl: string;
    title: string;
    content: string;
    location: string;
    locationName: string;
    startTime: string;
    endTime: string;
    type: string;
    metadata: any;
  };
};
