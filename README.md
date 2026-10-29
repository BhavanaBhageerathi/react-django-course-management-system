# Course Management System

A full-stack Course Management System built using React and Django REST Framework. The application allows authenticated users to manage course records through a web interface and REST APIs.

## Features

- JWT-based user authentication.
- View all available courses.
- Add new courses.
- Edit course names and fees.
- Update a course's fee independently.
- Delete courses.
- Display course information in a table.
- Navigate between pages using React Router.
- Validate course data through Django REST Framework serializers.
- Protect course APIs using JWT authentication.

## Technologies Used

### Frontend

- React
- JavaScript
- React Router
- Bootstrap 5
- Bootstrap Icons
- Fetch API

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- django-cors-headers

### Database

- SQLite

## Project Structure

```text
react-django-course-management-system/
├── frontend/
│   └── frontendapp-react/
├── backend/
│   ├── backendapp/
│   ├── project/
│   ├── manage.py
│   └── requirements.txt
├── screenshots/
│   └── README.md
├── README.md
└── .gitignore
```

## API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint            | Description                          |
| ------ | ------------------- | ------------------------------------ |
| POST   | `/auth/token/`      | Obtain JWT access and refresh tokens |
| GET    | `/courses/`         | Retrieve all courses                 |
| POST   | `/courses/`         | Create a course                      |
| PUT    | `/courses/<id>/`    | Update a course's name and fee       |
| PATCH  | `/courses/<id>/fee` | Update only a course's fee           |
| DELETE | `/courses/<id>/`    | Delete a course                      |

Course endpoints require JWT authentication. Send the access token in the request header:

```http
Authorization: Bearer <access_token>
```

## How It Works

1. The user enters their credentials on the React login page.
2. React sends the credentials to Django's JWT token endpoint.
3. Django returns an access token and a refresh token after successful authentication.
4. React stores the tokens in browser local storage.
5. The dashboard retrieves course data from the protected Django API.
6. Users can add, edit, or delete courses through the interface.
7. Django validates requests and performs the corresponding database operations.

## Getting Started

### Prerequisites

Install the following software:

- Python
- Node.js and npm
- Git

### 1. Set up the backend

Open a terminal in the `backend` folder.

Create and activate a Python virtual environment, then install the dependencies:

```bash
python -m venv .venv
```

On Windows Command Prompt:

```bat
.venv\Scripts\activate
```

Install the requirements:

```bash
python -m pip install -r requirements.txt
```

Configure a secure Django secret key through your local environment before starting the application.

Run database migrations:

```bash
python manage.py migrate
```

Create a user for login:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

`http://127.0.0.1:8000/`

### 2. Set up the frontend

Open a separate terminal in:

`frontend/frontendapp-react/`

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local address displayed by Vite, usually:

`http://localhost:5173/`

### 3. Log in and manage courses

1. Open the React application.
2. Log in using a Django user account.
3. View the available courses on the dashboard.
4. Add, edit, or delete course records.

The frontend API requests currently use `http://127.0.0.1:8000/`. If you change the backend address, update the frontend API configuration accordingly.

## Security Notes

- Do not commit secret keys, passwords, or active JWT tokens.
- The project uses JWT authentication for protected course endpoints.
- Browser local storage is used for token storage in the current implementation.
- Use appropriate security settings before deploying the application publicly.
- This project is intended for learning and portfolio demonstration.

## Future Improvements

- Add a logout feature that clears stored authentication tokens.
- Implement access-token refresh handling.
- Display API validation and authentication errors in the interface.
- Add loading indicators and success messages.
- Move API URLs into environment-based frontend configuration.
- Add automated tests for course CRUD operations.
- Improve form validation and accessibility.

## Author

Developed as a full-stack web development project to practise React, Django REST Framework, REST API integration, JWT authentication, and database operations.
