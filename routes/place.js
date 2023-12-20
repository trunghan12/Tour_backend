import express from "express";
import {
  createPlace,
  getAllPlace,
  getSinglePlace,
  updatePlace,
  deletePlace,
  getPlaceSearchByName,
  getPlaceCount,
  getAllPlaceLimit,
  getFeaturedPlace,
} from "../controllers/placeController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new tour
router.post("/", createPlace);

router.get("/getAll", getAllPlaceLimit);
// update tour
router.put("/:id", updatePlace);

// delete tour
router.delete("/:id", deletePlace);

// get single tour
router.get("/:id", getSinglePlace);


// getAll tours
router.get("/", getAllPlace);

// get place by search
router.get("/search/getPlaceSearchByName", getPlaceSearchByName);

//get Place count
router.get("/search/getPlaceCount", getPlaceCount);



//get featured tours
router.get("/search/getFeaturedPlace", getFeaturedPlace);

// //get featured tours
// router.get('/search/getFeaturedTours', getFeaturedTours)

// //get tour count
// router.get('/search/getTourCount', getTourCount)

export default router;
