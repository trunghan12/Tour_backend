import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
    introduction: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
