//Setting up express
const express = require("express");
const app = express();

//configuraation of dotenv
require("dotenv").config();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./static/views"));
const bodyParser = require("body-parser");
app.use( express.static( "public" ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Setting up DB
const connectWithDB = require("./config/db");
connectWithDB();

//Setting up user routes
const userRoute = require("./routes/user");
app.use("/", userRoute);

//Setting up port where localhost works
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on ${process.env.PORT} `);
});
