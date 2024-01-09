import classNames from "classnames";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  customClassName?: string;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
};

const BASE_CLASS = "flex items-center gap-x-1";

export const Pagination: React.FC<Props> = ({
  currentPage = 1,
  totalPages,
  customClassName,
  onClickPrevPage,
  onClickNextPage,
}) => {
  return (
    <nav className={classNames(BASE_CLASS, customClassName)}>
      <button
        type="button"
        onClick={onClickPrevPage}
        disabled={currentPage === 1}
        className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:opacity-0"
      >
        <ChevronsLeft size={14} />
      </button>
      <div className="flex items-center gap-x-1">
        <span className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-gray-200 bg-black px-3 py-2 text-sm text-white focus:bg-gray-50 focus:outline-none">
          {currentPage}
        </span>
        <span className="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 ">
          of
        </span>
        <span className="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 ">
          {totalPages}
        </span>
      </div>
      <button
        type="button"
        onClick={onClickNextPage}
        disabled={currentPage === totalPages}
        className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:opacity-0"
      >
        <ChevronsRight size={14} />
      </button>
    </nav>
  );
};
