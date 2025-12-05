-- Agregar columnas de precio original y descuento a la tabla vehicles
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS precio_original DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS descuento_porcentaje DECIMAL(5, 2);

-- Migrar precios existentes a precio_original si es NULL
UPDATE vehicles 
SET precio_original = precio 
WHERE precio_original IS NULL;

-- Comentarios sobre las columnas
COMMENT ON COLUMN vehicles.precio_original IS 'Precio base del vehículo antes de aplicar descuentos';
COMMENT ON COLUMN vehicles.descuento_porcentaje IS 'Porcentaje de descuento aplicado (0-100). NULL significa sin descuento';
COMMENT ON COLUMN vehicles.precio IS 'Precio final después de aplicar descuentos';
