-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS db_origen_mysql;

-- Usar la base de datos
USE db_origen_mysql;

-- Tabla de Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro DATE NOT NULL
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha_pedido DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Tabla de Detalles de Pedido
CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Procedimiento almacenado para obtener el total de ventas por cliente
DELIMITER //
CREATE PROCEDURE sp_ventas_por_cliente()
BEGIN
    SELECT c.id, c.nombre, SUM(p.total) as total_ventas
    FROM clientes c
    JOIN pedidos p ON c.id = p.cliente_id
    GROUP BY c.id, c.nombre
    ORDER BY total_ventas DESC;
END //
DELIMITER ;

-- Insertar algunos datos de ejemplo
INSERT INTO clientes (nombre, email, fecha_registro) VALUES
('Juan Pérez', 'juan@example.com', '2023-01-01'),
('María García', 'maria@example.com', '2023-01-15');

INSERT INTO productos (nombre, precio, stock) VALUES
('Laptop', 999.99, 50),
('Smartphone', 499.99, 100);

INSERT INTO pedidos (cliente_id, fecha_pedido, total) VALUES
(1, '2023-02-01 10:00:00', 999.99),
(2, '2023-02-15 15:30:00', 499.99);

INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 999.99),
(2, 2, 1, 499.99);