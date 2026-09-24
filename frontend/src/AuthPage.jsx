function AuthPage({ title, description, noteCards, children }) {
    return (
        <main className="auth-page">
            <div className="auth-backdrop auth-backdrop-one" />
            <div className="auth-backdrop auth-backdrop-two" />

            <section className="auth-shell">
                <div className="auth-copy">
                    <span className="auth-kicker">Habit Tracker</span>
                    <h1>{title}</h1>
                    <p>{description}</p>

                    <div className="auth-note-grid">
                        {noteCards.map((card) => (
                            <div className="auth-note-card" key={card.title}>
                                <span>{card.title}</span>
                                <strong>{card.text}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                {children}
            </section>
        </main>
    );
}

export default AuthPage;