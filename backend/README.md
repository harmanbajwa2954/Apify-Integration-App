# Apify Integration App

This project is a full-stack web application that allows users to run Apify actors using their Apify API key. It features a React frontend and an Express backend, providing a secure and user-friendly interface for interacting with the Apify platform.

## Features
- Enter your Apify API key securely
- Browse and select available Apify actors
- Fetch and display actor input JSON schema
- Submit input to run actors and view results
- Robust error handling and loading indicators

## Technologies Used
- **Frontend:** React (with functional components and hooks)
- **Backend:** Node.js, Express, Axios
- **Security:** Helmet, CORS, Rate Limiting

## Folder Structure
```
Apify-Integration-App/
├── backend/
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Usage
1. Open the frontend in your browser (`http://localhost:3000`).
2. Enter your Apify API key.
3. Select an actor from the dropdown.
4. Fill out the dynamically generated form based on the actor's input schema.
5. Submit the form to run the actor and view the results.

## Environment Variables
- You can create a `.env` file in the `backend` folder to set custom environment variables (e.g., `PORT`).

## Security
- The backend uses rate limiting and input validation to protect against abuse.
- API keys are never stored on the server.


## Acknowledgements
- [Apify](https://apify.com/) for their powerful automation platform and API.
