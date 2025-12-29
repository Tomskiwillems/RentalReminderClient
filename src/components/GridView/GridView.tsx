// src/components/GridView/GridView.tsx
import React, { useState } from "react";
import "./GridView.css";

export interface GridColumn {
    header: string;
    field: string;
}

export interface GridViewProps {
    columns: GridColumn[];
    data?: any[];
    sortEnabled?: boolean;
    selectEnabled?: boolean;
    onSelect?: (row: any) => void;
    keyboardEnabled?: boolean; // new prop
}

const GridView: React.FC<GridViewProps> = ({
                                               columns,
                                               data = [],
                                               sortEnabled = true,
                                               selectEnabled = true,
                                               onSelect,
                                               keyboardEnabled = true,
                                           }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSort = (field: string) => {
        if (!sortEnabled) return;
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortField || !sortEnabled) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];

            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortField, sortDirection, sortEnabled]);

    const handleRowClick = (row: any, index: number) => {
        if (!selectEnabled) return;
        setSelectedIndex(index);
        if (onSelect) onSelect(row);
    };

    const getSortIndicator = (field: string) => {
        if (!sortEnabled) return null;
        if (sortField !== field) return <span className="sort-indicator">▲▼</span>;
        return <span className="sort-indicator active">{sortDirection === "asc" ? "▲" : "▼"}</span>;
    };

    return (
        <table className="grid-view" tabIndex={keyboardEnabled ? 0 : -1}>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.field}
                        onClick={sortEnabled ? () => handleSort(col.field) : undefined}
                        className={sortEnabled ? "sortable" : ""}
                        tabIndex={keyboardEnabled ? 0 : -1}
                        onKeyDown={keyboardEnabled ? (e) => {
                            if (sortEnabled && (e.key === "Enter" || e.key === " ")) {
                                handleSort(col.field);
                                e.preventDefault();
                            }
                        } : undefined}
                    >
                        {col.header} {getSortIndicator(col.field)}
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {sortedData.length === 0 ? (
                <tr>
                    <td colSpan={columns.length} className="empty-cell">
                        No data
                    </td>
                </tr>
            ) : (
                sortedData.map((row) => (
                    <tr
                        key={row.id}
                        className={selectEnabled && selectedIndex === row.id ? "selected-row" : ""}
                        onClick={() => handleRowClick(row, row.id)}
                        tabIndex={keyboardEnabled && selectEnabled ? 0 : -1}
                        onKeyDown={keyboardEnabled && selectEnabled ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleRowClick(row, row.id);
                                e.preventDefault();
                            }
                        } : undefined}
                    >
                        {columns.map((col) => (
                            <td key={col.field} tabIndex={keyboardEnabled ? 0 : -1}>
                                {row[col.field]}
                            </td>
                        ))}
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default GridView;
