const express = require("express");
const router = express.Router();
const {
  // catchErrors,
  conflict,
  forbidden,
  // unauthorize,
} = require("../../middlewares/catch-errors");

const {
  register,
  login,
  // logout,
  // current,
} = require("../../models/users");
const { userRegLoginValidation } = require("../../middlewares/validMiddleware");

router.post(
  "/signup",
  userRegLoginValidation,
  conflict(async (req, res) => {
    const { email, subscription } = await register(req.body);
    res.status(201).json({
      contentType: "application/json",
      ResponseBody: { user: { email, subscription } },
    });
  })
);

router.post(
  "/login",
  userRegLoginValidation,
  forbidden(async (req, res) => {
    const { email, subscription, token } = await login(req.body);
    // console.log("newUser: ", data);

    if ((email, subscription, token)) {
      res.status(200).json({
        contentType: "application/json",
        ResponseBody: { token, user: { email, subscription } },
      });
    }
    res.status(401).json({
      ResponseBody: { message: "Email or password is wrong" },
    });
  })
);

// router.post(
//   "/logout",
//   unauthorize(async (req, res) => {
//     const user = await logout(req.body);
//     if (user) {
//       user.token = null;
//       res.status(204);
//     }
//   })
// );

// router.get(
//   "/current",
//   // userRegLoginValidation,
//   catchErrors(async (req, res) => {
//     const user = await current(req.userId);
//     if (user) {
//       res.status(200).json(user);
//     }
//   })
// );

module.exports = router;
