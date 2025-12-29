// src/pages/forms/FormPageLayout.tsx
import React from "react";
import FormBox from "../../components/FormBox/FormBox";
import "./FormPage.css";

interface FormPageLayoutProps {
    title: string;
    message?: string;
    messageType?: "success" | "error";
    onSubmit: () => void;
    onCancel: () => void;
    submitLabel: string;
    children: React.ReactNode;
}

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({
                                                                  title,
                                                                  message,
                                                                  messageType = "error",
                                                                  onSubmit,
                                                                  onCancel,
                                                                  submitLabel,
                                                                  children
                                                              }) => {
    return (
        <div className="object-page-container">
            <FormBox title={title} message={message} messageType={messageType}>
                {children}

                <div className="object-bottom-buttons" style={{ marginTop: "25px" }}>
                    <button className="object-action-button" onClick={onSubmit}>
                        {submitLabel}
                    </button>

                    <button className="object-delete-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </FormBox>
        </div>
    );
};
