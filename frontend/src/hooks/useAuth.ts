import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface User {
  id: string;
  email: string;
  rol: string;
  nombre: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restaurar sesión del localStorage al montar el componente
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Obtener sesión guardada en localStorage
        const savedSession = localStorage.getItem("auth_session");
        
        if (savedSession) {
          const session = JSON.parse(savedSession);
          
          // Verificar que la sesión aún sea válida en Supabase
          const { data: { user: authUser } } = await supabase.auth.getUser();
          
          if (authUser) {
            // Sesión válida, restaurarla
            setUser(session);
          } else {
            // Sesión expirada, limpiar localStorage
            localStorage.removeItem("auth_session");
          }
        }
      } catch (err: any) {
        console.error("Error restaurando sesión:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      
      // Autenticarse con Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (!data.user) {
        throw new Error("No se pudo iniciar sesión");
      }

      // Obtener datos del usuario desde la tabla users
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userError) throw userError;

      const userWithEmail: User = {
        id: data.user.id,
        email: data.user.email || "",
        rol: userData.rol,
        nombre: userData.nombre,
      };

      // Guardar sesión en localStorage
      localStorage.setItem("auth_session", JSON.stringify(userWithEmail));
      setUser(userWithEmail);

      return userWithEmail;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
      
      return data;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión con Google");
      throw err;
    }
  };

  const signInWithFacebook = async () => {
    try {
      setError(null);
      
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
      
      return data;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión con Facebook");
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      
      // Cerrar sesión en Supabase
      const { error: signoutError } = await supabase.auth.signOut();
      if (signoutError) throw signoutError;

      // Limpiar localStorage (sesión y credenciales guardadas)
      localStorage.removeItem("auth_session");
      localStorage.removeItem("remember_email");
      localStorage.removeItem("remember_password");
      localStorage.removeItem("remember_me");
      setUser(null);
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión");
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signInWithGoogle,
    signInWithFacebook,
    logout,
    isAuthenticated: !!user,
  };
};
