// src/pages/forms/BaseObjectPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridView, { GridColumn } from "../../components/GridView/GridView";
import ObjectPageLayout from "./ObjectPageLayout";

export interface BaseObjectPageProps<T extends { id: number }, U extends { id: number } = T> {
    title: string;
    fetchUrl: string;
    deleteUrl: (id: number) => string;
    routeBase: string; // frontend route base (e.g. "/contacts")
    columns: GridColumn[];
    bottomButtons?: React.ReactNode;
    transformData?: (item: T) => U;
}

export function BaseObjectPage<T extends { id: number }, U extends { id: number } = T>({
                                                                                           title,
                                                                                           fetchUrl,
                                                                                           deleteUrl,
                                                                                           routeBase,
                                                                                           columns,
                                                                                           bottomButtons,
                                                                                           transformData
                                                                                       }: BaseObjectPageProps<T, U>) {
    const navigate = useNavigate();

    const [rawData, setRawData] = useState<T[]>([]);
    const [data, setData] = useState<U[]>([]);
    const [selectedRow, setSelectedRow] = useState<U | null>(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Load API data
    useEffect(() => {
        let mounted = true;

        fetch(fetchUrl, { credentials: "include" })
            .then(res => res.json())
            .then(json => {
                // automatically find first array field in response
                const arrayKey = Object.keys(json).find(k => Array.isArray((json as any)[k]));
                const items = arrayKey ? ((json as any)[arrayKey] as T[]) : [];

                if (!mounted) return;

                setRawData(items);

                if (transformData) {
                    setData(items.map(transformData));
                } else {
                    setData(items as unknown as U[]);
                }
            })
            .catch(() => {
                if (!mounted) return;
                setRawData([]);
                setData([]);
            });

        return () => { mounted = false; };
    }, [fetchUrl, transformData]);

    // Delete row handlers
    const handleDeleteClick = () => {
        if (selectedRow) setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (!selectedRow) return;

        try {
            await fetch(deleteUrl(selectedRow.id), {
                method: "DELETE",
                credentials: "include"
            });
        } catch {}

        setData(prev => prev.filter(i => i.id !== selectedRow.id));
        setRawData(prev => prev.filter(i => i.id !== selectedRow.id));
        setSelectedRow(null);
        setShowDeletePopup(false);
    };

    return (
        <ObjectPageLayout
            title={title}
            onBack={() => navigate("/dashboard")}
            bottomButtons={
                bottomButtons ?? (
                    <>
                        <button
                            className="object-action-button"
                            onClick={() => navigate(`${routeBase}/add`)}
                        >
                            New
                        </button>

                        <button
                            className="object-action-button"
                            disabled={!selectedRow}
                            style={{ opacity: selectedRow ? 1 : 0.4 }}
                            onClick={() => selectedRow && navigate(`${routeBase}/edit/${selectedRow.id}`)}
                        >
                            Edit
                        </button>

                        <button
                            className="object-delete-button"
                            disabled={!selectedRow}
                            style={{ opacity: selectedRow ? 1 : 0.4 }}
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </button>
                    </>
                )
            }
            confirmMessage={`Are you sure you want to delete this ${title.toLowerCase()}?`}
            showDeletePopup={showDeletePopup}
            setShowDeletePopup={setShowDeletePopup}
            onConfirmDelete={confirmDelete}
        >
            <GridView
                columns={columns}
                data={data}
                selectEnabled={true}
                onSelect={row => setSelectedRow(row as U)}
            />
        </ObjectPageLayout>
    );
}
