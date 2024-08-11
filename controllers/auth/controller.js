const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin/model");
const generateTokenAndSetCookie = require("../../utils/generateToken");
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const admin = await Admin.findOne({ email }); //check if email already exists

    if (admin) {
      return res
        .status(400)
        .json({ error: "Admin user with given email already exists" });
    }

    //Hash PW
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newAdmin) {
      generateTokenAndSetCookie(newAdmin._id, res);
      await newAdmin.save();

      res.status(201).json({
        _id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
      });
    } else {
      res.status(400).json({ error: "Invalid admin data" });
    }
  } catch (error) {
    console.log("Error in admin signup controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup };
