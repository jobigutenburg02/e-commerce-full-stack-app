# Tech Stack Used

- The backend is built using **Django**, with the API implemented using the **Django REST Framework (DRF)**, and it provides a robust interface for managing products, users, orders, and shopping cart functionality. It also uses **SQLite3**, Django’s default lightweight database, suitable for development and testing. 
- The frontend is built using **React** with **Vite** tool, and it provides a fast, responsive, and modern user interface for browsing products, adding them to cart, and placing orders.

---

## Features

- RESTful API endpoints for products, categories, and orders
- JWT-based authentication for secure user login
- Admin panel for managing data
- Support for product images, pricing, and inventory
- Implemented payment gateways using PayPal and Flutterwave APIs for seamless online transactions
- Ready-to-use with React frontend

---

## Running the Backend

Open a terminal on VSCode and follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/jobigutenburg02/e-commerce-website-backend.git
```

### 2. Navigate into the backend folder

```bash
cd e-commerce-website-backend
```

### 3. Create a virtual environment and activate it

```bash
python -m venv venv
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Apply migrations

```bash
python manage.py migrate
```

### 6. Start the development server 

```bash
python manage.py runserver
```

### 7. Open your browser and go to [http://localhost:8000](http://localhost:8000)

## Running the Frontend:

Open another terminal on VSCode and follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/jobigutenburg02/e-commerce-website-frontend.git
```

### 2. Navigate into the project directory

```bash
cd e-commerce-website-frontend
```
### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## API Endpoints

Below is a list of available endpoints for interacting with the backend.

### Authentication & Registration

| Endpoint                 | Method | Description                              |
|--------------------------|--------|------------------------------------------|
| `/register/`             | POST   | Register a new user                      |

**Note:** Login can be handled via Django REST Framework JWT or session authentication. Here, I am using JWT authentication.

---

### Cart Management

| Endpoint                 | Method | Description                              |
|--------------------------|--------|------------------------------------------|
| `/add_item/`             | POST   | Add product to cart                      |
| `/update_quantity/`      | PATCH  | Update quantity of item in cart          |
| `/delete_cartitem/`      | DELETE | Remove item from cart                    |
| `/get_cart`              | GET    | Retrieve full cart details               |
| `/product_in_cart`       | GET    | Check if product is in cart              |
| `/get_cart_stat`         | GET    | Get total items in cart                  |

---

### Product Endpoints

| Endpoint                     | Method | Description                          |
|------------------------------|--------|--------------------------------------|
| `/products`                  | GET    | List all products                    |
| `/product_detail/<slug>`     | GET    | Get details of a specific product    |

---

### Payment Endpoints

| Endpoint                     | Method | Description                              |
|------------------------------|--------|------------------------------------------|
|  `/initiate_payment/`        | POST   | Initiate Flutterwave payment             |
| `/payment_callback/`         | POST   | Handle Flutterwave payment confirmation  |
| `/initiate_paypal_payment/`  | POST   | Initiate PayPal payment                  |
| `/paypal_payment_callback/`  | POST   |Handle PayPal payment confirmation        |

---

### User Info

| Endpoint                    | Method | Description                              |
|-----------------------------|--------|------------------------------------------|
| `/get_username`             | GET    | Get currently logged-in user             |
| `/user_info`                | GET    | Get detailed user info                   |


## Payment Gateway Testing

### Flutterwave

Follow these steps to test payments using Flutterwave's sandbox environment:

- Log in to your Flutterwave account and go to [Flutterwave Dashboard](https://dashboard.flutterwave.com)
- Toggle to **Test Mode** (top-right corner)
- Navigate to **Settings > API** to get your secret key
- Configure the settings.py file at the main project directory ('shoppit') in backend

```bash
FLUTTERWAVE_SECRET_KEY=your_secret_key
```
- Replace 'your_secret_key' with your secret key

### PayPal

Follow these steps to test payments using PayPal's sandbox environment

- Log in to your PayPal account and go to [PayPal Developer Dashboard](https://developer.paypal.com/)
- Get both client ID and secret key from **Apps & Credentials** section
- Navigate to **Testing Tools > Sandbox Accounts**
- Create a personal account for testing
- Configure the settings.py file at the backend main-project directory ('shoppit')

```bash
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_SECRET=your_sandbox_secret
```
- Replace 'your_sandbox_client_id' with your client ID and 'your_sandbox_secret' with your secret key

---

Once both the backend and frontend are running, you’ll be able to:
 - Browse products
 - Add items to cart
 - Log in/register
 - Place orders

## Support

For support and questions:
- Create an issue in the repository
- Contact: jbros2513@gmail.com
