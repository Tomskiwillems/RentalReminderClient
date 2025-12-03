import React from "react";
import "./TabSwitcher.css";

export interface Tab {
    key: string;
    label: string;
}

interface TabSwitcherProps {
    tabs: Tab[];
    activeKey: string;
    onChange: (key: string) => void;
    children: React.ReactNode; // the form content for the active tab
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeKey, onChange, children }) => {
    return (
        <div className="tab-switcher">
            {/* --- Tabs Row --- */}
            <div className="tab-switcher-tabs">
                {tabs.map((tab) => (
                    <div
                        key={tab.key}
                        className={`tab-switcher-tab ${tab.key === activeKey ? "active" : ""}`}
                        onClick={() => onChange(tab.key)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {/* --- Content of the active tab --- */}
            <div className="tab-switcher-content">
                {children}
            </div>
        </div>
    );
};

export default TabSwitcher;
