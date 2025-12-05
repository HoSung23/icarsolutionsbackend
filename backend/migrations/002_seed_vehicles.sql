-- Seed data para vehículos de ejemplo
INSERT INTO vehicles (marca, modelo_año, cilindraje, linea, origen, motor, combustible, transmision, marchas, recorrido, accesorios, precio, estado)
VALUES
  ('Toyota', '2023', '1800cc', 'Corolla', 'Japón', 'V4', 'Gasolina', 'Automática', '6', 15000, ARRAY['Aire acondicionado', 'Power steering', 'ABS'], 18500.00, 'disponible'),
  ('Honda', '2022', '2000cc', 'CR-V', 'Japón', 'V4', 'Gasolina', 'Automática', '6', 25000, ARRAY['Aire acondicionado', 'Sunroof', 'Cámara de reversa'], 22000.00, 'disponible'),
  ('Mazda', '2023', '2000cc', '3', 'Japón', 'V4', 'Gasolina', 'Manual', '5', 8000, ARRAY['Aire acondicionado', 'Power steering'], 16000.00, 'disponible'),
  ('Hyundai', '2021', '1600cc', 'Elantra', 'Corea', 'V4', 'Gasolina', 'Automática', '6', 40000, ARRAY['Aire acondicionado'], 12000.00, 'disponible'),
  ('Ford', '2022', '3500cc', 'Explorer', 'USA', 'V6', 'Gasolina', 'Automática', '6', 35000, ARRAY['Aire acondicionado', 'Sunroof', 'Cámara de reversa', 'Navigationn'], 28000.00, 'disponible');
