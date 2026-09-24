# Habit Tracker

Simple habit tracking app with a FastAPI backend, PostgreSQL database and a React + Vite frontend.

## Tech Stack

- Frontend: React, Vite
- Backend: FastAPI, SQLAlchemy, JWT auth
- Database: PostgreSQL
- Local orchestration: Docker Compose

## Public Repo Setup

Before running the app locally, copy [`.env.example`](.env.example) to `.env` and fill in the values you want to use locally.

The backend reads env vars from `.env`, and Docker Compose also uses the same values.


## Project Structure

- `backend/` contains the FastAPI API, models, schemas and routers
- `frontend/` contains the React app
- `docker-compose.yml` starts the PostgreSQL container

## Start the App

### 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d db
```

This starts PostgreSQL on `localhost:5432` with:

- database: `habit_tracker`
- user: `habit_user`
- password: `habit_password`

### 2. Start the backend

From the `backend/` directory:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`.

### 3. Start the frontend

From the `frontend/` directory:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## How It Works

- Register a user in the app first.
- Log in to receive a JWT token.
- The token is stored in `localStorage`.
- Habit actions are sent to the backend with the `Authorization: Bearer <token>` header.


## Notes

- The frontend points to `http://127.0.0.1:8000` directly.
- CORS is configured in the backend using `FRONTEND_ORIGIN` from `.env`.
- If you change ports, update the fetch URLs in the frontend and `FRONTEND_ORIGIN` in `.env`.


