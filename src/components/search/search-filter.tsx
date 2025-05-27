"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchHeader } from "./SearchHeader";
import { ROUTE } from "@/contants/router";
import { filterCategories } from "@/contants/search/filter-category";

export const SearchFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter") || "all";
  return (
    <div>
      {pathname !== ROUTE.SEARCH ? (
        <SearchHeader />
      ) : (
        <div className="w-full bg-white rounded-xl border border-gray-20 p-2 mb-4">
          <h2 className="font-semibold mb-4 text-gray-90">Bộ lọc</h2>
          <div className="space-y-2">
            {filterCategories.map((category) => (
              <Link
                key={category.id}
                href={`${ROUTE.SEARCH}?q=${queryParam}&filter=${category.id}`}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-colors",
                  filterParam === category.id
                    ? "bg-primary-10 text-primary-70"
                    : "hover:bg-gray-10 text-gray-70"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full",
                    filterParam === category.id ? "bg-primary-20" : "bg-gray-10"
                  )}
                >
                  {category.icon}
                </div>
                <span className="font-medium">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
