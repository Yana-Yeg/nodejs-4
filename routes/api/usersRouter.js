const express = require("express");
const router = express.Router();
const {
  catchErrors,
  conflict,
  forbidden,
} = require("../../middlewares/catch-errors");

const {
  register,
  // signup,
  login,
  logout,
  current,
} = require("../../models/users");
const { userAuthValidation } = require("../../middlewares/validMiddleware");

router.post(
  "/signup",
  userAuthValidation,
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
  userAuthValidation,
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

router.post(
  "/logout",
  catchErrors(async (req, res) => {
    const data = await logout();
    res.status(200).json(data);
  })
);

router.post(
  "/current",
  catchErrors(async (req, res) => {
    const data = await current();
    res.status(200).json(data);
  })
);

module.exports = router;
