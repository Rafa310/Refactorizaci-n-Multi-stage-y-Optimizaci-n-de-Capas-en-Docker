CREATE TABLE IF NOT EXISTS products (
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 stock INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO products (name, price, stock) VALUES
 ('Auriculares de estudio', 59.99, 15),
 ('Mochila urbana', 39.50, 22),
 ('Lámpara LED de escritorio', 24.90, 30);
