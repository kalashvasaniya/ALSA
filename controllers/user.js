const express = require("express");
const app = express();
let passport = require("passport");
let LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieToken = require("../utils/cookieToken");
const chargerloc = require("../models/charger");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const user = require("../models/user");
const geoCoder = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiZGhhcmFuc2huZWVtYSIsImEiOiJjbGlmNDVyZzExNms2M2tuYmJ6a29rNTRtIn0.cjCinyijpfYRIsCRyqGgVg",
});
exports.home = async (req, res, next) => {
  res.render("index");
};
exports.signup = async (req, res, next) => {
  try {
    res.render("signup.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    res.render("signin.ejs");
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
    res.status(501).render("index.ejs");
  } catch (error) {
    console.log(error);
    res.status(401).render("error.ejs");
  }
};
exports.loginPOST = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password is Required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email and Password are invalid");
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      throw new Error("Email and Password are invalid");
    }
    cookieToken(user, res, "map");
  } catch (error) {
    console.log(error);
    res.status(404).render("error");
  }
};
exports.findCharginStation = async (req, res, next) => {
  res.render("map.ejs");
};
exports.requiredCharge = async (req, res, next) => {
  try {
    const result = await geoCoder
      .forwardGeocode({
        // query: "banswara, Rajasthan",
        query: req.body.location,
        limit: 1,
      })
      .send();
    console.log(result.body.features[0].geometry.coordinates);
  } catch (error) {
    console.log(error);
  }
};
exports.registerCharger = async (req, res, next) => {
  try {
    console.log(req.body);
    const id = req.body.id;
    const user = await User.findById(id);
    const result = await geoCoder
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    const { type, coordinates } = result.body.features[0].geometry;
    const newCharger = await chargerloc.create({
      user: { id: user._id },
      location: { type, coordinates },
    });
    res.send(newCharger);
  } catch (error) {
    console.log(error);
  }
};
