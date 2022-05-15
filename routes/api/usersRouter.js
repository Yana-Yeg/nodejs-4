const express = require("express");
const router = express.Router();
const {
  catchErrors,
  conflict,
  forbidden,
} = require("../../middlewares/catch-errors");

const { register, login, findOneUser } = require("../../models/users");
const { userRegLoginValidation } = require("../../middlewares/validMiddleware");
const authenticate = require("../../middlewares/authorization");

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

router.get(
  "/logout",
  authenticate,
  catchErrors(async (req, res) => {
    const user = await findOneUser(req.user.token);
    user.token = null;
    res.sendStatus(204);
  })
);

router.get(
  "/current",
  authenticate,
  catchErrors(async (req, res) => {
    const user = await findOneUser(req.user.token);
    res.status(200).json({
      contentType: "application/json",
      ResponseBody: { user },
    });
  })
);

module.exports = router;
