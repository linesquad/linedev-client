import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginatedListProps {
  totalcount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginatedList: React.FC<PaginatedListProps> = ({
  totalcount,
  limit,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalcount / limit);

  if (totalPages <= 1) return null;

  const windowSize = 4;
  const halfWindow = Math.floor(windowSize / 2);

  let startPage = Math.max(currentPage - halfWindow, 1);
  let endPage = Math.min(startPage + windowSize - 1, totalPages);

  if (endPage - startPage + 1 < windowSize && startPage > 1) {
    startPage = Math.max(endPage - windowSize + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <Pagination className="justify-start flex py-[20px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:bg-[#E93314] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              className={`${
                page === currentPage
                  ? "bg-[#E93314] h-full border-none rounded-[0px] text-white"
                  : ""
              } hover:bg-[#E93314] transition-colors`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="hover:bg-[#E93314] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginatedList;
