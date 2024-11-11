-- Ta bort tabellerna om de redan finns
DROP TABLE IF EXISTS send_Log CASCADE;

DROP TABLE IF EXISTS customer_Tag CASCADE;

DROP TABLE IF EXISTS contact_Log CASCADE;

DROP TABLE IF EXISTS offer CASCADE;

DROP TABLE IF EXISTS customer CASCADE;

DROP TABLE IF EXISTS tag CASCADE;

DROP TABLE IF EXISTS company CASCADE;

DROP TABLE IF EXISTS tag CASCADE;

-- 1. Skapa Company-tabellen
CREATE TABLE
    company (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

-- 2. Skapa Customer-tabellen (efter Company)
CREATE TABLE
    customer (
        id SERIAL PRIMARY KEY,
        company_id INTEGER REFERENCES Company (id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address VARCHAR(255),
        email VARCHAR(255) UNIQUE
    );

-- 3. Skapa Tag-tabellen
CREATE TABLE
    tag (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL);

-- 4. Skapa Contact_Log-tabellen.
CREATE TABLE
    contact_Log (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
        date DATE NOT NULL,
        type VARCHAR(50),
        note TEXT
    );

-- 5. Skapa Offer-tabellen
CREATE TABLE
    offer (
        id SERIAL PRIMARY KEY,
        company_id INTEGER REFERENCES Company (id) ON DELETE CASCADE,
        type VARCHAR(100),
        content TEXT,
        send_date DATE
    );

-- 6. Skapa Customer_Tag-tabellen
CREATE TABLE
    customer_Tag (
        customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES Tag (id) ON DELETE CASCADE,
        PRIMARY KEY (customer_id, tag_id)
    );

-- 7. Skapa Send_Log-tabellen
CREATE TABLE
    send_Log (
        id SERIAL PRIMARY KEY,
        offer_id INTEGER REFERENCES Offer (id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES Customer (id) ON DELETE CASCADE,
        send_status VARCHAR(50)
    );
