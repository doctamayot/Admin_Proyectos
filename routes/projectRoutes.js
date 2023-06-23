import { Router } from "express";

import {
  getProjects,
  editProject,
  deleteProject,
  newColab,
  deleteColab,
  newProject,
  getProject,
} from "../controllers/projectController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);
router
  .route("/:id")
  .get(checkAuth, getProject)
  .delete(checkAuth, deleteProject)
  .put(checkAuth, editProject);

router.post("/add-Colab/:id", checkAuth, newColab);
router.post("/remove-Colab/:id", checkAuth, deleteColab);

export default router;
