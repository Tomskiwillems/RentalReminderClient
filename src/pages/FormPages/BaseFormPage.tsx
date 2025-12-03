import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormPageLayout } from "./FormPageLayout";

export interface BaseFormPageProps<TForm, TResponse> {
    title: string;
    submitLabel: string;
    navigateTo: string;

    initialForm: TForm;

    loadUrl?: string;
    saveUrl: string;

    mapLoadResponse?: (response: TResponse) => TForm;

    renderForm: (
        form: TForm,
        setForm: React.Dispatch<React.SetStateAction<TForm>>
    ) => React.ReactNode;

    // Optional function to transform the form before sending to backend
    transformPayload?: (form: TForm) => any;
}

export function BaseFormPage<TForm, TResponse>({
                                                   title,
                                                   submitLabel,
                                                   navigateTo,
                                                   initialForm,
                                                   loadUrl,
                                                   saveUrl,
                                                   mapLoadResponse,
                                                   renderForm,
                                                   transformPayload,
                                               }: BaseFormPageProps<TForm, TResponse>) {
    const navigate = useNavigate();

    const [form, setForm] = useState<TForm>(initialForm);
    const [loading, setLoading] = useState<boolean>(!!loadUrl);
    const [message, setMessage] = useState<string>();
    const [messageType, setMessageType] = useState<"error" | "success">("error");

    // ---- Load existing data (edit mode) ----
    useEffect(() => {
        if (!loadUrl) return;

        const load = async () => {
            try {
                const res = await fetch(loadUrl, { credentials: "include" });
                const data: TResponse = await res.json();

                if (res.ok && mapLoadResponse) {
                    setForm(mapLoadResponse(data));
                } else {
                    setMessage((data as any).message || "Failed to load data.");
                }
            } catch {
                setMessage("Network error.");
            }

            setLoading(false);
        };

        load();
    }, [loadUrl]);

    const handleSubmit = async () => {
        setMessage(undefined);

        try {
            // Transform the form if transformPayload is provided
            const payload = transformPayload ? transformPayload(form) : form;

            const res = await fetch(saveUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessageType("error");
                setMessage(data.message || "Error while saving.");
                return;
            }

            setMessageType("success");
            navigate(navigateTo);
        } catch {
            setMessageType("error");
            setMessage("Network error.");
        }
    };

    if (loading) return <div className="object-page-container">Loading...</div>;

    return (
        <FormPageLayout
            title={title}
            message={message}
            messageType={messageType}
            onSubmit={handleSubmit}
            onCancel={() => navigate(navigateTo)}
            submitLabel={submitLabel}
        >
            {renderForm(form, setForm)}
        </FormPageLayout>
    );
}
