import mongoose from "mongoose";
const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Todo = mongoose.model("Todo", todoSchema);
