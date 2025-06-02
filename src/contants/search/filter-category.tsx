import { Search, FileText, User } from "lucide-react";
import { FaHashtag } from "react-icons/fa6";

export const FILTER_CATEGORY_ENUM = {
  ALL: "all",
  POSTS: "posts",
  PEOPLE: "people",
  HASHTAG: "hashtag",
};
export const filterCategories = [
  {
    id: FILTER_CATEGORY_ENUM.ALL,
    label: "Tất cả",
    icon: <Search className="h-5 w-5" />,
  },
  {
    id: FILTER_CATEGORY_ENUM.POSTS,
    label: "Bài viết",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: FILTER_CATEGORY_ENUM.PEOPLE,
    label: "Người dùng",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: FILTER_CATEGORY_ENUM.HASHTAG,
    label: "Hashtag",
    icon: <FaHashtag className="h-5 w-5" />,
  },
];
