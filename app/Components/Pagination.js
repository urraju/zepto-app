export default function Pagination({ page, setPage, totalPages }) {
  const pageSize = 10; 
  const currentPageGroup = Math.floor((page - 1) / pageSize); 

  const startPage = currentPageGroup * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  return (
    <div className="container mx-auto flex justify-center flex-col md:flex-row  items-center space-x-2 space-y-2 md:space-y-0 py-5">
      {/* Go to First Page Button */}
      <div className="flex items-center justify-center gap-2">
        {page > 1 && (
          <button
            onClick={() => setPage(1)}
            className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
          >
            Go to first
          </button>
        )}

        {/* Previous Group */}
        {startPage > 1 && (
          <button
            onClick={() => setPage(startPage - 1)}
            className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
          >
            Previous group
          </button>
        )}
        {/* Previous Button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
        >
          Previous
        </button>
      </div>

      <div>
        {/* Page Numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageIndex = startPage + i;
          return (
            <button
              key={pageIndex}
              onClick={() => setPage(pageIndex)}
              className={`p-2 md:px-3 ml-1 border rounded text-xs md:text-sm hover:text-white hover:bg-orange-500 transition-all duration-300 ${
                page === pageIndex ? "bg-orange-600 text-white border-transparent" : ""
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* Next Button */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
        >
          Next
        </button>

        {/* Next Group */}
        {endPage < totalPages && (
          <button
            onClick={() => setPage(endPage + 1)}
            className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
          >
            Next group
          </button>
        )}

        {/* Go to Last Page Button */}
        {page < totalPages && (
          <button
            onClick={() => setPage(totalPages)}
            className="p-2 px-4 border rounded text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-all duration-300"
          >
            Go to last
          </button>
        )}
      </div>
    </div>
  );
}
