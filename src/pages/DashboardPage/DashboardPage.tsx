// src/pages/DashboardPage/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkBox from "../../components/LinkBox/LinkBox";
import GridView, { GridColumn } from "../../components/GridView/GridView";
import "./DashboardPage.css";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [borrowedGoods, setBorrowedGoods] = useState<any[]>([]);
    const [lentGoods, setLentGoods] = useState<any[]>([]);
    const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const columns: GridColumn[] = [
        { header: "Contact", field: "contact" },
        { header: "Good", field: "good" },
        { header: "Amount", field: "amount" },
        { header: "End Date", field: "endDate" },
        { header: "Start Date", field: "startDate" },
    ];

    // Logout handler
    const handleLogout = () => {
        console.log("Logout clicked");
        fetch("/api/logout", {
            method: "POST",
            credentials: "include"
        })
            .then(async (res) => {
                const data = await res.json();
                setLogoutMessage(data.message);
                setShowLogoutModal(true); // show modal
                return new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 sec
            })
            .then(() => {
                setShowLogoutModal(false); // hide modal
                navigate("/login"); // redirect
            })
            .catch(err => console.error("Logout failed:", err));
    };

    // Fetch dashboard data
    useEffect(() => {
        fetch("/api/dashboard", {
            method: "GET",
            credentials: "include"
        })
            .then(async res => {
                console.log("Dashboard Response Status:", res.status);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Dashboard data:", data);

                const formatDate = (dateStr?: string) =>
                    dateStr ? new Date(dateStr).toLocaleDateString() : "";

                // Safely map borrowed goods
                const borrowedGoodsFormatted = (data.borrowedGoodsResponse?.borrowedGoods || []).map((bg: any) => ({
                    id: bg.id,
                    contact: bg.contact?.name || "",
                    good: bg.item?.name || bg.currency?.name || "",
                    amount: bg.amount || "",
                    startDate: formatDate(bg.startDate),
                    endDate: formatDate(bg.endDate)
                }));

                // Safely map lent goods
                const lentGoodsFormatted = (data.lentGoodsResponse?.lentGoods || []).map((lg: any) => ({
                    id: lg.id,
                    contact: lg.contact?.name || "",
                    good: lg.item?.name || lg.currency?.name || "",
                    amount: lg.amount || "",
                    startDate: formatDate(lg.startDate),
                    endDate: formatDate(lg.endDate)
                }));

                setBorrowedGoods(borrowedGoodsFormatted);
                setLentGoods(lentGoodsFormatted);
            })
            .catch(err => console.error("Dashboard request failed:", err));
    }, [navigate]);


    return (
        <div className="dashboard-page-container">

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{logoutMessage}</p>
                    </div>
                </div>
            )}

            {/* Top Navigation */}
            <div className="dashboard-top-bar">
                <div className="dashboard-top-left">
                    <button className="dashboard-nav-button" onClick={() => navigate("/contacts")}>Contacts</button>
                    <button className="dashboard-nav-button" onClick={() => navigate("/items")}>Items</button>
                    <button className="dashboard-nav-button" onClick={() => navigate("/currencies")}>Currencies</button>
                </div>

                <div className="dashboard-top-right">
                    <button className="dashboard-logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Borrowed & Lent Goods Section */}
            <div className="dashboard-goods-section">
                <LinkBox navigateTo="/borrowed-goods">
                    <div className="dashboard-goods-box">
                        <h3 className="dashboard-goods-title">Borrowed goods</h3>
                        <GridView
                            columns={columns}
                            data={borrowedGoods}
                            sortEnabled={true}
                            selectEnabled={false}
                        />
                    </div>
                </LinkBox>

                <LinkBox navigateTo="/lent-goods">
                    <div className="dashboard-goods-box">
                        <h3 className="dashboard-goods-title">Lent goods</h3>
                        <GridView
                            columns={columns}
                            data={lentGoods}
                            sortEnabled={true}
                            selectEnabled={false}
                        />
                    </div>
                </LinkBox>
            </div>

            {/* Bottom Add Buttons */}
            <div className="dashboard-bottom-buttons">
                <div className="dashboard-bottom-column">
                    <button className="dashboard-add-button" onClick={() => navigate("/borrowed-goods/add")}>Add borrowed good</button>
                </div>
                <div className="dashboard-bottom-column">
                    <button className="dashboard-add-button" onClick={() => navigate("/lent-goods/add")}>Add lent good</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;