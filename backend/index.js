import express from "express";
import cors from "cors";
import databaseConnection from "./config/database.js";
import todoRoutes from "../backend/routes/todoRoute.js";
import path from "path";
databaseConnection();
const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(express.json());
aap.use(express.static(path.join(__dirname, "/frontend/dist")));
app.listen(4000, () => {
  console.log("server is running succesfully");
});
app.use("/user", todoRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
