import express from "express";
import { login, register, testAccessToken } from "./../controllers/authadminController.js";

import { verifyTokenAdmin } from '../utils/verifyTokenAdmin.js'

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/testAccessToken", verifyTokenAdmin, testAccessToken);

export default router;
