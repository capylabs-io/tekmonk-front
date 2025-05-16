"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import classNames from "classnames";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

type Suggestion = {
  id: number;
  text: string;
  type: "recent" | "popular";
};

// Mock data for search suggestions
const MOCK_SUGGESTIONS: Suggestion[] = [
  { id: 1, text: "React hooks tutorial", type: "popular" },
  { id: 2, text: "NextJS 13 features", type: "popular" },
  { id: 3, text: "Tailwind CSS tricks", type: "recent" },
  { id: 4, text: "TypeScript best practices", type: "recent" },
  { id: 5, text: "Frontend optimization", type: "popular" },
];

type SearchHeaderProps = {
  className?: string;
};

export const SearchHeader = ({ className }: SearchHeaderProps) => {
  const router = useCustomRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions(MOCK_SUGGESTIONS);
    } else {
      const filtered = MOCK_SUGGESTIONS.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `${ROUTE.SEARCH}?q=${encodeURIComponent(
          searchQuery
        )}&filter=${initialFilter}`
      );
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(
      `${ROUTE.SEARCH}?q=${encodeURIComponent(
        suggestion
      )}&filter=${initialFilter}`
    );
    setIsFocused(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={classNames("w-full bg-white relative", className)}
      ref={searchRef}
    >
      <div className="mx-auto">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-1 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="bg-gray-10 w-full pl-10 pr-10 py-3 border border-gray-20 rounded-xl focus:outline-none placeholder:text-gray-50"
              placeholder="Tìm kiếm..."
              aria-label="Search"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-50" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Suggestions dropdown */}
      {isFocused && (
        <div className="absolute z-10 mt-1 w-full max-w-2xl left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-500">
                {searchQuery ? "Kết quả tìm kiếm" : "Gợi ý tìm kiếm"}
              </div>
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <Search className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{suggestion.text}</span>
                    {suggestion.type === "recent" && (
                      <span className="ml-auto text-xs text-gray-400">
                        Gần đây
                      </span>
                    )}
                    {suggestion.type === "popular" && (
                      <span className="ml-auto text-xs text-gray-400">
                        Phổ biến
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              Không tìm thấy kết quả phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
};
