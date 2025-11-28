import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridView, { GridColumn } from "../../components/GridView/GridView";
import ObjectPageLayout from "./ObjectPageLayout";

const LentGoodsPage: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Grid columns
    const columns: GridColumn[] = [
        { header: "Contact", field: "contact" },
        { header: "Item / Currency", field: "itemOrCurrency" },
        { header: "Amount", field: "amount" },
        { header: "Start Date", field: "startDate" },
        { header: "End Date", field: "endDate" }
    ];

    useEffect(() => {
        fetch("/api/lent-goods", { credentials: "include" })
            .then(res => res.json())
            .then(json => {
                const list = json.gridViewItems ?? json.items ?? json;
                setData(Array.isArray(list) ? list : []);
            })
            .catch(() => setData([]));
    }, []);

    // --- Handlers ---
    const handleNew = () => navigate("/lent-goods/add");

    const handleEdit = () => {
        if (selectedRow) {
            navigate(`/lent-goods/edit/${selectedRow.id}`);
        }
    };

    const handleDeleteClick = () => {
        if (selectedRow) {
            setShowDeletePopup(true);
        }
    };

    const confirmDelete = async () => {
        if (!selectedRow) return;

        await fetch(`/api/lent-goods/delete/${selectedRow.id}`, {
            method: "DELETE",
            credentials: "include"
        }).catch(() => {});

        setData(prev => prev.filter(x => x.id !== selectedRow.id));
        setSelectedRow(null);
        setShowDeletePopup(false);
    };

    // --- Bottom Buttons ---
    const bottomButtons = (
        <>
            <button className="object-action-button" onClick={handleNew}>
                New
            </button>

            <button
                className="object-action-button"
                disabled={!selectedRow}
                onClick={handleEdit}
                style={{ opacity: selectedRow ? 1 : 0.4 }}
            >
                Edit
            </button>

            <button
                className="object-delete-button"
                disabled={!selectedRow}
                onClick={handleDeleteClick}
                style={{ opacity: selectedRow ? 1 : 0.4 }}
            >
                Delete
            </button>
        </>
    );

    return (
        <ObjectPageLayout
            title="Lent Goods"
            onBack={() => navigate("/dashboard")}
            bottomButtons={bottomButtons}
            confirmMessage="Are you sure you want to delete this lent good?"
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

export default LentGoodsPage;
