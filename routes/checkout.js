import express from "express";
import {
  createCheckout,
  getAllCheckout,
  getCheckout,
  getAllCheckoutAdmin,
  getTourByBookingId,
  getAllCheckoutTourId,
  getTourByTourId,
  getAllCheckoutUserId,
  getAllCheckoutBookingId,
  statisticalStartDateEndDate,
  getAllCheckoutLimit,
  updateCheckoutById,
} from "../controllers/checkoutController.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get('/getAllcheckout', getAllcheckoutAdmin)
router.post("/", createCheckout);
//get limit Checkout pagination
router.get("/getAll", getAllCheckoutLimit);
router.get("/:id", verifyUser, getCheckout);

router.put("/:id", updateCheckoutById);
// router.get('/', verifyAdmin,  getAllCheckout)
router.get("/", getAllCheckout);

router.get("/getByBookingId/:id", getTourByBookingId);
router.get("/getByTourId/:id", getTourByTourId);

router.get("/getAllCheckoutTour/:tourId", getAllCheckoutTourId);
//get all Checkout by user_id
router.get("/getAllCheckoutUserId/:userId", getAllCheckoutUserId);

router.get("/getAllCheckoutBookingId/:bookingId", getAllCheckoutBookingId);

//statistical in start date, end date
router.get(
  "/statistical/statisticalStartDateEndDate",
  statisticalStartDateEndDate
);

export default router;
