const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
});

const UserModel = model("user", userSchema);

module.exports = UserModel;