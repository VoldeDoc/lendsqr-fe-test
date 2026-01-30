import { BsThreeDotsVertical } from "react-icons/bs";
import type { Column, TableData } from "../../../types";
import { getStatusClass } from "./utils";

interface TableBodyProps {
    columns: Column[];
    currentData: TableData[];
    actionRefs: React.MutableRefObject<Record<string | number, HTMLButtonElement | null>>;
    activeAction: string | number | null;
    onActionClick: (rowId: string | number) => void;
}

export default function TableBody({
    columns,
    currentData,
    actionRefs,
    onActionClick,
}: TableBodyProps) {
    return (
        <tbody className="table-body">
            {currentData.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1} className="table-empty">
                        <p>No data found</p>
                    </td>
                </tr>
            ) : (
                currentData.map((row) => (
                    <tr key={row.id} className="table-row">
                        {columns.map((column) => (
                            <td key={column.key} className="table-cell">
                                {column.key === "status" ? (
                                    <span
                                        className={`table-status ${getStatusClass(
                                            row[column.key]
                                        )}`}
                                    >
                                        {row[column.key]}
                                    </span>
                                ) : (
                                    row[column.key]
                                )}
                            </td>
                        ))}

                        <td className="table-cell table-cell--actions">
                            <div className="action-dropdown">
                                <button
                                    ref={(el) => {
                                        actionRefs.current[row.id] = el;
                                    }}
                                    className="action-btn"
                                    onClick={() => onActionClick(row.id)}
                                >
                                    <BsThreeDotsVertical />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    );
}