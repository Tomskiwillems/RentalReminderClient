import React from "react";
import "./ObjectPage.css";

interface ObjectPageLayoutProps {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
    bottomButtons?: React.ReactNode;

    /* NEW → delete popup support */
    confirmMessage?: string;
    showDeletePopup?: boolean;
    setShowDeletePopup?: (v: boolean) => void;
    onConfirmDelete?: () => void;
}

const ObjectPageLayout: React.FC<ObjectPageLayoutProps> = ({
                                                               title,
                                                               onBack,
                                                               children,
                                                               bottomButtons,

                                                               confirmMessage,
                                                               showDeletePopup,
                                                               setShowDeletePopup,
                                                               onConfirmDelete
                                                           }) => {
    return (
        <div className="object-page-container">
            {/* Top Bar */}
            <div className="object-top-bar">
                <h2 className="object-title">{title}</h2>
                <button className="object-back-button" onClick={onBack}>
                    Back
                </button>
            </div>

            {/* Main Content */}
            <div className="object-grid-box">{children}</div>

            {/* Bottom Buttons */}
            {bottomButtons && (
                <div className="object-bottom-buttons">
                    {bottomButtons}
                </div>
            )}

            {/* DELETE CONFIRM POPUP */}
            {showDeletePopup && (
                <div className="object-confirm-overlay">
                    <div className="object-confirm-box">
                        <div className="object-confirm-text">
                            {confirmMessage ?? "Are you sure you want to delete this?"}
                        </div>

                        <div className="object-confirm-buttons">
                            <button
                                className="object-confirm-yes"
                                onClick={onConfirmDelete}
                            >
                                Yes
                            </button>

                            <button
                                className="object-confirm-no"
                                onClick={() => setShowDeletePopup?.(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObjectPageLayout;
