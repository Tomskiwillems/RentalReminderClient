import React, { useEffect, useState } from "react";
import { BaseFormPage } from "./BaseFormPage";
import { BorrowedGoodAddDataResponse } from "../../types/borrowedgood";
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

const initialForm: BorrowedGoodForm = {
    contactId: "",
    type: "item",
    amount: 1,
    itemId: null,
    currencyId: null,
    endDate: ""
};

const AddBorrowedGoodPage: React.FC = () => {
    const [contacts, setContacts] = useState<ContactResponse[]>([]);
    const [items, setItems] = useState<ItemResponse[]>([]);
    const [currencies, setCurrencies] = useState<CurrencyResponse[]>([]);

    useEffect(() => {
        fetch("/api/borrowed-goods/add/data", { credentials: "include" })
            .then((r) => r.json())
            .then((res: BorrowedGoodAddDataResponse) => {
                setContacts(res.contacts ?? []);
                setItems(res.items ?? []);
                setCurrencies(res.currencies ?? []);
            })
            .catch((err) => console.error("Failed to load borrowed good data", err));
    }, []);

    return (
        <BaseFormPage<BorrowedGoodForm, BorrowedGoodAddDataResponse>
            title="Add Borrowed Good"
            submitLabel="Add"
            navigateTo="/borrowed-goods"
            initialForm={initialForm}
            saveUrl="/api/borrowed-goods/add"
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
                                value={form.contactId}
                                onChange={(e) =>
                                    setForm({ ...form, contactId: Number(e.target.value) })
                                }
                            >
                                <option value="">Choose a contact</option>
                                {contacts.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tabs */}
                        <TabSwitcher
                            tabs={[
                                { key: "item", label: "Item" },
                                { key: "currency", label: "Currency" }
                            ]}
                            activeKey={form.type}
                            onChange={(key) => clearOppositeTabFields(key as "item" | "currency")}
                        >
                            {form.type === "item" && (
                                <div className="form-field-group-inline aligned-inputs">
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-input amount-input"
                                        value={form.amount}
                                        onChange={(e) =>
                                            setForm({ ...form, amount: Number(e.target.value) })
                                        }
                                    />

                                    <select
                                        className="form-input full-width-dropdown"
                                        value={form.itemId ?? ""}
                                        onChange={(e) =>
                                            setForm({ ...form, itemId: Number(e.target.value) })
                                        }
                                    >
                                        <option value="">Choose an item</option>
                                        {items.map((i) => (
                                            <option key={i.id} value={i.id}>
                                                {i.name}
                                            </option>
                                        ))}
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
                                        onChange={(e) =>
                                            setForm({ ...form, amount: Number(e.target.value) })
                                        }
                                    />

                                    <select
                                        className="form-input full-width-dropdown"
                                        value={form.currencyId ?? ""}
                                        onChange={(e) =>
                                            setForm({ ...form, currencyId: Number(e.target.value) })
                                        }
                                    >
                                        <option value="">Choose a currency</option>
                                        {currencies.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
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
                // Convert endDate to LocalDateTime format and remove 'type'
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

export default AddBorrowedGoodPage;
