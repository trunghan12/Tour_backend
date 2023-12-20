import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  updateTour,
  getTourBySearch,
  getFeaturedTours,
  getTourCount,
  getAllTourLimit,
  getTourByCategoryId,
  getAllTourUnScheduled,
  getAllTourScheduled,
  getTourSearchByName,
  getTourScheduleByName,
  getTourByEmployeeId,
  getAllTourScheduledInOneMonth
} from "./../controllers/tourController.js";

const router = express.Router();

// create new tour
router.post("/", createTour);

// update tour
router.put("/:id", updateTour);

// delete tour
router.delete("/:id", deleteTour);

router.get("/getAll", getAllTourLimit);
// get single tour
router.get("/:id", getSingleTour);

// getAll tours limit
router.get("/", getAllTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

//get featured tours
router.get("/search/getFeaturedTours", getFeaturedTours);

//get tour count
router.get("/search/getTourCount", getTourCount);

//get tour by category_id
router.get("/getByCategoryId/:id", getTourByCategoryId);

//get tour by employee_id
router.get("/getByEmployeeId/:id", getTourByEmployeeId);

//get all tour unscheduled
router.get("/unscheduled/getAllTourUnScheduled", getAllTourUnScheduled);

//get all tour sheduled
router.get("/scheduled/getAllTourScheduled", getAllTourScheduled);

//get all tour scheduled in 1 month after
router.get("/scheduled/getAllTourScheduledInOneMonth", getAllTourScheduledInOneMonth);

//search tour by nameTour
router.get("/search/getTourByName", getTourSearchByName);

//search tour schedule by nameTour
router.get("/searchTourSchedule/getTourScheduleByName", getTourScheduleByName);

export default router;
