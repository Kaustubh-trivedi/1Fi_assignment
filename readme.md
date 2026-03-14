# Snapmint-style Product EMI Demo (Full Stack Assignment)

This project is a **Full Stack Product EMI Selection System** inspired by the product flow used by Snapmint.
It allows users to:

* View a list of products
* Select product variants (Color + Storage)
* View dynamic EMI plans
* Select an EMI plan
* Confirm the plan through a modal summary

The system is built using **React (Vite), Redux Toolkit, Express.js, and MongoDB** following a **production-style MVC + Service architecture**.

---

# 1. Setup and Run Instructions

## 1.1 Clone the Repository

```
git clone <repo-url>
cd snapmint-assignment
```

Project Structure:

```
snapmint-assignment
│
├── backend
└── frontend
```

---

# 1.2 Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=extraced from env
```

Run MongoDB locally.

Seed the database:

```
node seed/seed.js
```

Start backend server:

```
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

# 1.3 Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 2. API Endpoints

Base URL:

```
/api/products
```

---

## 2.1 Get All Products

Endpoint:

```
GET /api/products
```

Purpose:

Returns list of products for homepage.

Example Response:

```json
[
  {
    "_id": "64f3c1...",
    "name": "Samsung Galaxy S24",
    "slug": "samsung-galaxy-s24",
    "variants": [
      {
        "color": "Titanium Black",
        "storage": "256GB",
        "price": 79999,
        "images": [
          "http://localhost:5000/uploads/s24-black-1.png"
        ]
      }
    ]
  }
]
```

---

## 2.2 Get Product Details

Endpoint:

```
GET /api/products/:slug
```

Example:

```
GET /api/products/samsung-galaxy-s24
```

Purpose:

Returns product details with variants and available EMI plans.

Example Response:

```json
{
  "product": {
    "name": "Samsung Galaxy S24",
    "slug": "samsung-galaxy-s24",
    "variants": [
      {
        "_id": "variant1",
        "color": "Titanium Black",
        "storage": "256GB",
        "price": 79999,
        "images": [
          "http://localhost:5000/uploads/s24-black.png"
        ]
      },
      {
        "_id": "variant2",
        "color": "Gray",
        "storage": "512GB",
        "price": 89999,
        "images": [
          "http://localhost:5000/uploads/s24-gray.png"
        ]
      }
    ]
  },
  "emiPlans": [
    {
      "_id": "plan1",
      "months": 3,
      "interestRate": 0,
      "cashback": 500
    },
    {
      "_id": "plan2",
      "months": 6,
      "interestRate": 10.5,
      "cashback": 1000
    }
  ]
}
```

EMI amount is calculated on frontend using:

```
monthly EMI = (price + price * interestRate / 100) / months
```

---

# 3. Tech Stack Used

## Frontend

* React (Vite)
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios

Key Features:

* Variant selection (color + storage)
* Dynamic EMI calculation
* EMI plan selection
* Tailwind modal for EMI confirmation
* Responsive layout

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

Architecture:

```
MVC + Services Pattern
```

Structure:

```
controllers
services
models
routes
middlewares
utils
config
seed
```

Other Libraries:

* Multer (for image uploads)
* dotenv
* cors
* nodemon

---

# 4. Database Schema

## 4.1 Product Schema

```
Product
```

```js
{
  name: String,
  slug: String,
  description: String,
  variants: [
    {
      color: String,
      storage: String,
      price: Number,
      images: [String]
    }
  ]
}
```

Example Variants:

```
iPhone 15

Orange 128GB
Orange 256GB
Blue 128GB
Blue 512GB
Black 256GB
Black 512GB
```

Each **color + storage combination is stored as a variant**.

---

## 4.2 EMI Plan Schema

```
EmiPlan
```

```js
{
  months: Number,
  interestRate: Number,
  cashback: Number
}
```

Example:

```
3 months  → 0% interest → ₹500 cashback
6 months  → 10.5% interest → ₹1000 cashback
9 months  → 12% interest → ₹1500 cashback
```

---

# 5. EMI Calculation Logic

EMI is dynamically calculated based on selected variant.

Formula used:

```
monthlyAmount =
(price + price * interestRate/100) / months
```

Example:

```
Price: ₹90,000
Interest: 10%
Tenure: 6 months

Total = 90000 + 9000 = 99000
EMI = 99000 / 6 = ₹16500
```

---

# 6. Features Implemented

* Product listing page
* Product detail page
* Variant selection (Color + Storage)
* Dynamic price updates
* Dynamic EMI calculation
* Cashback display
* EMI selection UI
* EMI confirmation modal
* Responsive layout using Tailwind

---

# 7. Project Folder Structure

## Backend

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   └── product.controller.js
│
├── middleware
│
├── models
│   ├── product.model.js
│   └── emiPlan.model.js
│
├── routes
│   └── product.routes.js
│
├── services
│   └── product.service.js
│
├── utils
│   └── emiCalculator.js
│
├── seed
│   └── seed.js
│
├── app.js
└── server.js
```

---

## Frontend

```
frontend
│
├── components
│   └── ProductCard.jsx
│
├── features
│   └── products
│       └── productSlice.js
│
├── pages
│   ├── HomePage.jsx
│   └── ProductPage.jsx
│
├── services
│   └── productApi.js
│
└── main.jsx
```

---

# 8. Notes

* Maximum 5 images per product variant supported.
* EMI plans are reusable across products.
* EMI amount dynamically updates based on selected variant.
* Modal confirms user EMI selection before proceeding.

---

# 9. Future Improvements

* Add checkout flow
* User authentication
* Payment integration
* Admin product management
* Pagination and search
* Caching using Redis

---

**Author:**
Kaustubh Trivedi
Full Stack Developer
