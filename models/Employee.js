import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ReviewEmployee",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
