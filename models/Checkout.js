import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    bookingID: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      require: true,
    },
    guestSize_Child: {
      type: Number,
    },
    phone: {
      type: Number,
      require: true,
    },
    bookAt: {
      type: Date,
      require: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tourId: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    address: {
      type: String,
    },
    note: {
      type: String,
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Checkout", checkoutSchema);
