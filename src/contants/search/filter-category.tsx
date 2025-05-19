import { Search, FileText, User } from "lucide-react";
import { FaHashtag } from "react-icons/fa6";
export const filterCategories = [
  { id: "all", label: "Tất cả", icon: <Search className="h-5 w-5" /> },
  { id: "posts", label: "Bài viết", icon: <FileText className="h-5 w-5" /> },
  { id: "people", label: "Người dùng", icon: <User className="h-5 w-5" /> },
  { id: "hashtag", label: "Hashtag", icon: <FaHashtag className="h-5 w-5" /> },
];
