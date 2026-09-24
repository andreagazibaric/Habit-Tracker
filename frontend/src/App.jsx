import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Habits from "./Habits";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    const [authView, setAuthView] = useState("home");
    const [prefillUsername, setPrefillUsername] = useState("");

    function logout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setAuthView("home");
    }

    if (!isLoggedIn) {
        if (authView === "home") {
            return (
                <Home
                    goToLogin={() => setAuthView("login")}
                    goToRegister={() => setAuthView("register")}
                />
            );
        }

        if (authView === "register") {
            return (
                <Register
                    onSuccess={(username) => {
                        setPrefillUsername(username);
                        setAuthView("login");
                    }}
                    goToHome={() => setAuthView("home")}
                    goToLogin={() => setAuthView("login")}
                />
            );
        }

        return (
            <Login
                onLogin={() => setIsLoggedIn(true)}
                goToHome={() => setAuthView("home")}
                goToRegister={() => setAuthView("register")}
                initialUsername={prefillUsername}
            />
        );
    }

    return (
        <Habits onLogout={logout} />
    );
}

export default App;