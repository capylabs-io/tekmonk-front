"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Clock, Trash2 } from "lucide-react";
import classNames from "classnames";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useSearchHistoryStore } from "@/store/search-history-store";

type Suggestion = {
  id: number;
  text: string;
  type: "recent" | "popular";
};

// Mock data for popular suggestions
const POPULAR_SUGGESTIONS: Suggestion[] = [
  { id: 1, text: "Trại hè 2025", type: "popular" },
  { id: 2, text: "Lập trình game", type: "popular" },
  { id: 3, text: "Lập trình web", type: "popular" },
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

  // Get search history from store
  const {
    searchHistory,
    addSearchHistory,
    removeSearchHistory,
    clearSearchHistory,
  } = useSearchHistoryStore();

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Show history and popular suggestions when no query
      const historyItems = searchHistory.map((text, index) => ({
        id: -1 - index, // Negative IDs for history items
        text,
        type: "recent" as const,
      }));

      setSuggestions([...historyItems, ...POPULAR_SUGGESTIONS]);
    } else {
      // Filter both history and popular suggestions
      const filtered = [
        ...searchHistory.map((text, index) => ({
          id: -1 - index,
          text,
          type: "recent" as const,
        })),
        ...POPULAR_SUGGESTIONS,
      ].filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSuggestions(filtered);
    }
  }, [searchQuery, searchHistory]);

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
      // Add to search history
      addSearchHistory(searchQuery.trim());

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

    // Add to search history
    addSearchHistory(suggestion);

    router.push(
      `${ROUTE.SEARCH}?q=${encodeURIComponent(
        suggestion
      )}&filter=${initialFilter}`
    );
    setIsFocused(false);
  };

  const handleRemoveHistory = (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    removeSearchHistory(text);
  };

  const handleClearAllHistory = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    clearSearchHistory();
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
              {/* Search History Section */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="px-4 py-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Lịch sử tìm kiếm
                    </span>
                    <button
                      onClick={handleClearAllHistory}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Xóa tất cả
                    </button>
                  </div>
                  <ul>
                    {searchHistory.map((text, index) => (
                      <li
                        key={`history-${index}`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                        onClick={() => handleSuggestionClick(text)}
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-3" />
                          <span>{text}</span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveHistory(e, text)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Popular Suggestions Section */}
              {POPULAR_SUGGESTIONS.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500">
                    Phổ biến
                  </div>
                  <ul>
                    {POPULAR_SUGGESTIONS.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        <Search className="h-4 w-4 text-gray-400 mr-3" />
                        <span>{suggestion.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
