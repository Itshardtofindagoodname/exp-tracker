# Expense Tracker Application Documentation

Welcome to the Expense Tracker Application! This guide will walk you through everything you need to know—from what the application does, how the code is organized, to the steps required to set it up and run it on your local machine. Whether you're a beginner or new to web development, this documentation has got you covered.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Understanding the Code](#understanding-the-code)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Overview

The Expense Tracker application is a simple web app that allows you to add and view your expenses. It is built with the following technologies:

- **Backend:** FastAPI (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB (using PyMongo)

In this application, FastAPI serves as the web framework that handles HTTP requests and responses. MongoDB is used to store your expense data, and the static HTML, CSS, and JavaScript files provide the user interface.

## Features

- **Add Expense:** Users can add a new expense by providing a description and amount.
- **View Expenses:** All added expenses are displayed in a table.
- **Simple and Clean UI:** A beginner-friendly interface with clear instructions.

## Project Structure

The project is organized as follows:

```
/expense_tracker
 ├── main.py                # The FastAPI backend application
 └── static                 # Directory for frontend files
      ├── index.html        # The main HTML file for the UI
      ├── style.css         # CSS styling for the application
      └── script.js         # JavaScript for dynamic interaction
```

## Requirements

Before you start, ensure you have the following installed on your system:

- **Python 3.7+**
- **pip** (Python package installer)
- **MongoDB Atlas account** (or a local MongoDB server)

## Installation

1. **Clone the Repository**

   If you have Git installed, you can clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense_tracker.git
   cd expense_tracker
   ```

2. **Create a Virtual Environment (Optional but Recommended)**

   Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate    # On Windows: env\Scripts\activate
   ```

3. **Install Dependencies**

   Install the necessary Python packages using pip:
   ```bash
   pip install fastapi uvicorn pymongo
   ```

## Configuration

The application uses MongoDB as the database. The connection configuration is included in `main.py`:

```python
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://welpicu:AvbECLO0fcMsWeQn@cluster0.u1ufd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

# Test the connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
```

> **Note:** For security reasons, consider storing sensitive information like your MongoDB URI in environment variables instead of hardcoding them.

## Running the Application

Once you have installed the dependencies and configured the application, follow these steps to run it:

1. **Start the FastAPI Server**

   In the project directory, run:
   ```bash
   uvicorn main:app --reload
   ```
   This command starts the FastAPI development server on [http://localhost:8000](http://localhost:8000).

2. **Open the Application**

   Open your web browser and navigate to [http://localhost:8000](http://localhost:8000) to see the Expense Tracker in action.

## API Endpoints

The FastAPI backend exposes two main endpoints:

- **GET `/expenses`**
  - **Description:** Retrieves all expense records from the database.
  - **Response:** JSON list of expenses.
  
- **POST `/expenses`**
  - **Description:** Adds a new expense.
  - **Request Body:** JSON with `description` (string) and `amount` (float).
  - **Response:** JSON message confirming the addition and the new expense ID.

Example using `curl`:
```bash
# Add a new expense
curl -X POST "http://localhost:8000/expenses" \
     -H "Content-Type: application/json" \
     -d '{"description": "Lunch", "amount": 12.50}'

# Get all expenses
curl "http://localhost:8000/expenses"
```

## Understanding the Code

### `main.py`
- **FastAPI Initialization:** Creates an instance of the FastAPI application.
- **Static Files:** Serves the frontend files from the `static` directory.
- **MongoDB Connection:** Establishes a connection to MongoDB using the provided URI.
- **API Endpoints:** Implements endpoints to add and retrieve expenses.
- **Running the App:** Uses `uvicorn` to run the server.

### Frontend Files (in `static` directory)
- **index.html:** Contains the basic HTML structure, including a form for adding expenses and a table to display them.
- **style.css:** Provides basic styling to make the application look clean and modern.
- **script.js:** Contains JavaScript code that interacts with the backend API to submit the expense form and update the expense table dynamically.

## Troubleshooting

- **Server Not Starting:** Ensure you have installed all dependencies and that you are running the command in the correct directory.
- **MongoDB Connection Issues:** Verify your MongoDB URI and check your network connection. You might need to allow your IP address in MongoDB Atlas.
- **Frontend Not Loading:** Make sure that the `static` folder is in the correct location relative to `main.py`.

## Next Steps

Once you're comfortable with the basics, consider exploring these enhancements:
- **Input Validation:** Add more robust validation for user inputs.
- **Edit/Delete Expenses:** Implement endpoints and UI options to modify or delete expenses.
- **User Authentication:** Secure your application by adding user login functionality.
- **Deployment:** Learn how to deploy your FastAPI application to cloud platforms like Heroku, AWS, or DigitalOcean.

---

Happy coding! If you have any questions or need further assistance, feel free to reach out.

