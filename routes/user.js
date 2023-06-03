const express = require("express");
const routers = express.Router();

const {
  home,
  signup,
  signupPOST,
  login,
  loginPOST,
  requiredCharge,
  registerCharger,
  findCharginStation,
} = require("../controllers/user");
// const signUpget = require("../static/views/signup");
routers.route("/").get(home);
routers.route("/signup").get(signup);
routers.route("/signup").post(signupPOST);
routers.route("/login").get(login);
routers.route("/login").post(loginPOST);
routers.route("/charge").get(requiredCharge);
routers.route("/find").get(findCharginStation);
routers.route("/register").post(registerCharger);
module.exports = routers;
