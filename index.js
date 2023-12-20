import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import categoryRoute from "./routes/category.js";
import placeRoute from "./routes/place.js";
import employeeRoute from "./routes/employee.js";
import adminRoute from "./routes/admin.js";
import reviewemployeeRoute from "./routes/reviewsemployee.js";
import authadminRoute from "./routes/authadmin.js";
import statisticalRoute from "./routes/statistical.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

import multer from "multer";

import path from "path";

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_UIRI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/authadmin", authadminRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/place", placeRoute);
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/reviewemployee", reviewemployeeRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/statistical", statisticalRoute);

// app.use('/images', express.static(path.join(path.__dirname, "/images")))
app.use(express.static("assets"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
// console.log("process.env.MONGO_DB", process.env.CLIENT_ID);
// console.log(upload.file('file'))

app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Upload image success");
});

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
