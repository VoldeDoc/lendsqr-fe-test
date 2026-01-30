import { useState, useRef, useEffect } from "react";
import { MdVisibility } from "react-icons/md";
import "../../../styles/table.scss";
import { FilterMenu } from "../filtermenu";
import type { TableProps } from "../../../types";
import { useDropdownPosition, useTableFilters, } from "./utils";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import { Pagination } from "../../../utils/pagination";
import { usePagination } from "../../../hooks/usePagination";
import activateImage from '../../../../public/assets/images/dashboard/users/activate.svg'
import blacklistImage from '../../../../public/assets/images/dashboard/users/b;ac;ist.svg'

export const Table = ({
    columns,
    data,
    onView,
    onBlacklist,
    onActivate,
    itemsPerPage = 10,
}: TableProps) => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [activeAction, setActiveAction] = useState<string | number | null>(null);
    const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const actionRefs = useRef<Record<string | number, HTMLButtonElement | null>>({});

    // Use custom hooks
    const {
        filteredData,
        searchTerm,
        setSearchTerm,
        sortConfig,
        setSortConfig,
        resetFilters,
    } = useTableFilters(data);

    const {
        currentPage,
        perPage,
        totalPages,
        startIndex,
        endIndex,
        pageNumbers,
        goToPage,
        nextPage,
        previousPage,
        changePerPage,
        setCurrentPage,
    } = usePagination(filteredData.length, itemsPerPage);

    const filterPosition = useDropdownPosition(activeFilter, filterRefs, { x: -280, y: 8 });
    const actionPosition = useDropdownPosition(activeAction, actionRefs, { x: -180, y: 8 });

    // Reset to first page when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData.length, setCurrentPage]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (activeFilter && filterRefs.current[activeFilter]) {
                if (!filterRefs.current[activeFilter]?.contains(target)) {
                    const filterMenu = document.querySelector('.filter-menu');
                    if (filterMenu && !filterMenu.contains(target)) {
                        setActiveFilter(null);
                    }
                }
            }

            if (activeAction !== null && actionRefs.current[activeAction]) {
                if (!actionRefs.current[activeAction]?.contains(target)) {
                    const actionMenu = document.querySelector('.action-menu');
                    if (actionMenu && !actionMenu.contains(target)) {
                        setActiveAction(null);
                    }
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeFilter, activeAction]);

    const currentData = filteredData.slice(startIndex, endIndex);

    const handleFilterReset = () => {
        resetFilters();
        setActiveFilter(null);
    };

    const handleFilterClick = (columnKey: string) => {
        setActiveFilter(activeFilter === columnKey ? null : columnKey);
    };

    const handleActionClick = (rowId: string | number) => {
        setActiveAction(activeAction === rowId ? null : rowId);
    };

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table className="table">
                    <TableHead
                        columns={columns}
                        filterRefs={filterRefs}
                        activeFilter={activeFilter}
                        onFilterClick={handleFilterClick}
                    />
                    <TableBody
                        columns={columns}
                        currentData={currentData}
                        actionRefs={actionRefs}
                        activeAction={activeAction}
                        onActionClick={handleActionClick}
                    />
                </table>
            </div>

            {/* Filter Menu */}
            {activeFilter && (
                <FilterMenu
                    position={filterPosition}
                    columnLabel={columns.find(c => c.key === activeFilter)?.label || ""}
                    isSortable={columns.find(c => c.key === activeFilter)?.sortable !== false}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    sortConfig={sortConfig}
                    activeFilterKey={activeFilter}
                    onSortChange={(order) => setSortConfig({ key: activeFilter, order })}
                    onReset={handleFilterReset}
                    onClose={() => setActiveFilter(null)}
                />
            )}

            {/* Action Menu */}
            {activeAction !== null && (
                <div
                    className="action-menu"
                    style={{
                        top: `${actionPosition.top}px`,
                        left: `${actionPosition.left}px`,
                    }}
                >
                    {onView && (
                        <button
                            className="action-menu-item"
                            onClick={() => {
                                onView(currentData.find(row => row.id === activeAction)!);
                                setActiveAction(null);
                            }}
                        >
                            <MdVisibility />
                            <span>View Details</span>
                        </button>
                    )}
                    {onBlacklist && (
                        <button
                            className="action-menu-item action-menu-item--delete"
                            onClick={() => {
                                onBlacklist(currentData.find(row => row.id === activeAction)!);
                                setActiveAction(null);
                            }}
                        >
                            <img src={blacklistImage} alt="Blacklist Icon" />
                            <span>Blacklist User</span>
                        </button>
                    )}
                    {onActivate && (
                        <button
                            className="action-menu-item"
                            onClick={() => {
                                onActivate(currentData.find(row => row.id === activeAction)!);
                                setActiveAction(null);
                            }}
                        >
                            <img src={activateImage} alt="Activate Icon" />
                            <span>Activate User</span>
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {filteredData.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    perPage={perPage}
                    totalItems={filteredData.length}
                    pageNumbers={pageNumbers}
                    onPageChange={goToPage}
                    onPerPageChange={changePerPage}
                    onNext={nextPage}
                    onPrevious={previousPage}
                />
            )}
        </div>
    );
};