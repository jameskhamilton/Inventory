# Full-Stack React and Flask Application with MongoDB Atlas

This is a full-stack web application using React for the frontend and Flask for the backend. User data is stored persistently in MongoDB Atlas, a cloud-hosted NoSQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Frontend Setup](#frontend-setup)
- [Backend Setup with MongoDB Atlas](#backend-setup-with-mongodb-atlas)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)

---

## Prerequisites

Ensure you have the following installed:

1. **Python**: Download from [Python official site](https://www.python.org/downloads/) (used for Flask).
2. **Node.js and npm**: Download from [Node.js official site](https://nodejs.org/).
3. **Git**: [Download and install Git](https://git-scm.com/downloads) if you want to clone this project from a repository.
4. **MongoDB Atlas Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud-hosted MongoDB database.

---

## Project Setup

1. **Clone the Repository** (or download the project files):
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Directory Structure**:
   - The project has two main directories:
     - `/backend` for the Flask server.
     - `/frontend` for the React app.

---

## Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install React dependencies:
   ```bash
   npm install
   ```

---

## Backend Setup with MongoDB Atlas

1. Navigate to the `backend` folder:
   ```bash
   cd ../backend
   ```

2. Set up a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` folder to store environment variables and configure the MongoDB connection.

### MongoDB Atlas Configuration

1. **Create a MongoDB Atlas Cluster**:
   - Sign up for MongoDB Atlas and create a new cluster.
   - Set up database access with a username and password.
   - Add your IP address to the network access list to allow connections.

2. **Get Your MongoDB Atlas Connection String**:
   - In MongoDB Atlas, go to the "Connect" section.
   - Select "Connect your application" and copy the connection string.
   - Replace `<username>`, `<password>`, and `<dbname>` in the connection string with your MongoDB Atlas credentials.

3. **Configure Your `.env` File**:
   - In your `.env` file, add the MongoDB Atlas connection string:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Set Up Flask-MongoEngine Connection**:
   - In `app.py` or `config.py`, ensure you have the following setup to connect to MongoDB Atlas:

   ```python
   from flask import Flask
   from flask_mongoengine import MongoEngine
   import os

   app = Flask(__name__)
   app.config['MONGODB_SETTINGS'] = {
       'host': os.getenv('MONGO_URI')
   }

   db = MongoEngine(app)
   ```

---

## Running the Application

1. **Run the Backend**: In the `backend` folder, start the Flask server:
   ```bash
   flask run
   ```

2. **Run the Frontend**: In a new terminal window, navigate to the `frontend` folder and start the React app:
   ```bash
   npm start
   ```

3. Visit the application at `http://localhost:3000` for the frontend, and access backend API routes at `http://localhost:5000/api/users`.

---

## Available Scripts

### Backend (in `backend` folder)

- `flask run`: Runs the Flask server.

### Frontend (in `frontend` folder)

- `npm start`: Runs the React development server.

---

## License

This project is open-source and available under the MIT License.

---

This README should help guide you through setup for a Flask and React application with MongoDB Atlas. Let me know if you need further adjustments!