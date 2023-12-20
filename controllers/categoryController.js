import Category from "../models/Category.js";

//create new category
export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json({
      success: true,
      message: "Tạo thành công",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};

//update category
export const updateCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi cập nhật",
    });
  }
};

//getSingle category
export const getSingleCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    res.status(200).json({
      success: true,
      message: "Thành Công",
      data: category,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//getAll category
export const getAllCategory = async (req, res) => {
  try {
    const categorys = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categorys.length,
      message: "Thành Công",
      data: categorys,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//get all getAllStatusIsTrue 
export const getAllStatusIsTrue = async (req,res)=>{
  try {
    const categorys = await Category.find({
      status: { $eq: true } 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categorys.length,
      message: "Thành Công",
      data: categorys,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
}

//delete category
export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    await Category.findByIdAndDelete(id);

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

export const getCategorySearchByName = async (req, res) => {
  try {
    const search = req.query.s;
    const categories = await Category.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      message: "Thành công",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};
