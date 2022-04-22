# A-RESTFUL Routes:
(You need to create a user first then authenticate it to get the token that's required for the other routes)

## 1-Users:

- CREATE route:
  - `api/users`
  - Method: POST

- AUTHENTICATE route:
  - `api/users/authenticate`
  - Method: POST

- INDEX route (Token Required):
  - `api/users`
  - Method: GET

- SHOW route (Token Required):
  - `api/users/:id`
  - Method: GET
  - Args: user_id

- UPDATE route (Token Required):
  - `api/users/:id`
  - Method: PUT
  - Args: user_id

- DELETE route (Token Required):
  - `api/users/:id`
  - Method: DELETE
  - Args: user_id

## 2-Products:

- INDEX route:
  - `api/products`
  - Method: GET

- GET BY CATEGORY route:
  - `api/products/category/:category`
  - Method: GET
  - Args: category

- SHOW route:
  - `api/products/id/:id`
  - Method: GET
  - Args: product_id

- CREATE route (Token Required): 
  - `api/products`
  - Method: POST

## 3-Orders:

- INDEX route (Token Required):
  - `api/orders/:id`
  - Method: GET
  - Args: user_id

- GET CURRENT ORDER route (Token Required):
  - `api/orders/current/:id`
  - Method: GET
  - Args: user_id

- GET COMPLETED ORDERS route (Token Required):
  - `api/orders/completed/:id`
  - Method: GET
  - Args: user_id

- ADD PRODUCTS route (Token Required):
  - (allows the users to add a product to an order so that they can view it in a cart)
  - `api/orders/:id/products`
  - Method: GET
  - Args: product_id

# B-Database Schema:

- Table: `users`
  - id: `serial primary key`
  - email: `varchar`
  - user_name: `varchar`
  - first_name: `varchar`
  - last_name: `varchar`
  - password_digest: `varchar`

- Table: `products`
  - id: `serial primary key`
  - name: `varchar`
  - price: `integer`
  - category: `varchar`

- Table: `orders`
  - id: `serial primary key`
  - status: `varchar`
  - user_id: `bigint` [foreign key to users table]

- Table: `order_products`
  - id: `serial primary key`
  - quantity: `integer`
  - order_id: `bigint` [foreign key to orders table]
  - product_id: `bigint` [foreign key to products table]