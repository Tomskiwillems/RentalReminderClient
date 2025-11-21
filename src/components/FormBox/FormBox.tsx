import React from "react";
import "./FormBox.css";

interface FormBoxProps {
    title: string;
    message?: string;
    messageType?: "error" | "success"; // new prop
    children: React.ReactNode;
}

const FormBox: React.FC<FormBoxProps> = ({ title, message, messageType = "error", children }) => {
    return (
        <div className="form-box">
            <h2 className="form-title">{title}</h2>
            {message && (
                <div className={`form-message ${messageType}`}>
                    {message}
                </div>
            )}
            {children}
        </div>
    );
};

export default FormBox;
