import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseFormPage } from "./BaseFormPage";
import { LentGoodEditDataResponse } from "../../types/lentgood";
import { ContactResponse } from "../../types/contact";
import { ItemResponse } from "../../types/item";
import { CurrencyResponse } from "../../types/currency";
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher";

type LentGoodForm = {
    contactId: number | "";
    type: "item" | "currency";
    amount: number;
    itemId: number | null;
    currencyId: number | null;
    endDate?: string;
};

const EditLentGoodPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contacts, setContacts] = useState<ContactResponse[]>([]);
    const [items, setItems] = useState<ItemResponse[]>([]);
    const [currencies, setCurrencies] = useState<CurrencyResponse[]>([]);
    const [initialForm, setInitialForm] = useState<LentGoodForm | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/lent-goods/edit/data/${id}`, { credentials: "include" })
            .then((r) => r.json())
            .then((res: LentGoodEditDataResponse) => {
                setContacts(res.contacts ?? []);
                setItems(res.items ?? []);
                setCurrencies(res.currencies ?? []);

                const lg = res.lentGood;
                if (!lg) {
                    console.error("Lent good data not found");
                    return;
                }

                setInitialForm({
                    contactId: lg.contact?.id ?? "",
                    type: lg.item ? "item" : "currency",
                    amount: lg.amount ?? 1,
                    itemId: lg.item?.id ?? null,
                    currencyId: lg.currency?.id ?? null,
                    endDate: lg.endDate ? lg.endDate.split("T")[0] : ""
                });
            })
            .catch((err) => console.error("Failed to load lent good data", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading || !initialForm) {
        return <div>Loading...</div>;
    }

    const isEditable = false; // fields are read-only except amount/endDate

    return (
        <BaseFormPage<LentGoodForm, LentGoodEditDataResponse>
            title="Edit Lent Good"
            submitLabel="Save"
            navigateTo="/lent-goods"
            initialForm={initialForm}
            saveUrl={`/api/lent-goods/edit/${id}`}
            renderForm={(form, setForm) => {
                const clearOppositeTabFields = (newType: "item" | "currency") => {
                    setForm((prev) => ({
                        ...prev,
                        type: newType,
                        itemId: newType === "item" ? prev.itemId : null,
                        currencyId: newType === "currency" ? prev.currencyId : null
                    }));
                };

                return (
                    <>
                        {/* Contact */}
                        <div className="form-field-group">
                            <select
                                className="form-input"
                                value={form.contactId ?? ""}
                                onChange={(e) =>
                                    isEditable && setForm({ ...form, contactId: Number(e.target.value) })
                                }
                                disabled={!isEditable}
                            >
                                <option value="">
                                    {contacts.find(c => c.id === form.contactId)?.name ?? "Unknown contact"}
                                </option>
                            </select>
                        </div>

                        {/* Tabs */}
                        <TabSwitcher
                            tabs={[
                                { key: "item", label: "Item" },
                                { key: "currency", label: "Currency" }
                            ]}
                            activeKey={form.type}
                            onChange={(key) => isEditable && clearOppositeTabFields(key as "item" | "currency")}
                        >
                            {form.type === "item" && (
                                <div className="form-field-group-inline aligned-inputs">
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-input amount-input"
                                        value={form.amount}
                                        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                                    />

                                    <select
                                        className="form-input full-width-dropdown"
                                        value={form.itemId ?? ""}
                                        disabled
                                    >
                                        <option value="">
                                            {items.find(i => i.id === form.itemId)?.name ?? "Unknown item"}
                                        </option>
                                    </select>
                                </div>
                            )}

                            {form.type === "currency" && (
                                <div className="form-field-group-inline aligned-inputs">
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-input amount-input"
                                        value={form.amount}
                                        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                                    />

                                    <select
                                        className="form-input full-width-dropdown"
                                        value={form.currencyId ?? ""}
                                        disabled
                                    >
                                        <option value="">
                                            {currencies.find(c => c.id === form.currencyId)?.name ?? "Unknown currency"}
                                        </option>
                                    </select>
                                </div>
                            )}
                        </TabSwitcher>

                        {/* End Date */}
                        <div className="form-field-group">
                            <input
                                type="date"
                                className="form-input"
                                value={form.endDate ?? ""}
                                onChange={(e) =>
                                    setForm({ ...form, endDate: e.target.value })
                                }
                            />
                        </div>
                    </>
                );
            }}
            transformPayload={(form) => {
                const payload = {
                    ...form,
                    endDate: form.endDate ? `${form.endDate}T00:00:00` : null
                };
                delete (payload as any).type;
                return payload;
            }}
        />
    );
};

export default EditLentGoodPage;
