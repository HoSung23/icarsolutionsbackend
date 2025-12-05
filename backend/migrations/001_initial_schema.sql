-- Crear tipos ENUM
CREATE TYPE vehicle_status AS ENUM ('disponible', 'vendido', 'reservado');
CREATE TYPE user_role AS ENUM ('admin', 'vendedor', 'gerente');

-- Tabla de vehículos
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marca TEXT NOT NULL,
  modelo_año TEXT NOT NULL,
  cilindraje TEXT NOT NULL,
  linea TEXT NOT NULL,
  origen TEXT NOT NULL,
  motor TEXT NOT NULL,
  combustible TEXT NOT NULL,
  transmision TEXT NOT NULL,
  marchas TEXT NOT NULL,
  recorrido INTEGER NOT NULL,
  accesorios TEXT[] DEFAULT '{}',
  precio DECIMAL(15, 2) NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  estado vehicle_status DEFAULT 'disponible',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de usuarios extendida
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rol user_role DEFAULT 'vendedor',
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de cotizaciones
CREATE TABLE cotizaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(15, 2) NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Índices
CREATE INDEX idx_vehicles_estado ON vehicles(estado);
CREATE INDEX idx_vehicles_marca ON vehicles(marca);
CREATE INDEX idx_vehicles_precio ON vehicles(precio);
CREATE INDEX idx_cotizaciones_created_by ON cotizaciones(created_by);
CREATE INDEX idx_cotizaciones_vehicle_id ON cotizaciones(vehicle_id);
CREATE INDEX idx_cotizaciones_created_at ON cotizaciones(created_at);

-- RLS (Row Level Security)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas para vehicles (públicamente legible)
CREATE POLICY "Vehículos legibles por todos" 
  ON vehicles FOR SELECT 
  USING (true);

CREATE POLICY "Solo admin puede crear vehículos" 
  ON vehicles FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE rol = 'admin'));

CREATE POLICY "Solo admin puede actualizar vehículos" 
  ON vehicles FOR UPDATE 
  WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE rol = 'admin'));

CREATE POLICY "Solo admin puede eliminar vehículos" 
  ON vehicles FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM users WHERE rol = 'admin'));

-- Políticas para cotizaciones
CREATE POLICY "Los usuarios ven sus propias cotizaciones" 
  ON cotizaciones FOR SELECT 
  USING (auth.uid() = created_by OR auth.uid() IN (SELECT id FROM users WHERE rol = 'admin'));

CREATE POLICY "Los usuarios pueden crear cotizaciones" 
  ON cotizaciones FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Políticas para users
CREATE POLICY "Los usuarios ven su propio perfil" 
  ON users FOR SELECT 
  USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM users WHERE rol = 'admin'));
