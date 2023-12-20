import Employee from "../models/Employee.js";
import ReviewEmployee from "../models/ReviewEmployee.js";

export const createReviewEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;
  const newReviewEmployee = new ReviewEmployee({ ...req.body });
  try {
    const savedReviewEmployee = await newReviewEmployee.save();
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { reviews: savedReviewEmployee._id },
    });
    res.status(200).json({
      success: true,
      message: "Gửi đánh thành công",
      data: savedReviewEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Gửi thất bại",
    });
  }
};

export const getAllReviewEmployeeLimit = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const reviewsEmployee = await ReviewEmployee.find({})
      .sort({ createdAt: -1 })
      .skip(page * 9)
      .limit(9);

    res.status(200).json({
      success: true,
      count: reviewsEmployee.length,
      message: "Thành công",
      data: reviewsEmployee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

export const getAllReviewEmployee = async (req, res) => {
  try {
    const reviewsEmployee = await ReviewEmployee.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: reviewsEmployee.length,
      message: "Thành công",
      data: reviewsEmployee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

export const replyAdminReviewEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const updateReview = await ReviewEmployee.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Thành công",
      data: updateReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};
