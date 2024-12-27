CREATE TABLE users (
    uid SERIAL PRIMARY KEY,       -- Auto-incrementing unique identifier
    email VARCHAR(255) NOT NULL UNIQUE,  -- Email must be unique
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8)  -- Password must be at least 8 characters
);
