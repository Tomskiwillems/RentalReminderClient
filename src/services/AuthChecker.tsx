import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AuthChecker: React.FC = () => {
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        fetch("/api/validate", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) throw new Error("not authorized");
                return res.json();
            })
            .then((json) => {
                // optionally check json.user or json.valid
                setAuthenticated(true);
            })
            .catch((err) => {
                console.warn("Token invalid or expired:", err);
                setAuthenticated(false);
            })
            .finally(() => {
                setChecking(false);
            });
    }, [navigate]);

    if (checking) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AuthChecker;