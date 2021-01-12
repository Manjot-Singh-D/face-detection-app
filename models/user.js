const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  count: String,
  uuid: String,
});

usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const User = mongoose.model("User", usersSchema);

module.exports = User;
