import { Router } from "express";
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
} from "../controllers/vehicleController.js";
import { verifyAuth, verifyRole } from "../middlewares/auth.js";

const router = Router();

// Public routes
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);

// Protected routes
router.post("/", verifyAuth, verifyRole(["admin", "vendedor"]), createVehicle);
router.put("/:id", verifyAuth, verifyRole(["admin", "vendedor"]), updateVehicle);
router.delete("/:id", verifyAuth, verifyRole(["admin"]), deleteVehicle);
router.patch(
  "/:id/status",
  verifyAuth,
  verifyRole(["admin", "vendedor"]),
  updateVehicleStatus
);

export default router;
