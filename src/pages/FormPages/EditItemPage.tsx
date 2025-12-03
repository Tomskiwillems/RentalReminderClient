import React from "react";
import { useParams } from "react-router-dom";
import { BaseFormPage } from "./BaseFormPage";
import { ItemResponse } from "../../types/item";

type ItemForm = {
    name: string;
    description?: string;
};

const EditItemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <BaseFormPage<ItemForm, ItemResponse>
            title="Edit Item"
            submitLabel="Save"
            navigateTo="/items"
            initialForm={{ name: "", description: "" }}
            loadUrl={id ? `/api/items/${id}` : undefined}
            saveUrl={id ? `/api/items/edit/${id}` : "/api/items/edit"}
            mapLoadResponse={(response) => ({
                name: response.name ?? "",
                description: response.description ?? ""
            })}
            renderForm={(form, setForm) => (
                <>
                    <div className="form-field-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-field-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            value={form.description ?? ""}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </div>
                </>
            )}
        />
    );
};

export default EditItemPage;
