import mongoose, { Error } from "mongoose";

const MONGO_URI =
  "mongodb://127.0.0.1:27017/ai_powered_medical_diagnosis_assistant";

const dbConfig = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
  }
};

export default dbConfig;
