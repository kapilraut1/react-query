import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newService = new Service(req.body);
  const saved = await newService.save();
  res.status(201).json(saved);
});

// READ
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// UPDATE
router.patch("/:id", async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});

export default router;
