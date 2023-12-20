import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const testAccessToken = async (req, res) => {
  res.json("hello ca nha yeu cua kem");
};
// Admin registration
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const admin = await Admin.findOne({ email });

    // if user doesn't exist
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // if user is exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res.status(402).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    const { password, role, ...rest } = admin._doc;

    // create jwt token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessTokenAdmin", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Đăng nhập thất bại",
    });
  }
};

export const register = async (req, res) => {
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAdmin = new Admin({
      email: req.body.email,
      password: hash,
    });
    
    await newAdmin.save();

    res.status(200).json({
      success: true,
      message: "Tạo thành công",
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Tạo thất bại. Thử lại",
    });
  }
};
