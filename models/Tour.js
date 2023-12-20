import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      //Ten tour
      type: String,
      required: true,
      unique: true,
    },
    category_id: {
      //Id danh muc
      type: String,
      required: true,
    },
    employee_id: {
      //Id huong dan vien
      type: String,
    },
    city_id: {
      //Id dia diem
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    distance: {
      type: Number,
    },
    photo: {
      //Hinh anh
      type: String,
      required: true,
    },
    desc: {
      //Mo ta
      type: String,
      required: true,
    },
    price: {
      //Gia nguoi lon
      type: Number,
      required: false,
    },
    maxGroupSize: {
      //So luong ve nguoi lon
      type: Number,
      required: false,
    },
    price_children: {
      //Gia cho tre em
      type: Number,
      required: false,
    },
    maxGroupSize_chidlren: {
      //So luong ve tre em
      type: Number,
      required: false,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
    start_date_real: {
      type: Date,
    },
    end_date_real: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
