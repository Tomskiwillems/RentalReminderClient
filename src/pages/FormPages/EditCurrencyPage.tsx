import React from "react";
import { useParams } from "react-router-dom";
import { BaseFormPage } from "./BaseFormPage";
import { CurrencyResponse } from "../../types/currency";

type CurrencyForm = {
    name: string;
    description?: string;
};

const EditCurrencyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <BaseFormPage<CurrencyForm, CurrencyResponse>
            title="Edit Currency"
            submitLabel="Save"
            navigateTo="/currencies"
            initialForm={{ name: "", description: "" }}
            loadUrl={id ? `/api/currencies/${id}` : undefined}
            saveUrl={id ? `/api/currencies/edit/${id}` : "/api/currencies/edit"}
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

export default EditCurrencyPage;
