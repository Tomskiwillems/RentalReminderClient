import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormPage from "./FormPage";

const EditCurrencyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCurrency = async () => {
            try {
                const response = await fetch(`/api/currency/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setName(data.name || "");
                    setDescription(data.description || "");
                } else {
                    console.error("Failed to load currency:", data.message);
                }
            } catch {
                console.error("Network error while loading currency.");
            }

            setLoading(false);
        };

        loadCurrency();
    }, [id]);

    const submitForm = async () => {
        try {
            const response = await fetch("/api/currency/edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    name,
                    description,
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
            title="Edit currency"
            submitLabel="Save"
            navigateTo="/currencies"
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

export default EditCurrencyPage;
