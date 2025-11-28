import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormPage from "./FormPage";

const EditContactPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContact = async () => {
            try {
                const response = await fetch(`/api/contacts/${id}`, {
                    credentials: "include"
                });

                const data = await response.json();

                if (response.ok) {
                    // Assign values from ContactResponse DTO
                    setName(data.name ?? "");
                    setDescription(data.description ?? "");
                } else {
                    console.error("Failed to load contact:", data.message);
                }
            } catch {
                console.error("Network error while loading contact.");
            }

            setLoading(false);
        };

        loadContact();
    }, [id]);

    const submitForm = async () => {
        try {
            const response = await fetch(`/api/contacts/edit/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    description
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.message };
            }

            return { success: true };
        } catch {
            return { success: false, message: "Network error." };
        }
    };

    if (loading) return <div className="object-page-container">Loading...</div>;

    return (
        <FormPage
            title="Edit contact"
            submitLabel="Save"
            navigateTo="/contacts"
            onSubmit={submitForm}
        >
            <div className="form-field-group">
                <label className="form-label">Name</label>
                <input
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-field-group">
                <label className="form-label">Description</label>
                <textarea
                    className="form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </FormPage>
    );
};

export default EditContactPage;
