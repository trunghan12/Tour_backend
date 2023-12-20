import express from "express";
import {
    createBooking,
    getAllBooking,
    getBooking,
    getAllBookingAdmin,
    getAllBookingTourId,
    getAllBookingUserId,
    statisticalStartDateEndDate,
    getAllBookingLimit,
    updateBookingById,
    deleteBooking,
} from "../controllers/bookingController.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get('/getAllBooking', getAllBookingAdmin)
router.post("/", verifyUser, createBooking);
//get limit booking pagination
router.get("/getAll", getAllBookingLimit);
router.get("/:id", verifyUser, getBooking);

// delete tour
router.delete("/:id", deleteBooking);

router.put("/:id", updateBookingById);
// router.get('/', verifyAdmin,  getAllBooking)
router.get("/", getAllBooking);

router.get("/getAllBookingTour/:tourId", getAllBookingTourId);
//get all booking by user_id
router.get("/getAllBookingUserId/:userId", getAllBookingUserId);

//statistical in start date, end date
router.get(
    "/statistical/statisticalStartDateEndDate",
    statisticalStartDateEndDate
);

export default router;