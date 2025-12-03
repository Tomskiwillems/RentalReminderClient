import React from "react";
import { BaseFormPage } from "./BaseFormPage";
import { ContactResponse } from "../../types/contact";

type ContactForm = {
    name: string;
    description?: string;
};

const initialForm: ContactForm = {
    name: "",
    description: ""
};

const AddContactPage: React.FC = () => {
    return (
        <BaseFormPage<ContactForm, ContactResponse>
            title="Add Contact"
            submitLabel="Add"
            navigateTo="/contacts"
            initialForm={initialForm}
            saveUrl="/api/contacts/add"
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

export default AddContactPage;
