import Admin from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  res.json("hello ca nha yeu cua kem");
};

// create new Admin

export const createAdmin = async (req, res) => {
  const newAdmin = new Admin(req.body);

  try {
    const savedAdmin = await newAdmin.save();

    res.status(200).json({
      success: true,
      message: "Tạo thành công",
      data: savedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};

// update Admin
export const updateAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
};

// delete Admin
export const deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    await Admin.findByIdAndDelete(id);

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

// getSingle Admin
export const getSingleAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const admin = await Admin.findById(id);

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: admin,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

// getAll Admin
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find({});
    // .skip(page * 8)
    // .limit(8)

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: admins,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};
