import React from "react";
import { useParams } from "react-router-dom";
import { BaseFormPage } from "./BaseFormPage";
import { ContactResponse } from "../../types/contact";

type ContactForm = {
    name: string;
    description?: string;
};

const EditContactPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <BaseFormPage<ContactForm, ContactResponse>
            title="Edit Contact"
            submitLabel="Save"
            navigateTo="/contacts"
            initialForm={{ name: "", description: "" }}
            loadUrl={id ? `/api/contacts/${id}` : undefined}
            saveUrl={id ? `/api/contacts/edit/${id}` : "/api/contacts/edit"}
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

export default EditContactPage;
