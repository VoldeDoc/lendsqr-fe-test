import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { PaginationProps } from "../types";
export const Pagination = ({
    currentPage,
    totalPages,
    perPage,
    totalItems,
    pageNumbers,
    onPageChange,
    onPerPageChange,
    onNext,
    onPrevious,
}: PaginationProps) => {
    return (
        <div className="table-pagination">
            <div className="pagination-left">
                <span className="pagination-info">Showing</span>
                <div className="pagination-select">
                    <select
                        value={perPage}
                        onChange={(e) => onPerPageChange(Number(e.target.value))}
                        className="pagination-dropdown"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <MdKeyboardArrowDown className="pagination-dropdown-icon" />
                </div>
                <span className="pagination-info">out of {totalItems}</span>
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn pagination-btn--icon"
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    title="Previous"
                >
                    <MdKeyboardArrowLeft />
                </button>

                <div className="pagination-pages">
                    {pageNumbers.map((page, index) =>
                        page === "..." ? (
                            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                className={`pagination-page ${currentPage === page ? "pagination-page--active" : ""
                                    }`}
                                onClick={() => onPageChange(page as number)}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>

                <button
                    className="pagination-btn pagination-btn--icon"
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    title="Next"
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    );
};