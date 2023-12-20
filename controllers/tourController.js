import Tour from "../models/Tour.js";

// create new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Tạo thành công",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

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

// getSingle tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

export const getAllTourLimit = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .sort({ createdAt: -1 })
      .populate("reviews")
      .skip(page * 9)
      .limit(9);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

// getAll tour
export const getAllTour = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({}).populate("reviews");
    // .skip(page * 8)
    // .limit(8)

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

// get tour by search

export const getTourBySearch = async (req, res) => {
  // hear 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    //gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    })
      .populate("reviews")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

// get featured tour
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .sort({ createdAt: -1 })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

// get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getTourByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const tours = await Tour.find({
      category_id: categoryId,
    })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
  // res.json(categoryId)
};

export const getTourByEmployeeId = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const tours = await Tour.find({
      employee_id: employeeId,
    })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
  // res.json(employeeId)
};

export const getAllTourUnScheduled = async (req, res) => {
  try {
    const dateNow = new Date(); // 2023-11-13
    const dateStart = new Date("2023-11-14");
    // if(dateNow < dateStart){
    //     res.json('oke');
    // }else{
    //     res.json('no')
    // }

    // const tours = await Tour.find({
    //     $or: [
    //         { end_date: { $exists: false } },
    //         { start_date: { $gt: dateNow } }
    //       ]
    // })

    const tours = await Tour.find({
      $or: [
        { end_date: { $exists: false } },
        { start_date: { $exists: false } },
        { start_date: { $gt: dateNow } },
      ],
    });

    res.status(200).json({
      length: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllTourScheduled = async (req, res) => {
  try {
    const dateNow = new Date(); // 2023-11-13

    const tours = await Tour.find({
      $and: [{ end_date: { $exists: true } }, { start_date: { $lt: dateNow } }],
    }).populate("reviews");

    res.status(200).json({
      length: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getTourSearchByName = async (req, res) => {
  try {
    const search = req.query.s;
    const tours = await Tour.find({
      title: { $regex: search, $options: "i" },
    }).populate("reviews");
    res.status(200).json({
      length: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getTourScheduleByName = async (req, res) => {
  try {
    const dateNow = new Date(); // 2023-11-13
    const search = req.query.s;

    const tours = await Tour.find({
      $and: [
        { title: { $regex: search, $options: "i" } },
        { end_date: { $exists: true } },
        { start_date: { $lt: dateNow } },
      ],
    });
    res.status(200).json({
      length: tours.length,
      message: "Thành công",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllTourScheduledInOneMonth = async (req, res) => {
  try {
    const currentDate = new Date(); //current date
    let day30Affter = new Date(currentDate);
    day30Affter.setDate(currentDate.getDate() + 30);

    const tours = await Tour.find({
      $and: [
        { end_date: { $exists: true } },
        { start_date_real: { $gte: currentDate } },
        { start_date_real: { $lte: day30Affter } },
      ],
    }).populate("reviews");

    res.status(200).json({
      length: tours.length,
      start: currentDate,
      end: day30Affter,
      data: tours,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};
