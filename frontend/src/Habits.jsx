import { useEffect, useState } from "react";
import "./Habits.css";

function Habits({ onLogout }) {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState("");
    const [editingHabitId, setEditingHabitId] = useState(null);
    const [editingName, setEditingName] = useState("");

    useEffect(() => {
        async function getHabits() {
            const token = localStorage.getItem("token");

            const res = await fetch("http://127.0.0.1:8000/habits/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log("HABITS FROM BACKEND:", data);
            setHabits(data);
        }
        getHabits();
    }, []);

    async function createHabit(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/habits/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: newHabit,
            }),
        });

        const data = await res.json();
        setHabits([...habits, data]);
        setNewHabit("");
    }

    async function toggleHabit(habit) {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://127.0.0.1:8000/habits/${habit.id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: habit.name,
                completed: !habit.completed,
            }),
            }
        );

        const updateHabit = await res.json();

        setHabits(
            habits.map((h) => h.id === updateHabit.id ? updateHabit : h)
        );
    }

    async function deleteHabit(habitId) {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://127.0.0.1:8000/habits/${habitId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        } 
        );

        if (res.ok) {
            setHabits(habits.filter((habit) => habit.id !== habitId));
        }
    }

    async function editHabit(habit) {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `http://127.0.0.1:8000/habits/${habit.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: editingName,
                completed: habit.completed,
            }),
        }
    );

    const updatedHabit = await res.json();

    setHabits(
        habits.map((h) =>
            h.id === updatedHabit.id ? updatedHabit : h
        )
    );

    setEditingHabitId(null);
    setEditingName("");
    }

    return (
        <main className="habits-page">
            <div className="habits-page-backdrop habits-page-backdrop-one" />
            <div className="habits-page-backdrop habits-page-backdrop-two" />

            <button className="logout-button" type="button" onClick={onLogout}>
                Logout
            </button>

            <div className="habits-container">
                <section className="habits-hero">
                    <div className="habits-copy">
                        <span className="habits-kicker">Your dashboard</span>
                        <h2>My Habits</h2>
                        <p>
                            Keep your routine in one clean place. Add habits,
                            mark progress, and edit or remove anything anytime.
                        </p>
                    </div>

                    <div className="habits-stats">
                        <div className="habits-stat-card">
                            <span>Total</span>
                            <strong>{habits.length} habits</strong>
                        </div>
                        <div className="habits-stat-card">
                            <span>Active</span>
                            <strong>{habits.filter((habit) => !habit.completed).length} open</strong>
                        </div>
                        <div className="habits-stat-card">
                            <span>Done</span>
                            <strong>{habits.filter((habit) => habit.completed).length} finished</strong>
                        </div>
                    </div>
                </section>

                <section className="habits-card">
                    <form className="habit-form" onSubmit={createHabit}>
                        <input
                            type="text"
                            placeholder="New habit"
                            value={newHabit}
                            onChange={(event) => setNewHabit(event.target.value)}
                        />

                        <button type="submit">Add habit</button>
                    </form>

                    <div className="habits-list">
                        {habits.map((habit) => (
                            <div className="habit-item" key={habit.id}>
                                <input
                                    className="habit-checkbox"
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabit(habit)}
                                />

                                {editingHabitId === habit.id ? (
                                    <div className="edit-container">
                                        <input
                                            className="edit-input"
                                            type="text"
                                            value={editingName}
                                            onChange={(event) =>
                                                setEditingName(event.target.value)
                                            }
                                        />

                                        <button
                                            className="save-button"
                                            onClick={() => editHabit(habit)}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="cancel-button"
                                            onClick={() => {
                                                setEditingHabitId(null);
                                                setEditingName("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <span
                                            className={
                                                habit.completed
                                                    ? "habit-name completed"
                                                    : "habit-name"
                                            }
                                        >
                                            {habit.name}
                                        </span>

                                        <div className="habit-actions">
                                            <button
                                                className="edit-button"
                                                onClick={() => {
                                                    setEditingHabitId(habit.id);
                                                    setEditingName(habit.name);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-button"
                                                onClick={() => deleteHabit(habit.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
);       

}

export default Habits;