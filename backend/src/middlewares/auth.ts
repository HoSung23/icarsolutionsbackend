import { Request, Response, NextFunction } from "express";
import { supabaseClient } from "../config/supabase.js";
import logger from "../config/logger.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    rol?: string;
  };
}

export async function verifyAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    logger.error("Auth error:", err);
    res.status(401).json({ error: "Authentication failed" });
  }
}

export function verifyRole(allowedRoles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { data, error } = await supabaseClient
        .from("users")
        .select("rol")
        .eq("id", req.user.id)
        .single();

      if (error || !data) {
        return res.status(403).json({ error: "User not found" });
      }

      if (!allowedRoles.includes(data.rol)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      req.user.rol = data.rol;
      next();
    } catch (err) {
      logger.error("Role verification error:", err);
      res.status(403).json({ error: "Permission check failed" });
    }
  };
}
