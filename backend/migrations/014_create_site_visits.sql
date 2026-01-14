-- Tabla para registrar visitas al sitio web
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url VARCHAR(500) NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  referrer VARCHAR(500),
  session_id VARCHAR(255),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  visit_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  country VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(100)
);

-- Índices para mejorar el rendimiento de consultas
CREATE INDEX idx_site_visits_date ON site_visits(visit_date);
CREATE INDEX idx_site_visits_page_url ON site_visits(page_url);
CREATE INDEX idx_site_visits_user_id ON site_visits(user_id);
CREATE INDEX idx_site_visits_session_id ON site_visits(session_id);

-- Tabla para estadísticas agregadas por día
CREATE TABLE IF NOT EXISTS daily_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stat_date DATE NOT NULL UNIQUE,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  page_views JSONB DEFAULT '{}'::jsonb,
  top_pages JSONB DEFAULT '[]'::jsonb,
  device_breakdown JSONB DEFAULT '{}'::jsonb,
  browser_breakdown JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por fecha
CREATE INDEX idx_daily_statistics_date ON daily_statistics(stat_date);

-- Función para actualizar estadísticas diarias
CREATE OR REPLACE FUNCTION update_daily_statistics()
RETURNS TRIGGER AS $$
DECLARE
  today DATE := CURRENT_DATE;
BEGIN
  -- Insertar o actualizar las estadísticas del día
  INSERT INTO daily_statistics (stat_date, total_visits, unique_visitors)
  VALUES (today, 1, 1)
  ON CONFLICT (stat_date) 
  DO UPDATE SET 
    total_visits = daily_statistics.total_visits + 1,
    updated_at = CURRENT_TIMESTAMP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar estadísticas automáticamente
CREATE TRIGGER trigger_update_daily_statistics
  AFTER INSERT ON site_visits
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_statistics();

-- Políticas RLS para site_visits (público puede insertar, solo staff puede leer)
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Permitir inserciones anónimas para registrar visitas
CREATE POLICY "Cualquiera puede registrar visitas"
  ON site_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Solo staff puede ver las estadísticas
CREATE POLICY "Staff puede ver todas las visitas"
  ON site_visits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente')
    )
  );

-- Políticas RLS para daily_statistics
ALTER TABLE daily_statistics ENABLE ROW LEVEL SECURITY;

-- Solo staff puede ver estadísticas
CREATE POLICY "Staff puede ver estadísticas diarias"
  ON daily_statistics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente')
    )
  );

-- Staff puede actualizar estadísticas
CREATE POLICY "Staff puede actualizar estadísticas diarias"
  ON daily_statistics
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.rol IN ('admin', 'superadmin', 'gerente')
    )
  );
