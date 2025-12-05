import { Router } from "express";
import {
  createQuote,
  getQuotes,
  getQuotePDF,
} from "../controllers/quoteController.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/", verifyAuth, createQuote);
router.get("/", verifyAuth, getQuotes);
router.get("/:id/pdf", verifyAuth, getQuotePDF);

export default router;
