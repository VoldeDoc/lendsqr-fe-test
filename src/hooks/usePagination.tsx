import { useState, useMemo } from "react";

export const usePagination = (totalItems: number, itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(itemsPerPage);

    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    const getPageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const previousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const changePerPage = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    return {
        currentPage,
        perPage,
        totalPages,
        startIndex,
        endIndex,
        pageNumbers: getPageNumbers,
        goToPage,
        nextPage,
        previousPage,
        changePerPage,
        setCurrentPage,
    };
};