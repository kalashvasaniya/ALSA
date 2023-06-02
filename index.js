//Setting up express
const express = require("express");
const app = express();

//configuraation of dotenv
require("dotenv").config();

//Setting up DB
const connectWithDB = require("./config/db");
connectWithDB();

//Setting up user routes
const userRoute = require("./routes/user");
app.use("/v1", userRoute);

//Setting up port where localhost works
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on ${process.env.PORT} `);
});
