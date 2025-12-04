import React from "react";
import { useNavigate } from "react-router-dom";
import "./LinkBox.css";

interface LinkBoxProps {
    children: React.ReactNode;
    navigateTo: string;
}

// Wrapper component that makes the entire box clickable
const LinkBox: React.FC<LinkBoxProps> = ({ children, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo);
    };

    return (
        <button className="link-box" onClick={handleClick}>
            {children}
        </button>
    );
};

export default LinkBox;
