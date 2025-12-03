import React from "react";
import { BaseFormPage } from "./BaseFormPage";
import { ItemResponse } from "../../types/item";

type ItemForm = {
    name: string;
    description?: string;
};

const initialForm: ItemForm = {
    name: "",
    description: ""
};

const AddItemPage: React.FC = () => {
    return (
        <BaseFormPage<ItemForm, ItemResponse>
            title="Add Item"
            submitLabel="Add"
            navigateTo="/items"
            initialForm={initialForm}
            saveUrl="/api/items/add"
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

export default AddItemPage;
