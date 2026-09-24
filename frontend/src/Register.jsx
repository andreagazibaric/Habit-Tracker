import { useState } from "react";
import AuthPage from "./AuthPage";
import "./Login.css";

function Register({ onSuccess, goToLogin, goToHome }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(event) {
        event.preventDefault();
        setError("");

        const res = await fetch("http://127.0.0.1:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.detail || "Registration failed");
            return;
        }

        onSuccess(username);
    }

    return (
        <AuthPage
            title="Create your account."
            description="Set up your workspace in a minute and start tracking habits with a clean, focused flow."
            noteCards={[
                { title: "Quick", text: "Simple signup" },
                { title: "Private", text: "Password protected" },
            ]}
        >
            <form className="auth-card" onSubmit={handleRegister}>
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {error ? <p className="auth-error">{error}</p> : null}

                <button type="submit">Create account</button>

                <button
                    type="button"
                    className="auth-switch"
                    onClick={goToLogin}
                >
                    Already have an account? Login
                </button>

                <button
                    type="button"
                    className="auth-switch auth-home-link"
                    onClick={goToHome}
                >
                    Back to home
                </button>
            </form>
        </AuthPage>
    );
}

export default Register;