import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  try {
    // res.json(newReview)
    const savedReview = await newReview.save();

    // after creating a new review now update the review array of the tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Đã gửi đánh giá",
      data: newReview,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Không thể gửi",
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ updatedAt: -1 });
    // reviews.forEach(reviews => {
    //     // console.log(reviews)
    //     try{
    //         const tourReview = Tour.find({})
    //     }catch(err){
    //         res
    //         .status(500)
    //         .json({
    //             success:false,
    //             message:'failed to fetch',
    //         })
    //     }
    // });
    res.status(200).json({
      success: true,
      message: "Thành công",
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const replyAdminComment = async (req, res) => {
  const id = req.params.id;
  try {
    const updateReview = await Review.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Trả lời thành công",
      data: updateReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Trả lời thất bại",
    });
  }
};

export const getAllLimitReviews = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const reviews = await Review.find({})
      .sort({ createdAt: -1 })
      .skip(page * 9)
      .limit(9);

    res.status(200).json({
      success: true,
      count: reviews.length,
      message: "Thành Công",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};
