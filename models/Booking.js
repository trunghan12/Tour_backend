import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
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
    price: {
      //Gia nguoi lon
      type: Number,
      required: false,
    },
    price_children: {
      //Gia cho tre em
      type: Number,
      required: false,
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
    isCheck: {
      type: Boolean,
      default: false,
    },
    addressDetail:{
      type: String
    },
    note: {
      type: String
    },
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
