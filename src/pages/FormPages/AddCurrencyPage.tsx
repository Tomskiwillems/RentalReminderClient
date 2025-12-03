import React from "react";
import { BaseFormPage } from "./BaseFormPage";
import { CurrencyResponse } from "../../types/currency";

type CurrencyForm = {
    name: string;
    description?: string;
};

const initialForm: CurrencyForm = {
    name: "",
    description: ""
};

const AddCurrencyPage: React.FC = () => {
    return (
        <BaseFormPage<CurrencyForm, CurrencyResponse>
            title="Add Currency"
            submitLabel="Add"
            navigateTo="/currencies"
            initialForm={initialForm}
            saveUrl="/api/currencies/add"
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

export default AddCurrencyPage;
