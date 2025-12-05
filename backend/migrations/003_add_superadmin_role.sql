-- Agregar superadmin al tipo user_role
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'superadmin';

-- Actualizar políticas para incluir superadmin
DROP POLICY IF EXISTS "Solo admin puede crear vehículos" ON vehicles;
DROP POLICY IF EXISTS "Solo admin puede actualizar vehículos" ON vehicles;
DROP POLICY IF EXISTS "Solo admin puede eliminar vehículos" ON vehicles;

CREATE POLICY "Solo admin o superadmin puede crear vehículos" 
  ON vehicles FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE rol IN ('admin', 'superadmin')));

CREATE POLICY "Solo admin o superadmin puede actualizar vehículos" 
  ON vehicles FOR UPDATE 
  WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE rol IN ('admin', 'superadmin')));

CREATE POLICY "Solo admin o superadmin puede eliminar vehículos" 
  ON vehicles FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM users WHERE rol IN ('admin', 'superadmin')));

-- Actualizar política de cotizaciones para admin/superadmin
DROP POLICY IF EXISTS "Los usuarios ven sus propias cotizaciones" ON cotizaciones;

CREATE POLICY "Los usuarios ven sus propias cotizaciones" 
  ON cotizaciones FOR SELECT 
  USING (auth.uid() = created_by OR auth.uid() IN (SELECT id FROM users WHERE rol IN ('admin', 'superadmin')));

-- Actualizar política de users para admin/superadmin
DROP POLICY IF EXISTS "Los usuarios ven su propio perfil" ON users;

CREATE POLICY "Los usuarios ven su propio perfil" 
  ON users FOR SELECT 
  USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM users WHERE rol IN ('admin', 'superadmin')));
