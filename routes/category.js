import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  getCategorySearchByName,
  getAllStatusIsTrue
} from "./../controllers/categoryController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new tour
router.post("/", createCategory);

// update tour
router.put("/:id", updateCategory);

// delete tour
router.delete("/:id", deleteCategory);

// get single tour
router.get("/:id", getSingleCategory);

// getAll tours
router.get("/", getAllCategory);

//get all category status == true
router.get("/getAll/statusIsTrue", getAllStatusIsTrue);

// get tour by search
router.get("/search/getCategorySearchByName", getCategorySearchByName);

// //get featured tours
// router.get('/search/getFeaturedTours', getFeaturedTours)

// //get tour count
// router.get('/search/getTourCount', getTourCount)

export default router;
