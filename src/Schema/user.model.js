const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  age: Number,
  role: {
    type: String,
    enum: ["Guests", "Employee", "HR"],
    default: "Guests",
  }
});

const UserModel = model("public", userSchema);

module.exports = UserModel;