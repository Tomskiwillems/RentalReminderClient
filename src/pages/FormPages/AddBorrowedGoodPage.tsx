import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPage from "./FormPage";
import "./FormPage.css";

// Types
interface Contact {
    id: number;
    name: string;
}

interface Item {
    id: number;
    name: string;
}

interface Currency {
    id: number;
    name: string;
}

const AddBorrowedGoodPage: React.FC = () => {
    const navigate = useNavigate();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    const [contactId, setContactId] = useState<number | "">("");
    const [activeTab, setActiveTab] = useState<"item" | "currency">("item");
    const [amount, setAmount] = useState<number | "">("");
    const [selectedItemId, setSelectedItemId] = useState<number | "">("");
    const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | "">("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        const loadData = async () => {
            const c = await fetch("/api/contacts/list").then((res) => res.json());
            const i = await fetch("/api/items/list").then((res) => res.json());
            const cu = await fetch("/api/currencies/list").then((res) => res.json());
            setContacts(c);
            setItems(i);
            setCurrencies(cu);
        };

        loadData();
    }, []);

    const handleSubmit = async () => {
        try {
            const payload: any = {
                contactId,
                amount,
                endDate: endDate || null,
                type: activeTab,
                itemId: activeTab === "item" ? selectedItemId : null,
                currencyId: activeTab === "currency" ? selectedCurrencyId : null,
            };

            const response = await fetch("/api/borrowed/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const err = await response.json();
                return {
                    success: false,
                    message: err.message || "Failed to add borrowed good",
                };
            }

            // everything OK
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.message || "Unknown error",
            };
        }
    };

    return (
        <FormPage
            title="Add Borrowed Good"
            submitLabel="Add"
            navigateTo="/borrowed-good"
            onSubmit={handleSubmit}
        >
            {/* Contact Select */}
            <div className="form-field-group">
                <label className="form-label">Contact</label>
                <select
                    className="form-input"
                    value={contactId}
                    onChange={(e) => setContactId(Number(e.target.value))}
                >
                    <option value="">Choose a contact</option>
                    {contacts.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Item/Currency Tabs */}
            <div className="tab-container">
                <button
                    type="button"
                    className={`tab-button ${activeTab === "item" ? "active" : ""}`}
                    onClick={() => setActiveTab("item")}
                >
                    Item
                </button>
                <button
                    type="button"
                    className={`tab-button ${activeTab === "currency" ? "active" : ""}`}
                    onClick={() => setActiveTab("currency")}
                >
                    Currency
                </button>
            </div>

            <div className="tab-content">
                <div className="form-field-group-inline">
                    <div>
                        <label className="form-label">Amount</label>
                        <input
                            className="form-input"
                            type="number"
                            min={0}
                            step={1}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="form-label">
                            {activeTab === "item" ? "Item" : "Currency"}
                        </label>
                        <select
                            className="form-input"
                            value={activeTab === "item" ? selectedItemId : selectedCurrencyId}
                            onChange={(e) =>
                                activeTab === "item"
                                    ? setSelectedItemId(Number(e.target.value))
                                    : setSelectedCurrencyId(Number(e.target.value))
                            }
                        >
                            <option value="">
                                {activeTab === "item"
                                    ? "Choose an item"
                                    : "Choose a currency"}
                            </option>

                            {activeTab === "item"
                                ? items.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))
                                : currencies.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Optional End Date */}
            <div className="form-field-group">
                <label className="form-label">End date (optional)</label>
                <input
                    type="date"
                    className="form-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </FormPage>
    );
};

export default AddBorrowedGoodPage;
