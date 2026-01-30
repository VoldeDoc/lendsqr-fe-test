import { useState, useEffect } from "react";
import type { SortOrder, TableData } from "../../../types";


interface Position {
    top: number;
    left: number;
}


//get status class based on status value
export const getStatusClass = (status: string): string => {
    const statusLower = status.toLowerCase();

    const statusMap: Record<string, string> = {
        active: "table-status--active",
        pending: "table-status--pending",
        inactive: "table-status--inactive",
        blacklisted: "table-status--blacklisted",
    };

    return statusMap[statusLower] || "table-status--default";
};

// hook to detect clicks outside a specified element
export const useClickOutside = (
    isActive: boolean,
    ref: React.MutableRefObject<HTMLButtonElement | null>,
    menuSelector: string,
    onClose: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (isActive && ref.current) {
                if (!ref.current.contains(target)) {
                    const menu = document.querySelector(menuSelector);
                    if (menu && !menu.contains(target)) {
                        onClose();
                    }
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isActive, ref, menuSelector, onClose]);
};



// hook to calculate dropdown position based on active element
export const useDropdownPosition = <T extends string | number>(
    active: T | null,
    refs: React.MutableRefObject<Record<T, HTMLButtonElement | null>>,
    offset: { x: number; y: number }
) => {
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

    useEffect(() => {
        if (active !== null && refs.current[active]) {
            const rect = refs.current[active]!.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + offset.y,
                left: rect.right + window.scrollX + offset.x,
            });
        }
    }, [active, refs, offset.x, offset.y]);

    return position;
};

// hook to manage table filtering and sorting    
export const useTableFilters = (data: TableData[]) => {
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; order: SortOrder }>({
        key: "",
        order: null,
    });

    useEffect(() => {
        let result = [...data];

        if (searchTerm) {
            result = result.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key && sortConfig.order) {
            result.sort((a, b) => {
                const aValue = String(a[sortConfig.key]).toLowerCase();
                const bValue = String(b[sortConfig.key]).toLowerCase();

                if (sortConfig.order === "asc") {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });
        }

        setFilteredData(result);
    }, [searchTerm, sortConfig, data]);

    const resetFilters = () => {
        setSearchTerm("");
        setSortConfig({ key: "", order: null });
    };

    return {
        filteredData,
        searchTerm,
        setSearchTerm,
        sortConfig,
        setSortConfig,
        resetFilters,
    };
};