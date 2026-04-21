// models/CareerChoice.js
import mongoose from "mongoose";

const careerChoiceSchema = new mongoose.Schema({
  userId: String,
  cardId: String,
  choice: String
});

export default mongoose.model("CareerChoice", careerChoiceSchema);