import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBox from "../../components/FormBox/FormBox";
import "./FormPage.css"; // input styling (same file as before)

interface FormPageProps {
    title: string;
    submitLabel: string;
    navigateTo: string; // where to go after success
    onSubmit: () => Promise<{ success: boolean; message?: string }>;
    children: React.ReactNode;
}

const FormPage: React.FC<FormPageProps> = ({
                                               title,
                                               submitLabel,
                                               navigateTo,
                                               onSubmit,
                                               children,
                                           }) => {
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>();
    const [messageType, setMessageType] = useState<"error" | "success">("error");

    const handleSubmit = async () => {
        setMessage(undefined);

        const result = await onSubmit();

        if (result.success) {
            setMessageType("success");
            navigate(navigateTo);
        } else {
            setMessageType("error");
            setMessage(result.message || "An error occurred.");
        }
    };

    const handleCancel = () => navigate(navigateTo);

    return (
        <div className="object-page-container">
            <FormBox title={title} message={message} messageType={messageType}>
                {children}

                <div className="object-bottom-buttons" style={{ marginTop: "25px" }}>
                    <button className="object-action-button" onClick={handleSubmit}>
                        {submitLabel}
                    </button>

                    <button className="object-delete-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </FormBox>
        </div>
    );
};

export default FormPage;
