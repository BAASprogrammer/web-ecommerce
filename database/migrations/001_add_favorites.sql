-- ============================================================
-- MIGRACIÓN: tabla favorites (favoritos de usuarios)
-- Ejecutar contra la base products_db existente sin perder datos:
--   docker exec -i ecommerce-db psql -U postgresnexa -d products_db < database/migrations/001_add_favorites.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS favorites (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id),
    user_id BIGINT NOT NULL,             -- sin FK: users vive en users_db
    is_favorite BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id)
);