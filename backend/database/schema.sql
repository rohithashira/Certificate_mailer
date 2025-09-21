
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gst_number VARCHAR(50),
    business_name VARCHAR(255),
    business_address TEXT
);


INSERT INTO users (name, email, gst_number, business_name, business_address) VALUES
('raman', 'raman@example.com', '29ABCDE1234F1Z5', 'raman Solutions', '123 Business Street, Tech City, TC 12345'),
('sam', 'sam@example.com', '27FGHIJ5678K2L6', 'Sam Enterprises', '456 Corporate Avenue, Business District, BD 67890'),
('aman', 'aman@example.com', '33MNOPQ9012R3S7', 'aman & Associates', '789 Innovation Road, Startup Hub, SH 54321'),
('Rohit', 'rohitsonar2000@gmail.com', '29ABCDE1234F1Z5_test', 'Rohit solutions', '123 Business Street, Tech City, TC 12345');



CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    issue_date DATE NOT NULL,
    certificate_path VARCHAR(500),
    email_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
