-- ============================================================
-- PROYECTO: E-commerce con Microservicios (Spring Boot + PostgreSQL)
-- ============================================================
-- Este script crea las 4 bases de datos y sus tablas correspondientes.
-- Usa \c para cambiar de base automáticamente al ejecutarse con psql.
--
-- Cómo ejecutarlo contra el contenedor de Docker:
--   docker exec -i ecommerce-db psql -U postgres -d postgres < ecommerce_microservicios.sql
-- ============================================================

-- Crea las bases de datos (se ejecuta desde la base "postgres" por defecto)
CREATE DATABASE products_db;
CREATE DATABASE users_db;
CREATE DATABASE orders_db;
CREATE DATABASE notifications_db;


-- ============================================================
-- BASE DE DATOS: products_db  (product-service)
-- ============================================================
\c products_db

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    stock INTEGER NOT NULL DEFAULT 0,
    image VARCHAR(500),
    badge VARCHAR(50),
    badge_color VARCHAR(20),
    category_id BIGINT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_ratings (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id),
    user_id BIGINT NOT NULL,             -- sin FK: users vive en users_db
    stars SMALLINT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id)          -- evita doble calificación del mismo usuario
);


-- ============================================================
-- BASE DE DATOS: users_db  (user-service)
-- ============================================================
\c users_db

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CLIENTE',   -- CLIENTE, ADMIN, etc.
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- BASE DE DATOS: orders_db  (order-service)
-- ============================================================
\c orders_db

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,             -- sin FK: users vive en users_db
    status VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    product_id BIGINT NOT NULL,          -- sin FK: products vive en products_db
    product_name VARCHAR(150) NOT NULL,  -- copia del nombre al momento de la compra
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL    -- copia del precio al momento de la compra
);


-- ============================================================
-- BASE DE DATOS: notifications_db  (notification-service)
-- ============================================================
\c notifications_db

CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,             -- sin FK: users vive en users_db
    message VARCHAR(500) NOT NULL,
    type VARCHAR(30) NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
