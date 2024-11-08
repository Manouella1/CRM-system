CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE Contact_Log (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    type VARCHAR(50),
    note TEXT
);
