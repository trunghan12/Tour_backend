import Checkout from "../models/Checkout.js";
import Tour from "../models/Tour.js";

// create new Checkout
export const createCheckout = async (req, res) => {
  const newCheckout = new Checkout(req.body);
  try {
    const savedCheckout = await newCheckout.save();
    res.status(200).json({
      success: true,
      message: "Chuyến tham quan của bạn đã được đặt",
      data: savedCheckout,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "lỗi máy chủ nội bộ",
    });
  }
};

// get single Checkout
export const getCheckout = async (req, res) => {
  const id = req.params.id;

  try {
    const checkout = await Checkout.findById(id);

    res.status(200).json({
      success: true,
      message: "Thành Công",
      data: checkout,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: "Không tìm thấy",
    });
  }
};

// get all Checkout
export const getAllCheckout = async (req, res) => {
  try {
    const checkouts = await Checkout.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Thành công",
      count: checkouts.length,
      data: checkouts,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "lỗi máy chủ nội bộ",
    });
  }
};

export const getAllCheckoutAdmin = async (req, res) => {
  try {
    const checkouts = await Checkout.find().sort("createdAt", -1);
    res.status(200).json({
      success: true,
      message: "Thành công",
      data: checkouts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllCheckoutTourId = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const tour = await Tour.findById(tourId);
    const checkouts = await Checkout.find({
      $and: [
        { tourId: { $eq: tourId } },
        { startDate: { $eq: tour.start_date } },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Thành công",
      length: checkouts.length,
      data: checkouts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllCheckoutUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkouts = await Checkout.find({
      userId: { $eq: userId },
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Thành công",
      length: checkouts.length,
      data: checkouts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllCheckoutBookingId = async (req, res) => {
  const bookingId = req.params.bookingId;
  try {
    const book = await Booking.findById(bookingId);
    const checkouts = await Checkout.find({
      $and: [
        { bookingId: { $eq: bookingId } },
        { startDate: { $eq: book.startDate } },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Thành công",
      length: checkouts.length,
      data: checkouts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllCheckoutLimit = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const checkout = await Checkout.find({})
      .sort({ createdAt: -1 })
      .skip(page * 9)
      .limit(9);

    res.status(200).json({
      success: true,
      count: checkout.length,
      message: "Thành công",
      data: checkout,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

export const statisticalStartDateEndDate = async (req, res) => {
  // const startDate = req.body.startDate
  // const endDate = req.body.endDate
  // const data = {
  //     startDate: startDate,
  //     endDate: endDate
  // }
};

export const updateCheckoutById = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCheckout = await Checkout.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Thành công",
      data: updateCheckout,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getTourByBookingId = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const book = await Booking.find({
      booking_id: bookingId,
    })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
  // res.json(employeeId)
};

export const getTourByTourId = async (req, res) => {
  const TourId = req.params.id;
  try {
    const tour = await Tour.find({
      Tour_id: TourId,
    })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
  // res.json(employeeId)
};
