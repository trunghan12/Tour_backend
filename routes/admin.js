import express from "express";
import {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmin,
  loginAdmin
} from "../controllers/adminController.js";
const router = express.Router();

//login
router.post('/', loginAdmin)

// update admin
router.put("/:id", updateAdmin);

// delete admin
router.delete("/:id", deleteAdmin);

// get single admin
router.get("/:id", getSingleAdmin);

// getAll admins limit
router.get("/", getAllAdmin);

export default router;
