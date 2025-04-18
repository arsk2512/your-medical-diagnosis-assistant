import express, { Request, Response } from "express";
import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import dbConfig from "./config/db";

const db = dbConfig();
const app = express();
app.use(express.json());

// Example Schema & Model
interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

// Example Route
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
