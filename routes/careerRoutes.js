// routes/career.js
import express from "express";
import CareerChoice from "../models/CareerChoice.js";

const pathRouter = express.Router();

pathRouter.post("/save-choice", async (req, res) => {
  const { userId, cardId, choice } = req.body;

  try {
    // ek card ke liye ek hi record
    const existing = await CareerChoice.findOne({ userId, cardId });

    if (existing) {
      return res.status(400).json({ msg: "Already selected" });
    }

    const newChoice = new CareerChoice({ userId, cardId, choice });
    await newChoice.save();

    res.json({ msg: "Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pathRouter.get("/get-choices/:userId", async (req, res) => {
  try {
    const data = await CareerChoice.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default pathRouter;