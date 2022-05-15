const bcryptjs = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../db/usersModel");
// const { Conflict } = require("http-errors");

const register = async (body) => {
  const { email, password, subscription } = body;
  // console.log("userParams :", userParams);
  const newUser = await Users.create({
    email,
    password: await bcryptjs.hash(password, +process.env.BCRYPTJS_SALT),
    subscription,
  });
  // console.log("newUser :", newUser);
  return newUser;
};

const login = async (body) => {
  const { email, password } = body;
  // console.log("body", body);
  let user = await Users.findOne({ email });
  // console.log("user: ", user);
  const isPassCorrect = await bcryptjs.compare(password, user.password);
  if (isPassCorrect) {
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    user = await Users.findOneAndUpdate({ email }, { token }, { new: true });
    return user;
  }
};

const logout = async (body) => {
  const { _id } = body;
  console.log("body", body);
  const user = await Users.findOne(_id);
  return user;
};

const current = async (userId) => {
  const { _id } = userId;
  console.log("_id", _id);
  const user = await Users.findOne({ _id });
  console.log("user", user);
  return user;
};

module.exports = {
  register,
  login,
  logout,
  current,
};
