import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    tourName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    replyText: {
      type: String,
      default: ""
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isCheck:{
      type: Boolean,
      default: false,
    },
    isHide: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
