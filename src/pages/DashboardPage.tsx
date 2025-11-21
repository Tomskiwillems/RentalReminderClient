import React from "react";
import LinkBox from "./../components/LinkBox/LinkBox";
import GridView, { GridColumn } from "./../components/GridView/GridView";
import "./DashboardPage.css";


// Navigation disabled until pages exist
// import { useNavigate } from "react-router-dom";


const DashboardPage: React.FC = () => {
// const navigate = useNavigate();


    const columns: GridColumn[] = [
        { header: "Contact", field: "contact" },
        { header: "Good", field: "good" },
        { header: "Amount", field: "amount" },
        { header: "End Date", field: "endDate" },
        { header: "Start Date", field: "startDate" },
    ];


    return (
        <div className="dashboard-page-container">
            {/* Top Navigation Buttons */}
            <div className="dashboard-top-buttons">
                <button className="dashboard-nav-button" /*onClick={() => navigate('/contacts')}*/>Contacts</button>
                <button className="dashboard-nav-button" /*onClick={() => navigate('/items')}*/>Items</button>
                <button className="dashboard-nav-button" /*onClick={() => navigate('/currencies')}*/>Currencies</button>
                <button className="dashboard-logout-button" /*onClick={() => navigate('/logout')}*/>Logout</button>
            </div>


            {/* Borrowed & Lent Goods Section */}
            <div className="dashboard-goods-section">
                <LinkBox navigateTo="/borrowedGoods">
                    <div className="dashboard-goods-box">
                        <h3 className="dashboard-goods-title">Borrowed goods</h3>
                        <GridView columns={columns} sortEnabled={true} selectEnabled={false} />
                    </div>
                </LinkBox>


                <LinkBox navigateTo="/lentGoods">
                    <div className="dashboard-goods-box">
                        <h3 className="dashboard-goods-title">Lent goods</h3>
                        <GridView columns={columns} sortEnabled={true} selectEnabled={false} />
                    </div>
                </LinkBox>
            </div>


            {/* Bottom Add Buttons */}
            <div className="dashboard-bottom-buttons">
                <button className="dashboard-add-button" /*onClick={() => navigate('/addBorrowedGood')}*/>
                    Add borrowed good
                </button>
                <button className="dashboard-add-button" /*onClick={() => navigate('/addLentGood')}*/>
                    Add lent good
                </button>
            </div>
        </div>
    );
};


export default DashboardPage;