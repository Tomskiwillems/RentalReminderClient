import React, { useEffect, useState} from "react";
import LinkBox from "./../components/LinkBox/LinkBox";
import GridView, { GridColumn } from "./../components/GridView/GridView";
import "./DashboardPage.css";


// Navigation disabled until pages exist
// import { useNavigate } from "react-router-dom";


const DashboardPage: React.FC = () => {
// const navigate = useNavigate();
    const [borrowedGoods, setBorrowedGoods] = useState([]);
    const [lentGoods, setLentGoods] = useState([]);
    const columns: GridColumn[] = [
        { header: "Contact", field: "contact" },
        { header: "Good", field: "good" },
        { header: "Amount", field: "amount" },
        { header: "End Date", field: "endDate" },
        { header: "Start Date", field: "startDate" },
    ];

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
                setBorrowedGoods(data.borrowedGoods);
                setLentGoods(data.lentGoods);
            })
            .catch(err => {
                console.error("Dashboard request failed:", err);
            });
    }, []);


    return (
        <div className="dashboard-page-container">
            {/* Top Navigation Buttons */}
            <div className="dashboard-top-bar">

                <div className="dashboard-top-left">
                    <button className="dashboard-nav-button">Contacts</button>
                    <button className="dashboard-nav-button">Items</button>
                    <button className="dashboard-nav-button">Currencies</button>
                </div>

                <div className="dashboard-top-right">
                    <button className="dashboard-logout-button">Logout</button>
                </div>

            </div>


            {/* Borrowed & Lent Goods Section */}
            <div className="dashboard-goods-section">
                <LinkBox navigateTo="/borrowedGoods">
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


                <LinkBox navigateTo="/lentGoods">
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
                    <button className="dashboard-add-button">
                        Add borrowed good
                    </button>
                </div>

                <div className="dashboard-bottom-column">
                    <button className="dashboard-add-button">
                        Add lent good
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;