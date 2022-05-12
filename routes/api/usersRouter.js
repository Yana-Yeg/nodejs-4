const express = require("express");
const router = express.Router();

const {
  register,
  // signup,
  login,
  logout,
  current,
} = require("../../models/users");
const { userSingupValidation } = require("../../middlewares/validMiddleware");

router.post("/signup", userSingupValidation, async (req, res) => {
  console.log("ljfns;jfnsjfns;jlfn");
  // const { email, password, subscription } = req.body;
  const user = await register(req.body);
  // console.log("newUser", newUser);
  if (user) {
    res.status(201).json({
      contentType: "application/json",
      ResponseBody: { user },
      // ==== need only
      // email: "bn222b@egnbvcx.com",
      // subscription: "starter",
    });
  }
  res.status(409).json({
    contentType: "application/json",
    ResponseBody: { message: "Email in use" },
  });
});

// router.post("/signup", userSingupValidation, async (req, res) => {
//   const user = await signup(req.body);
//   // console.log("newUser", newUser);
//   if (user) {
//     res.status(201).json({
//       contentType: "application/json",
//       ResponseBody: { user },
//       // ==== need only
//       // email: "bn222b@egnbvcx.com",
//       // subscription: "starter",
//     });
//   }
//   res.status(409).json({
//     contentType: "application/json",
//     ResponseBody: { message: "Email in use" },
//   });
// });

router.post("/login", userSingupValidation, async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  // console.log("newUser", newUser);
  if (user) {
    res.status(200).json({
      contentType: "application/json",
      ResponseBody: { user },
      // ==== need only
      // "token": "exampletoken",
      // "user": {
      // "email": "example@example.com",
      // "subscription": "starter" }
    });
  }
  res.status(401).json({
    ResponseBody: { message: "Email or password is wrong" },
  });
});

router.post("/logout", async (req, res) => {
  const data = await logout();
  res.status(200).json(data);
});

router.post("/current", async (req, res) => {
  const data = await current();
  res.status(200).json(data);
});

module.exports = router;
