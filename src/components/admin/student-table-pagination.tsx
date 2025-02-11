import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface StudentTablePaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  showEllipsisThreshold?: number; // Add this parameter
}

const generatePaginationItems = (
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  showEllipsisThreshold: number // Add this parameter
) => {
  const pages = [];
  const showEllipsis = totalPages > showEllipsisThreshold;

  const createPaginationLink = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        href="#"
        onClick={() => onPageChange(page)}
        isActive={currentPage === page}
        className={cn(
          currentPage === page
            ? "bg-primary-10 border-none text-primary-70"
            : "hover:bg-purple-100 border border-gray-20 shadow-custom-gray rounded-lg"
        )}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  pages.push(createPaginationLink(1));

  if (showEllipsis) {
    if (currentPage <= showEllipsisThreshold - 3) {
      for (let i = 2; i <= showEllipsisThreshold - 2; i++)
        pages.push(createPaginationLink(i));
      pages.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    } else if (currentPage >= totalPages - (showEllipsisThreshold - 4)) {
      pages.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
      for (
        let i = totalPages - (showEllipsisThreshold - 3);
        i < totalPages;
        i++
      )
        pages.push(createPaginationLink(i));
    } else {
      pages.push(
        <PaginationItem key="ellipsis3">
          <PaginationEllipsis />
        </PaginationItem>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++)
        pages.push(createPaginationLink(i));
      pages.push(
        <PaginationItem key="ellipsis4">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    pages.push(createPaginationLink(totalPages));
  } else {
    for (let i = 2; i <= totalPages; i++) pages.push(createPaginationLink(i));
  }

  return pages;
};

export default function StudentTablePagination({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showEllipsisThreshold = 7, // Add this parameter with a default value
}: StudentTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col xl:flex-row gap-3 items-center xl:justify-between justify-center py-4 w-full">
      <div className="flex items-center gap-2 w-full xl:w-auto justify-center xl:justify-start">
        <span className="text-sm">Hiển thị</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-00">
            {[10, 20, 50].map((value) => (
              <SelectItem
                key={value}
                value={value.toString()}
                className="hover:cursor-pointer hover:bg-primary-10"
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-BodySm text-gray-95">{`${startItem}-${endItem} trong số ${totalItems} kết quả`}</span>
      </div>
      <Pagination className="w-full xl:w-auto">
        <PaginationContent className="flex justify-center xl:justify-end">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            >
              Trước
            </PaginationPrevious>
          </PaginationItem>

          {generatePaginationItems(
            totalPages,
            currentPage,
            onPageChange,
            showEllipsisThreshold
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            >
              Sau
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <style jsx global>{`
        .pagination-link[aria-current="page"] {
          background-color: #fae8ff !important;
        }
      `}</style>
    </div>
  );
}
