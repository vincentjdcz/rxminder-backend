const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

module.exports = generateTokenAndSetCookie;
