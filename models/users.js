const bcryptjs = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../db/usersModel");
// const { Conflict } = require("http-errors");

const register = async (userParams) => {
  const { email, password, subscription } = userParams;
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

const logout = async (name, email, phone, favorite) => {
  // const newContact = await Contacts.create({ name, email, phone, favorite });
  // return newContact;
};

const current = async (name, email, phone, favorite) => {
  // const newContact = await Contacts.create({ name, email, phone, favorite });
  // return newContact;
};

module.exports = {
  // signup,
  register,
  login,
  logout,
  current,
};
