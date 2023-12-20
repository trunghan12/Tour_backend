import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// create new booking
export const createBooking = async(req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success: true,
            message: "Chuyến tham quan của bạn đã được đặt",
            data: savedBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "lỗi máy chủ nội bộ",
        });
    }
};

// get single booking
export const getBooking = async(req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({
            success: true,
            message: "Thành Công",
            data: book,
        });
    } catch (err) {
        res.status(404).json({
            success: true,
            message: "Không tìm thấy",
        });
    }
};

// get all booking
export const getAllBooking = async(req, res) => {
    // try {
    //   const books = await Booking.find().sort({ createdAt: -1 });
    //   const result = await books.forEach(booking => {
    //   const res = Booking.findByIdAndUpdate(booking._id,
    //       {
    //         $set: {status: 0},
    //       },
    //       { new: true })
    //   })

    //   res.json(result)
    // } catch (error) {
    //   res.status(500).json({
    //     success: true,
    //     message: "lỗi máy chủ nội bộ",
    //   });
    // }

    try {
        const books = await Booking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Thành công",
            count: books.length,
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "lỗi máy chủ nội bộ",
        });
    }
};

export const getAllBookingAdmin = async(req, res) => {
    try {
        const books = await Booking.find().sort("createdAt", -1);
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Thất bại",
        });
    }
};

export const getAllBookingTourId = async(req, res) => {
    const tourId = req.params.tourId;
    try {
        const tour = await Tour.findById(tourId);
        const books = await Booking.find({
            $and: [
                { tourId: { $eq: tourId } },
                { startDate: { $eq: tour.start_date } },
            ],
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Thành công",
            length: books.length,
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Thất bại",
        });
    }
};

export const getAllBookingUserId = async(req, res) => {
    const userId = req.params.userId;
    try {
        const books = await Booking.find({
            userId: { $eq: userId },
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Thành công",
            length: books.length,
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Thất bại",
        });
    }
};

export const getAllBookingLimit = async(req, res) => {
    // for pagination
    const page = parseInt(req.query.page);

    try {
        const booking = await Booking.find({})
            .sort({ createdAt: -1 })
            .skip(page * 9)
            .limit(9);

        res.status(200).json({
            success: true,
            count: booking.length,
            message: "Thành công",
            data: booking,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Không tìm thấy",
        });
    }
};

export const statisticalStartDateEndDate = async(req, res) => {
    // const startDate = req.body.startDate
    // const endDate = req.body.endDate
    // const data = {
    //     startDate: startDate,
    //     endDate: endDate
    // }
};

export const updateBookingById = async(req, res) => {
    const id = req.params.id;
    try {
        const updateBooking = await Booking.findByIdAndUpdate(
            id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: updateBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Thất bại",
        });
    }
};

//delete Booking
export const deleteBooking = async(req, res) => {
    const id = req.params.id;

    try {
        await Booking.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Xóa thành công",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Xóa thất bại",
        });
    }
};