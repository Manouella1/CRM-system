CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE
);
