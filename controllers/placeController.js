import Place from "../models/Place.js";
//create place
export const createPlace = async (req, res) => {
  const newPlace = new Place(req.body);
  try {
    const savedPlace = await newPlace.save();
    res.status(200).json({
      success: true,
      message: "Tạo thành công",
      data: savedPlace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};

//getAll place
export const getAllPlace = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: places.length,
      message: "Thành công",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//get single place
export const getSinglePlace = async (req, res) => {
  const id = req.params.id;

  try {
    const place = await Place.findById(id);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: place,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//update  place
export const updatePlace = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedPlace,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
};

//delete place
export const deletePlace = async (req, res) => {
  const id = req.params.id;

  try {
    await Place.findByIdAndDelete(id);

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

export const getPlaceSearchByName = async (req, res) => {
  const search = req.query.s;
  try {
    const search = req.query.s;
    const places = await Place.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });
    res.status(200).json({
      length: places.length,
      message: "Thành công",
      data: places,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }

  // res.json(search)
};

// get Place counts
export const getPlaceCount = async (req, res) => {
  try {
    const placeCount = await Place.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: placeCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllPlaceLimit = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const place = await Place.find({})
      .sort({ createdAt: -1 })
      .skip(page * 12)
      .limit(12);

    res.status(200).json({
      success: true,
      count: place.length,
      message: "Thành công",
      data: place,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

// get featured tour
export const getFeaturedPlace = async (req, res) => {
  try {
    const places = await Place.find({ featured: true })
      .sort({ createdAt: -1 })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};
