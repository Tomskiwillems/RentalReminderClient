import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBox from "../components/FormBox/FormBox";
import AuthFooter from "../components/AuthFooter/AuthFooter";
import { login } from "../services/AuthService";
import "./AuthenticationPage.css";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await login(email, password);
            setSuccessMessage(response.message);
            // Wait 2 seconds then navigate
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error: any) {
            const errorMsg =
                error?.response?.data || error?.message || "Login failed";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="page-container">
            <div className="auth-wrapper">
                <FormBox title="Rental Reminder"
                         message={errorMessage || successMessage}
                         messageType={successMessage ? "success" : "error"}
                >
                    <form onSubmit={handleSubmit} className="form-content">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                        <button type="submit" className="form-button">
                            Login
                        </button>
                    </form>
                </FormBox>

                <AuthFooter
                    text="Don't have an account?"
                    linkText="Register"
                    linkTo="/register"
                />
            </div>
        </div>
    );
};

export default LoginPage;