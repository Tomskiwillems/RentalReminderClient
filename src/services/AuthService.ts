import { RegisterResponse, LoginResponse } from "../types/authentication";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
}

export async function register(
    email: string,
    password: string,
    passwordConfirm: string
): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, passwordConfirm }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Register failed");
    }

    return data;
}
