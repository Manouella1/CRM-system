DROP TABLE IF EXISTS Send_Log CASCADE;
DROP TABLE IF EXISTS Customer_Tag CASCADE;
DROP TABLE IF EXISTS Contact_Log CASCADE;
DROP TABLE IF EXISTS Offer CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Tag CASCADE;
DROP TABLE IF EXISTS Company CASCADE;

-- 1. Skapa Company-tabellen
CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 2. Skapa Tag-tabellen
CREATE TABLE Tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 3. Skapa Customer-tabellen
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

-- 4. Skapa Contact_Log-tabellen
CREATE TABLE Contact_Log (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    type VARCHAR(50),
    note TEXT
);

-- 5. Skapa Offer-tabellen
CREATE TABLE Offer (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Company(id) ON DELETE CASCADE,
    type VARCHAR(100),
    content TEXT,
    send_date DATE
);

-- 6. Skapa Customer_Tag-tabellen
CREATE TABLE Customer_Tag (
    customer_id INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES Tag(id) ON DELETE CASCADE,
    PRIMARY KEY (customer_id, tag_id)
);

-- 7. Skapa Send_Log-tabellen
CREATE TABLE Send_Log (
    id SERIAL PRIMARY KEY,
    offer_id INTEGER REFERENCES Offer(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    send_status VARCHAR(50)
);
