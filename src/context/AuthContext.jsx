import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --------------------------------
    // Load saved user
    // --------------------------------

    useEffect(() => {
        const savedUser = localStorage.getItem("devcompass_user");

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("devcompass_user");
            }
        }

        setLoading(false);
    }, []);

    async function register(username, email, password) {
        const response = await fetch(
            "http://localhost/devcompass-api/api/register.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "ثبت‌نام ناموفق بود");
        }

        const registeredUser = data.data.user;

        setUser(registeredUser);

        localStorage.setItem(
            "devcompass_user",
            JSON.stringify(registeredUser)
        );

        return registeredUser;
    }

    // --------------------------------
    // Login
    // --------------------------------

    async function login(email, password) {
        const response = await fetch(
            "http://localhost/devcompass-api/api/login.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "ورود ناموفق بود");
        }

        const loggedUser = data.data.user;

        setUser(loggedUser);

        localStorage.setItem(
            "devcompass_user",
            JSON.stringify(loggedUser)
        );

        return loggedUser;
    }

    // --------------------------------
    // Logout
    // --------------------------------

    function logout() {
        setUser(null);
        localStorage.removeItem("devcompass_user");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;