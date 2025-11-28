import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBox from "../../components/FormBox/FormBox";
import AuthFooter from "../../components/AuthFooter/AuthFooter";
import { register } from "../../services/AuthService";
import "./AuthenticationPage.css";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const result = await register(email, password, passwordConfirm);

            setSuccessMessage(result.message);

            // Wait 2 seconds then navigate
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error: any) {
            const errorMsg =
                error?.response?.data || error?.message || "Registration failed";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="page-container">
            <div className="auth-wrapper">
                <FormBox
                    title="Rental Reminder"
                    message={errorMessage || successMessage}
                    messageType={successMessage ? "success" : "error"} // <-- use success if available
                >
                <form onSubmit={handleSubmit} className="form-content">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm your Password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="form-input"
                            required
                        />
                        <button type="submit" className="form-button">
                            Register
                        </button>
                    </form>
                </FormBox>

                <AuthFooter
                    text="Already have an account?"
                    linkText="Login"
                    linkTo="/login"
                />
            </div>
        </div>
    );
};

export default RegisterPage;
