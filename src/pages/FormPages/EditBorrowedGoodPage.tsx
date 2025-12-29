import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseFormPage } from "./BaseFormPage";
import { BorrowedGoodEditDataResponse } from "../../types/borrowedgood";
import { ContactResponse } from "../../types/contact";
import { ItemResponse } from "../../types/item";
import { CurrencyResponse } from "../../types/currency";
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher";

type BorrowedGoodForm = {
    contactId: number | "";
    type: "item" | "currency";
    amount: number;
    itemId: number | null;
    currencyId: number | null;
    endDate?: string;
};

const EditBorrowedGoodPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contacts, setContacts] = useState<ContactResponse[]>([]);
    const [items, setItems] = useState<ItemResponse[]>([]);
    const [currencies, setCurrencies] = useState<CurrencyResponse[]>([]);
    const [initialForm, setInitialForm] = useState<BorrowedGoodForm | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/borrowed-goods/edit/data/${id}`, { credentials: "include" })
            .then((r) => r.json())
            .then((res: BorrowedGoodEditDataResponse) => {
                setContacts(res.contacts ?? []);
                setItems(res.items ?? []);
                setCurrencies(res.currencies ?? []);

                const bg = res.borrowedGood;
                if (!bg) {
                    console.error("Borrowed good data not found");
                    return;
                }

                setInitialForm({
                    contactId: bg.contact?.id ?? "",
                    type: bg.item ? "item" : "currency",
                    amount: bg.amount ?? 1,
                    itemId: bg.item?.id ?? null,
                    currencyId: bg.currency?.id ?? null,
                    endDate: bg.endDate ? bg.endDate.split("T")[0] : ""
                });
            })
            .catch((err) => console.error("Failed to load borrowed good data", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading || !initialForm) {
        return <div>Loading...</div>;
    }

    const isEditable = false; // everything controlled by this flag

    return (
        <BaseFormPage<BorrowedGoodForm, BorrowedGoodEditDataResponse>
            title="Edit Borrowed Good"
            submitLabel="Save"
            navigateTo="/borrowed-goods"
            initialForm={initialForm}
            saveUrl={`/api/borrowed-goods/edit/${id}`}
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

export default EditBorrowedGoodPage;
