import "./Home.css";

function Home({ goToLogin, goToRegister }) {
    return (
        <main className="home-page">
            <div className="home-backdrop home-backdrop-one" />
            <div className="home-backdrop home-backdrop-two" />

            <section className="home-shell">
                <div className="home-copy">
                    <span className="home-kicker">Habit Tracker</span>
                    <h1>Build a simple routine that actually sticks.</h1>
                    <p>
                        Track habits, mark progress, and keep everything in one
                        clean place. Start with a quick login or create an
                        account in seconds.
                    </p>

                    <div className="home-actions">
                        <button className="home-button primary" onClick={goToLogin}>
                            Login
                        </button>
                        <button className="home-button secondary" onClick={goToRegister}>
                            Register
                        </button>
                    </div>
                </div>

                <div className="home-panel">
                    <div className="home-card home-card-large">
                        <span>Today</span>
                        <strong>Keep the streak going with a focused daily list.</strong>
                    </div>

                    <div className="home-card-grid">
                        <div className="home-card">
                            <span>Focus</span>
                            <strong>One task at a time</strong>
                        </div>
                        <div className="home-card">
                            <span>Progress</span>
                            <strong>Track every day</strong>
                        </div>
                        <div className="home-card">
                            <span>Control</span>
                            <strong>Edit or delete instantly</strong>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;