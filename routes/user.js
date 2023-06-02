const express = require("express");
const routers = express.Router();

const { test, signup, signupPOST, login } = require("../controllers/user");
// const signUpget = require("../static/views/signup");
routers.route("/test").get(test);
routers.route("/signup").get(signup);
routers.route("/signup").post(signupPOST);
routers.route("/login").get(login);
module.exports = routers;
