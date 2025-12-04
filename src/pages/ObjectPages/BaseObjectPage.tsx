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

    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Load API data
    useEffect(() => {
        let mounted = true;

        fetch(fetchUrl, { credentials: "include" })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${title}: ${res.statusText}`);
                return res.json();
            })
            .then(json => {
                const arrayKey = Object.keys(json).find(k => Array.isArray((json as any)[k]));
                const items = arrayKey ? ((json as any)[arrayKey] as T[]) : [];

                if (!mounted) return;

                setRawData(items);
                setData(transformData ? items.map(transformData) : (items as unknown as U[]));
                setMessage(null); // clear previous messages
            })
            .catch(err => {
                console.error(err);
                if (!mounted) return;
                setRawData([]);
                setData([]);
                setMessage({ type: 'error', text: err.message });
            });

        return () => { mounted = false; };
    }, [fetchUrl, transformData, title]);

    // Delete row handlers
    const handleDeleteClick = () => {
        if (selectedRow) setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (!selectedRow) return;

        try {
            const res = await fetch(deleteUrl(selectedRow.id), {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || `Failed to delete item (status ${res.status})`);
            }

            setData(prev => prev.filter(i => i.id !== selectedRow.id));
            setRawData(prev => prev.filter(i => i.id !== selectedRow.id));
            setSelectedRow(null);
            setMessage({ type: 'success', text: 'Item deleted successfully' });
        } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: err.message || 'Delete failed' });
        }

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
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <GridView
                columns={columns}
                data={data}
                selectEnabled={true}
                onSelect={row => setSelectedRow(row as U)}
            />
        </ObjectPageLayout>
    );
}
