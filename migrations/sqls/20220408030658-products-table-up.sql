CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(70),
    price integer NOT NULL,
    category VARCHAR(100)
);