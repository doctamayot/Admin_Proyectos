import { Router } from "express";

import {
  getTask,
  newTask,
  deleteTask,
  editTask,
  changeStatus,
} from "../controllers/taskController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.post("/", checkAuth, newTask);
router
  .route("/:id")
  .get(checkAuth, getTask)
  .delete(checkAuth, deleteTask)
  .put(checkAuth, editTask);
router.post("/estado/:id", checkAuth, changeStatus);

export default router;
