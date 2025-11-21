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
}

const GridView: React.FC<GridViewProps> = ({
                                               columns,
                                               data = [],
                                               sortEnabled = true,
                                               selectEnabled = true,
                                               onSelect
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
        return (
            <span className="sort-indicator active">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
        );
    };

    return (
        <table className="grid-view">
            <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.field}
                        onClick={() => handleSort(col.field)}
                        className={sortEnabled ? "sortable" : ""}
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
                sortedData.map((row, index) => (
                    <tr
                        key={index}
                        className={selectEnabled && selectedIndex === index ? "selected-row" : ""}
                        onClick={() => handleRowClick(row, index)}
                    >
                        {columns.map((col) => (
                            <td key={col.field}>{row[col.field]}</td>
                        ))}
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default GridView;
