import express from "express";
import {
  createStatistical, getAllStatistical, getStatisticalOneWeek,
  getStatisticalOneMonth, getStatisticalThreeMonth, getStatisticalStartEndDate,
  updateStatisticalRecord,
  checkStaticticalExist, getFourBookingTop
} from "../controllers/statisticalController.js";
const router = express.Router();

//create statistical
router.post('/', createStatistical)

//update statistical
router.put('/:id', updateStatisticalRecord)

// get 1 week ago
router.get("/getStatistical/one-week-ago", getStatisticalOneWeek);

//get 1 month ago
router.get("/getStatistical/one-month-ago", getStatisticalOneMonth);
//get 3 month ago
router.get("/getStatistical/three-month-ago", getStatisticalThreeMonth);
//get by startDate and endDate
router.get("/getStatistical/start-end-date", getStatisticalStartEndDate);
//get 4 booking top
router.get("/getStatistical/four-booking-top", getFourBookingTop);

//check statistical of current have Exist in mongodb
router.get('/checkStaticticalExist', checkStaticticalExist)

// get all statistical
router.get("/", getAllStatistical);


export default router;
