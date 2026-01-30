import { BiSearch } from "react-icons/bi";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

type SortOrder = "asc" | "desc" | null;

interface FilterMenuProps {
    position: { top: number; left: number };
    columnLabel: string;
    isSortable: boolean;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortConfig: { key: string; order: SortOrder };
    activeFilterKey: string;
    onSortChange: (order: SortOrder) => void;
    onReset: () => void;
    onClose: () => void;
}

export const FilterMenu = ({
    position,
    columnLabel,
    isSortable,
    searchTerm,
    onSearchChange,
    sortConfig,
    activeFilterKey,
    onSortChange,
    onReset,
    onClose,
}: FilterMenuProps) => {
    return (
        <div
            className="filter-menu"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
        >
            <div className="filter-menu-header">
                <h4>Filter {columnLabel}</h4>
            </div>

            <div className="filter-search">
                <BiSearch className="filter-search-icon" />
                <input
                    type="text"
                    placeholder={`Search ${columnLabel}...`}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="filter-search-input"
                />
            </div>

            {isSortable && (
                <div className="filter-sort-section">
                    <label>Sort</label>
                    <div className="filter-sort-buttons">
                        <button
                            className={`filter-sort-btn ${
                                sortConfig.key === activeFilterKey &&
                                sortConfig.order === "asc"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => onSortChange("asc")}
                        >
                            <FaSortAlphaDown />
                            <span>A-Z</span>
                        </button>
                        <button
                            className={`filter-sort-btn ${
                                sortConfig.key === activeFilterKey &&
                                sortConfig.order === "desc"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => onSortChange("desc")}
                        >
                            <FaSortAlphaUp />
                            <span>Z-A</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="filter-actions">
                <button className="filter-reset-btn" onClick={onReset}>
                    Reset
                </button>
                <button className="filter-apply-btn" onClick={onClose}>
                    Filter
                </button>
            </div>
        </div>
    );
};