import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-5">
      {/* Previous Page Button */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-[#6366f1] text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
