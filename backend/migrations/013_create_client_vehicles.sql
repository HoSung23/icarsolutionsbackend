-- Tabla para vehículos registrados por clientes
CREATE TABLE IF NOT EXISTS client_vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  anio INTEGER NOT NULL CHECK (anio >= 1900 AND anio <= 2100),
  placa VARCHAR(20),
  color VARCHAR(50),
  kilometraje INTEGER CHECK (kilometraje >= 0),
  numero_vin VARCHAR(17),
  fecha_compra DATE,
  notas TEXT,
  proximo_servicio DATE,
  tipo_proximo_servicio VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_client_vehicles_user_id ON client_vehicles(user_id);
CREATE INDEX idx_client_vehicles_placa ON client_vehicles(placa);
CREATE INDEX idx_client_vehicles_proximo_servicio ON client_vehicles(proximo_servicio);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_client_vehicles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_client_vehicles_updated_at
  BEFORE UPDATE ON client_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_client_vehicles_updated_at();

-- Tabla para recordatorios de servicio
CREATE TABLE IF NOT EXISTS service_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES client_vehicles(id) ON DELETE CASCADE,
  tipo_servicio VARCHAR(100) NOT NULL,
  fecha_programada DATE NOT NULL,
  kilometraje_programado INTEGER,
  descripcion TEXT,
  completado BOOLEAN DEFAULT FALSE,
  fecha_completado TIMESTAMP WITH TIME ZONE,
  notas_staff TEXT,
  enviado_por UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para recordatorios
CREATE INDEX idx_service_reminders_vehicle_id ON service_reminders(vehicle_id);
CREATE INDEX idx_service_reminders_fecha_programada ON service_reminders(fecha_programada);
CREATE INDEX idx_service_reminders_completado ON service_reminders(completado);

-- Trigger para actualizar updated_at en recordatorios
CREATE TRIGGER trigger_update_service_reminders_updated_at
  BEFORE UPDATE ON service_reminders
  FOR EACH ROW
  EXECUTE FUNCTION update_client_vehicles_updated_at();

-- Políticas RLS para client_vehicles
ALTER TABLE client_vehicles ENABLE ROW LEVEL SECURITY;

-- Los clientes solo pueden ver y modificar sus propios vehículos
CREATE POLICY "Clientes pueden ver sus propios vehículos"
  ON client_vehicles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Clientes pueden insertar sus propios vehículos"
  ON client_vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Clientes pueden actualizar sus propios vehículos"
  ON client_vehicles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Clientes pueden eliminar sus propios vehículos"
  ON client_vehicles
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- El staff puede ver todos los vehículos
CREATE POLICY "Staff puede ver todos los vehículos"
  ON client_vehicles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- El staff puede actualizar información de servicio
CREATE POLICY "Staff puede actualizar vehículos para servicio"
  ON client_vehicles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- Políticas RLS para service_reminders
ALTER TABLE service_reminders ENABLE ROW LEVEL SECURITY;

-- Los clientes pueden ver recordatorios de sus vehículos
CREATE POLICY "Clientes pueden ver recordatorios de sus vehículos"
  ON service_reminders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM client_vehicles
      WHERE client_vehicles.id = service_reminders.vehicle_id
      AND client_vehicles.user_id = auth.uid()
    )
  );

-- Solo el staff puede crear recordatorios
CREATE POLICY "Staff puede crear recordatorios"
  ON service_reminders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- Solo el staff puede actualizar recordatorios
CREATE POLICY "Staff puede actualizar recordatorios"
  ON service_reminders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- Solo el staff puede eliminar recordatorios
CREATE POLICY "Staff puede eliminar recordatorios"
  ON service_reminders
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );
