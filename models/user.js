const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the user is required"],
    maxLength: [
      50,
      "User name cannot be greater than more than 50 characters.",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: [true, "Contact of person is required"],
  },
  type: {
    type: Number,
    enum: [2, 4],
  },
  brand: {
    type: String,
  },
});
userSchema.pre("save", async function (next) {
  //If the password is not being modified we don't encrypt it again
  if (!this.isModified("password")) return next();
  //Strenthing the password by 10 rounds of salt

  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("user", userSchema);
