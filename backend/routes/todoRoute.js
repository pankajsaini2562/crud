import express from "express";

import { addTodo } from "../controllers/todoController.js";
import { deleteTodo } from "../controllers/todoController.js";
import { getTodo } from "../controllers/todoController.js";
import { putTodo } from "../controllers/todoController.js";
const router = express.Router();

router.post("/", addTodo);
router.get("/", getTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", putTodo);
export default router;
