const express = require("express");
const app = express();
let passport = require("passport");
let LocalStrategy = require("passport-local");
let crypto = require("crypto");
const User = require("../models/user");
const path = require("path");
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "../static/views"));
exports.test = async (req, res, next) => {
  res.send("test successfull");
};
exports.signup = async (req, res, next) => {
  try {
    res.render("signup.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.signupPOST = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw Error("Name, Email, Password is required");
    }
    const { confirm_password } = req.body;
    if (password != confirm_password) {
      throw Error("Password and confirm Password not same");
    }
    const user = await User.create(req.body);
    console.log(user);
    res.status(501).send("User created");
  } catch (error) {
    console.log(error);
    res.status(401).send("Error Occureured");
  }
};
