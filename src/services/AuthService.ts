import { RegisterResponse, LoginResponse } from "../types/authentication";

// Use relative paths - proxy will handle routing to backend
// Development: setupProxy.js proxies /api/* to localhost:8080
// Production: Express server proxies /api/* to backend URL
const API_BASE_URL = '/api';

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Important: include cookies
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
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Important: include cookies
        body: JSON.stringify({ email, password, passwordConfirm }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Register failed");
    }

    return data;
}
