const express = require("express");
const routers = express.Router();

const { test, signup, signupPOST } = require("../controllers/user");
// const signUpget = require("../static/views/signup");
routers.route("/test").get(test);
routers.route("/signup").get(signup);
routers.route("/signup").post(signupPOST);
module.exports = routers;
