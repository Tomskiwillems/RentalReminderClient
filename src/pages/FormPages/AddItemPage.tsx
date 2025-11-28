import React, { useState } from "react";
import FormPage from "./FormPage";

const AddItemPage: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const submitForm = async () => {
        try {
            const response = await fetch("/api/add-item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description
                })
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

    return (
        <FormPage
            title="Add item"
            submitLabel="Add"
            navigateTo="/items"
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

export default AddItemPage;
