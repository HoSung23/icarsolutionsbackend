-- Crear tipo ENUM para tipo de servicio
CREATE TYPE service_type AS ENUM (
  'revision_mecanica',
  'servicio_menor',
  'servicio_mayor',
  'enderezado_pintura',
  'otro'
);

-- Crear tipo ENUM para estado de cita
CREATE TYPE appointment_status AS ENUM (
  'pendiente',
  'confirmada',
  'en_proceso',
  'completada',
  'cancelada'
);

-- Crear tabla de citas
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información del servicio
  tipo_servicio service_type NOT NULL,
  fecha_hora TIMESTAMP NOT NULL,
  duracion_estimada INTEGER DEFAULT 60, -- en minutos
  
  -- Información del cliente
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  user_id UUID REFERENCES users(id), -- NULL si es cliente no registrado
  
  -- Información del vehículo
  vehiculo_marca TEXT NOT NULL,
  vehiculo_modelo TEXT NOT NULL,
  vehiculo_año INTEGER NOT NULL,
  vehiculo_placa TEXT,
  kilometraje INTEGER,
  
  -- Detalles adicionales
  descripcion TEXT,
  notas_internas TEXT, -- Solo visible para staff
  
  -- Estado y tracking
  estado appointment_status DEFAULT 'pendiente',
  google_event_id TEXT, -- ID del evento en Google Calendar
  confirmado_por UUID REFERENCES users(id), -- Staff que confirmó
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  confirmado_at TIMESTAMP,
  completado_at TIMESTAMP
);

-- Crear índices
CREATE INDEX idx_appointments_fecha ON appointments(fecha_hora);
CREATE INDEX idx_appointments_estado ON appointments(estado);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_cliente_email ON appointments(cliente_email);

-- Habilitar RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Políticas RLS

-- Cualquiera puede crear una cita (público)
CREATE POLICY "public_insert_appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Los usuarios pueden ver sus propias citas
CREATE POLICY "users_select_own_appointments"
  ON appointments FOR SELECT
  USING (
    user_id = auth.uid() 
    OR cliente_email = (SELECT email FROM users WHERE id = auth.uid())
  );

-- Staff puede ver todas las citas
CREATE POLICY "staff_select_all_appointments"
  ON appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- Staff puede actualizar citas
CREATE POLICY "staff_update_appointments"
  ON appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND rol IN ('admin', 'superadmin', 'gerente', 'vendedor')
    )
  );

-- Solo admin y superadmin pueden eliminar citas
CREATE POLICY "admin_delete_appointments"
  ON appointments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND rol IN ('admin', 'superadmin')
    )
  );

-- Dar permisos a los roles de Supabase
GRANT ALL ON TABLE appointments TO anon;
GRANT ALL ON TABLE appointments TO authenticated;
GRANT ALL ON TABLE appointments TO service_role;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_appointments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_appointments_updated_at();
