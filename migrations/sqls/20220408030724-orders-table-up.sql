CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(70), 
    user_id bigint REFERENCES users(id)
);