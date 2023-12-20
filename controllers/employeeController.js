import Employee from "../models/Employee.js";

//create new employee
export const createEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const savedEmployee = await newEmployee.save();
    res.status(200).json({
      success: true,
      message: "Tạo thành công",
      data: savedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};

//update employee
export const updateEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cập nhật thất bại",
    });
  }
};

//getSingle employee
export const getSingleEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Thành Công",
      data: employee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//getAll employee
export const getAllEmployee = async (req, res) => {
  try {
    const employee = await Employee.find({})
      .populate("reviews")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employee.length,
      message: "Thành Công",
      data: employee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};

//delete employee
export const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Xóa thành Công",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Xóa thất bại",
    });
  }
};

export const getEmployeeSearchByName = async (req, res) => {
  try {
    const search = req.query.s;
    const employees = await Employee.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      length: employees.length,
      message: "Thành Công",
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getEmployeeCount = async (req, res) => {
  try {
    const employeeCount = await Employee.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: employeeCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Thất bại",
    });
  }
};

export const getAllEmployeeLimit = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const employee = await Employee.find({})
      .sort({ createdAt: -1 })
      .populate("reviews")
      .skip(page * 12)
      .limit(12);

    res.status(200).json({
      success: true,
      count: employee.length,
      message: "Thành Công",
      data: employee,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy",
    });
  }
};
