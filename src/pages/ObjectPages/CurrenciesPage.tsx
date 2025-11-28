import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridView, { GridColumn } from "../../components/GridView/GridView";
import ObjectPageLayout from "./ObjectPageLayout";

const CurrenciesPage: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const columns: GridColumn[] = [
        { header: "Name", field: "name" },
        { header: "Description", field: "description" }
    ];

    useEffect(() => {
        fetch("/api/currencies", { credentials: "include" })
            .then(res => res.json())
            .then(json => {
                const items = json.gridViewItems ?? json.currencies ?? json;
                setData(Array.isArray(items) ? items : []);
            })
            .catch(() => setData([]));
    }, []);

    const handleNew = () => navigate("/currencies/add");

    const handleEdit = () => {
        if (selectedRow) navigate(`/currencies/edit/${selectedRow.id}`);
    };

    const handleDeleteClick = () => {
        if (selectedRow) setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (!selectedRow) return;

        await fetch(`/api/currencies/delete/${selectedRow.id}`, {
            method: "DELETE",
            credentials: "include"
        }).catch(() => {});

        setData(prev => prev.filter(i => i.id !== selectedRow.id));
        setSelectedRow(null);
        setShowDeletePopup(false);
    };

    const bottomButtons = (
        <>
            <button className="object-action-button" onClick={handleNew}>
                New
            </button>

            <button
                className="object-action-button"
                disabled={!selectedRow}
                style={{ opacity: selectedRow ? 1 : 0.4 }}
                onClick={handleEdit}
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
    );

    return (
        <ObjectPageLayout
            title="Currencies"
            onBack={() => navigate("/dashboard")}
            bottomButtons={bottomButtons}
            confirmMessage="Are you sure you want to delete this currency?"
            showDeletePopup={showDeletePopup}
            setShowDeletePopup={setShowDeletePopup}
            onConfirmDelete={confirmDelete}
        >
            <GridView
                columns={columns}
                data={data}
                selectEnabled={true}
                onSelect={(row) => setSelectedRow(row)}
            />
        </ObjectPageLayout>
    );
};

export default CurrenciesPage;
