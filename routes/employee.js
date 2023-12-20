import express from "express";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
  getSingleEmployee,
  getEmployeeSearchByName,
  getEmployeeCount,
  getAllEmployeeLimit
} from "./../controllers/employeeController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new employee
router.post("/", createEmployee);

// update employee
router.put("/:id", updateEmployee);

// delete employee
router.delete("/:id", deleteEmployee);

// get all limit empoyee pagination
router.get('/getAll', getAllEmployeeLimit)

// get single employee
router.get("/:id", getSingleEmployee);

// getAll employees
router.get("/", getAllEmployee);

// get employee by search
router.get("/search/getEmployeeSearchByName", getEmployeeSearchByName);

// //get featured employees
// router.get('/search/getFeaturedTours', getFeaturedTours)

//get employee count
router.get("/search/getEmployeeCount", getEmployeeCount);

// //get employee count
// router.get('/search/getTourCount', getTourCount)

export default router;
