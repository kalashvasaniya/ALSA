const mongoose = require("mongoose");
const validator = require("validator");
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
module.exports = mongoose.model("user", userSchema);
