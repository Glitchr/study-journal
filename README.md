# Study Journal

A web app for organizing self-study: courses, subjects and tasks, a study timer, progress charts, and achievements that unlock as you work. Built in 2023 as a personal project, before my first engineering job.

## Stack

- **Backend:** Django 4.2 and Django REST Framework, JWT auth (Simple JWT), PostgreSQL
- **Real time:** Django Channels on Daphne and Redis. A WebSocket consumer pushes a notification to the browser when an achievement unlocks.
- **Frontend:** React 18 with React Router and React Bootstrap

## How it is organized

Each domain is its own Django app with its own models, serializers, views and tests: `accounts`, `courses`, `subjects`, `categories`, `tasks`, `timer` and `achievements`. Achievements store their unlock criteria as JSON, so a new badge is data, not code. The React frontend in `frontend/` talks to the REST API under `/api/` and holds one component folder per area.

## Running it locally

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver        # needs Redis running for Channels

cd frontend
npm install
npm start
```

Settings are read from a `.env` file through `python-decouple`.

## Tests

```bash
python manage.py test
```
