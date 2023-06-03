const User = require("../models/user");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
IsLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Please login first");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    res.render(error);
  }
};

module.exports = IsLoggedIn;
