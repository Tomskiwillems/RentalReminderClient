import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridView, { GridColumn } from "../../components/GridView/GridView";
import ObjectPageLayout from "./ObjectPageLayout";

const ContactsPage: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const columns: GridColumn[] = [
        { header: "Name", field: "name" },
        { header: "Description", field: "description" }
    ];

    useEffect(() => {
        fetch("/api/contacts", { credentials: "include" })
            .then(res => res.json())
            .then(json => {
                if (Array.isArray(json.contacts)) {
                    setData(json.contacts);
                } else {
                    console.error("Unexpected response format", json);
                    setData([]);
                }
            })
            .catch(() => setData([]));
    }, []);

    const handleNew = () => navigate("/contacts/add");

    const handleEdit = () => {
        if (selectedRow?.id) {
            navigate(`/contacts/edit/${selectedRow.id}`);
        } else {
            console.error("Selected row has no ID:", selectedRow);
        }
    };

    /* When user clicks delete button → show popup */
    const handleDeleteClick = () => {
        if (selectedRow) setShowDeletePopup(true);
    };

    /* User presses YES in confirmation popup */
    const confirmDelete = async () => {
        if (!selectedRow) return;

        await fetch(`/api/contacts/delete/${selectedRow.id}`, {
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
            title="Contacts"
            onBack={() => navigate("/dashboard")}
            bottomButtons={bottomButtons}

            /* NEW POPUP PROPS */
            confirmMessage="Are you sure you want to delete this contact?"
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

export default ContactsPage;
