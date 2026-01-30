import { IoFilter } from "react-icons/io5";
import type { Column } from "../../../types";

interface TableHeadProps {
    columns: Column[];
    filterRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
    activeFilter: string | null;
    onFilterClick: (columnKey: string) => void;
}

export default function TableHead({
    columns,
    filterRefs,
    onFilterClick,
}: TableHeadProps) {
    return (
        <thead className="table-head">
            <tr>
                {columns.map((column) => (
                    <th key={column.key} className="table-header">
                        <div className="table-header-content">
                            <span>{column.label}</span>

                            <div className="table-header-actions">
                                {column.filterable && (
                                    <div className="filter-dropdown">
                                        <button
                                            ref={(el) => {
                                                filterRefs.current[column.key] = el;
                                            }}
                                            className="filter-btn"
                                            onClick={() => onFilterClick(column.key)}
                                            title="Filter"
                                        >
                                            <IoFilter />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </th>
                ))}
                <th className="table-header table-header--actions"></th>
            </tr>
        </thead>
    );
}