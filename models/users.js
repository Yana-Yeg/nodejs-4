const bcryptjs = require("bcryptjs");
require("dotenv").config();
// const jwt = require("jsomwebtoken");
const { Users } = require("../db/usersModel");
// const { Conflict } = require("http-errors");

const register = async (userParams) => {
  try {
    const { email, password, subscription } = userParams;
    console.log(userParams);
    const newUser = await Users.create({
      email,
      passwordHash: await bcryptjs.hash(password, 8),
      subscription,
    });
    return newUser;
  } catch (error) {
    console.error(error.message);
  }
};

// const signup = async (userParams) => {
//   try {
//     const { email, password, subscription } = userParams;
//     const exsistUser = await Users.findOne({ email });
//     if (exsistUser) {
//       console.log("lwj;jlfsf.dnv/dfljnvfjlvslfsl");
//       // throw new Conflict("User already exists");
//     }
//     console.log(process.env.BCRYPTJS_SALT);
//     const user = await Users.create({
//       email,
//       passwordHash: await bcryptjs.hash(password, process.env.BCRYPTJS_SALT),
//       subscription,
//     });
//     return user;
//   } catch (error) {
//     console.error(error.message);
//   }
// };

const login = async (email, password) => {
  try {
    const user = await Users.findOne({ email });
    console.log(user);
    // const hash = await bcryptjs.hash(password, 8);
    // const s = await bcryptjs.compare(password, hash);
    // if (!())) return;
    // const token = jwt.sign(
    //   {
    //     email: user.email,
    //     subscription: user.subscription,
    //   },
    //   process.env.JWT_SECRET
    // );
    return user;
  } catch (error) {
    console.error(error.message);
  }
};

const logout = async (name, email, phone, favorite) => {
  try {
    // const newContact = await Contacts.create({ name, email, phone, favorite });
    // return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const current = async (name, email, phone, favorite) => {
  try {
    // const newContact = await Contacts.create({ name, email, phone, favorite });
    // return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  // signup,
  register,
  login,
  logout,
  current,
};
