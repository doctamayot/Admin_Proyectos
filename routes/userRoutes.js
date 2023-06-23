import { Router } from "express";

import {
  register,
  userAuth,
  confirm,
  forgotPassword,
  validateToken,
  newPasssword,
} from "../controllers/userController.js";

const router = Router();

// Autenticacion, registro y confirmacion de usuarios
router.post("/", register);
router.post("/login", userAuth);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(validateToken).post(newPasssword);

export default router;
