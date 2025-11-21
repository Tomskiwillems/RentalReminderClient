import { RegisterResponse } from "../types/dto";

const API_BASE_URL = 'http://localhost:8080/api';

export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Login failed");
    }

    // If login still returns plain text:
    return response.text();
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
        body: JSON.stringify({ email, password, passwordConfirm }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Backend returns: { message: "error message" }
        throw new Error(data.message || "Register failed");
    }

    return data; // typed as RegisterResponse
}
