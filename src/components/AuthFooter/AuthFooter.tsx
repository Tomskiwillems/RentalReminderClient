import React from "react";
import { Link } from "react-router-dom";
import "./AuthFooter.css";

interface AuthFooterProps {
    text: string;
    linkText: string;
    linkTo: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
                                                   text,
                                                   linkText,
                                                   linkTo
                                               }) => {
    return (
        <p className="auth-footer">
            {text}{" "}
            <Link to={linkTo} className="auth-footer-link">
                {linkText}
            </Link>
        </p>
    );
};

export default AuthFooter;