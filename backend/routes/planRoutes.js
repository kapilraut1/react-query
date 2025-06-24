import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

// POST /api/v1/plans
router.post("/", async (req, res) => {
  const newPlan = new Plan(req.body);
  const saved = await newPlan.save();
  res.status(201).json(saved);
});

// GET /api/v1/plans (optional for listing later)
router.get("/", async (req, res) => {
  const plans = await Plan.find().populate("serviceIds");
  res.json(plans);
});

export default router;
