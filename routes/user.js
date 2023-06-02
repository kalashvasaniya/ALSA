const express = require("express");
const routers = express.Router();

const { test } = require("../controllers/user");
routers.route("/test").get(test);
module.exports = routers;
