CREATE TABLE products (
	id  SERIAL PRIMARY KEY,
    product_code VARCHAR(10), 
    product_description VARCHAR(255),    
    location VARCHAR(100),                
    price DECIMAL(10, 2)                 
);

INSERT INTO products (product_code, product_description, location, price) VALUES
('P001', 'Sedan', 'West Malaysia', 300),
('P002', 'Sedan', 'East Malaysia', 400),
('P003', 'SUV', 'West Malaysia', 600),
('P004', 'SUV', 'East Malaysia', 700);

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(10),
    email VARCHAR(255),
    password VARCHAR(100)
);

INSERT INTO users (id, username, email, password) VALUES 
(1, 'john_doe', 'john@example.com', 'password123'),
(2, 'jane_doe', 'jane@example.com', 'securepass456');