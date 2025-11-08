# Vibe-Commerce

## Features

* **Product Page**: Browse all available products in a responsive grid and add items to the cart.
* **Cart Page:** View all items added to the cart. Users can update item quantities, remove items, and view the total price.
* **Checkout Form:** A simple form to collect user details (name/email) to proceed with the mock checkout.
* **Order Receipt:** After a successful checkout, a receipt modal is displayed showing the order total and a timestamp.
* **Responsive Design:** The application is fully responsive for both desktop and mobile views.

---

## 💻 Tech Stack

### Frontend
* **React.js:** For building the user interface.
* **React Router DOM:** For client-side routing and navigation between pages.
* **Axios:** For making HTTP requests to the backend API.

### Backend
* **Node.js:** Server-side runtime environment.
* **Express.js:** Web framework for building REST APIs, routing, and handling middleware.
* **MongoDB:** NoSQL database used to store product, cart, and order data (using Mongoose).
* **Libraries:**
    * `cors`: To enable Cross-Origin Resource Sharing.
    * `dotenv`: To manage environment variables.
    * `nodemon`: For automatic server restarts during development.

---

## 📂 Project Architecture (Backend)

The backend code is structured following the **MVC (Model-View-Controller)** pattern:
* **Models:** Defines the Mongoose schemas for `Product`, `Cart`, and `Order`.
* **Controllers:** Contains all the business logic for handling requests (e.g., `getProducts`, `addToCart`, `createOrder`).
* **Routes:** Maps the API endpoints to the corresponding controller functions.

---

## 🚀 How to Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
* Node.js (v18 or later)
* A running MongoDB instance (either local or a free Atlas cluster)

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the required NPM packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` root and add your environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```
4.  Start the backend server using `nodemon`:
    ```bash
    nodemon server.js
    ```
    *The server will be running on `http://localhost:5000`.*

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the required NPM packages (including `axios` and `react-router-dom`):
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm run dev
    ```
    *The application will automatically open in your browser at `http://localhost:3000`.
---

## 📹 Demo Video

*(As required by the assignment deliverables)*

[https://drive.google.com/file/d/1g_Jo-SHok-H7l_mTK5sLQjBEjR2vb775/view?usp=drive_link]


## 📸 Screenshots

*(As required by the assignment deliverables)*

### 1. Product Page  [https://drive.google.com/file/d/16wdR5Fq1A3QCUo5UHJiGAFA8xCAqmkqT/view?usp=drive_link]


### 2. Cart Page [https://drive.google.com/file/d/1G0DnWnA5ANyz7vm1hj4a9M93jFlNhvQk/view?usp=drive_link]


### 3. Checkout Receipt Modal [https://drive.google.com/file/d/1LjrfIRkSczeua9MbLcTUGYHf3ZUcqwDR/view?usp=drive_link]





