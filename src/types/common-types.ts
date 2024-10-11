import { BackgroundCard } from "@/components/shop/BackgroundCard";
import { LeaderboardTable } from "./../components/leaderboard/LeaderboardTable";
export type Event = {
  title: string;
  day: string;
  month: string;
  weekday: string;
  timeRange: string;
  imageUrl: string;
  createdAt: string;
};

type UserRole = {
  name?: string;
  code?: string;
  description?: string;
}

type UserProfile = {
  user?: User;
  schoolName?: string;
  className?: string;
  data?: any;
  schoolLevel?: string;
  schoolAddress?: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
  provider?: string;
  confirmed?: string;
  blocked?: string;
  metadata?: string;
  skills?: string[];
  currentTitle?: string;
  description?: string;
  role: {
    name: string;
  };
  userProfiles?: UserProfile[] | UserProfile | any; 
  phoneNumber?: string;
  parentName?: string;
  parentPhoneNumber?: string;
  fullName?: string;
  user_role?: UserRole[] | UserRole | any;
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
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
};

export type EventDetail = {
  title: string;
  eventTime: string;
  eventVenue: string;
  address: string;
  month: string;
  day: string;
  weekday: string;
  content: string;
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

export type Media = {
  id: number;
  name: string;
  ext: string;
  url: string;
  createAt: string;
  size: number;
}

export type UploadData= {
  ref: string;
  refId: string;
  field: string;
  files: File
}