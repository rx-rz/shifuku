const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  const match = await bcrypt.compare(password, user.password);
  return {user, match};
};

userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  phoneNo,
  role
) {

  const exists = await this.findOne({ email });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    phoneNo,
    role,
  });
  return {user, exists};
};

module.exports = mongoose.model("user", userSchema);
