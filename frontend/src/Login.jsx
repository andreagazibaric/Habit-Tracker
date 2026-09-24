import { useState } from "react";
import AuthPage from "./AuthPage";
import "./Login.css";

function Login({ onLogin, goToRegister, goToHome, initialUsername = "" }) {
    const [username, setUsername] = useState(initialUsername);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        setError("");

        const res = await fetch("http://127.0.0.1:8000/auth/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.detail || "Login failed");
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        onLogin();
    }

    return (
        <AuthPage
            title="Welcome back."
            description="Log in to continue your daily routine and keep your habit streak moving forward."
            noteCards={[
                { title: "Secure", text: "JWT login" },
                { title: "Fast", text: "One-screen access" },
            ]}
        >
            <form className="auth-card" onSubmit={handleLogin}>
                <h2>Login</h2>

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

                <button type="submit">Login</button>

                <button
                    type="button"
                    className="auth-switch auth-home-link"
                    onClick={goToRegister}
                >
                    No account yet? Register
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

export default Login;