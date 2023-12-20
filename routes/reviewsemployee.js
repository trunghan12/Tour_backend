import express from "express";
import { createReviewEmployee, getAllReviewEmployeeLimit,
 getAllReviewEmployee, replyAdminReviewEmployee } from "./../controllers/reviewEmployeeController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:employeeId", verifyUser, createReviewEmployee);

//get all review employee
router.get('/', getAllReviewEmployee)


//get limit review employee 
router.get('/getAll', getAllReviewEmployeeLimit)


//admin reply comment 
router.put('/adminReply/:id', replyAdminReviewEmployee)

export default router;
