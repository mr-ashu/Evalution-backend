const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
 
  role: {
    type: String,
    enum: ["Guests", "Employee", "HR"],
    default: "Guests",
  }
});

const UserModel = model("profile", userSchema);

module.exports = UserModel;