-- Agregar rol 'cliente' al enum user_role
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'cliente';

-- Cambiar default de 'vendedor' a 'cliente' para nuevos usuarios
ALTER TABLE users ALTER COLUMN rol SET DEFAULT 'cliente';

-- Comentario
COMMENT ON TYPE user_role IS 'Roles disponibles: admin, vendedor, gerente, superadmin, cliente';
