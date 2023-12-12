# Django with React Authentication

This project demonstrates a simple implementation of user authentication using Django on the backend and React on the frontend. It utilizes the SimpleJWT library for token-based authentication.

## Features

- User registration and login
- Token-based authentication using SimpleJWT
- Protected routes for authenticated users
- Logout functionality

## Technologies Used

- Django
- Django Rest Framework
- SimpleJWT
- React
- React Router
- Axios

## Installation

### Backend (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/moti9/Django-React-Authentication.git
   cd Django-React-Authentication
   ```
2. Set up a virtual environment and install dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django development server:
   ```bash
   python manage.py runserver
   ```


# Frontend (React)
1. In a new terminal window, navigate to the project root:
   ```bash
   cd Django-React-Authentication
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

# Usage
1. Open your browser and go to http://localhost:8000 to access the React app.
2. Register a new account or log in with existing credentials.
3. Explore the protected routes available to authenticated users.
4. Log out when done.

# Contributing
If you'd like to contribute to this project or want to make it more efficient, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new pull request.

# License
This project is licensed under the MIT License - see the `LICENSE.md` file for details.


