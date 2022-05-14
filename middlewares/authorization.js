const { catchErrors, Unauthorize } = require("./catch-errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authorization = catchErrors((req, res, next) => {
  try {
    const authorizationHeader = req.header.authorization;
    const token = authorizationHeader.replace("Bearer", "");
    const isToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = isToken;
    next();
  } catch (error) {
    throw new Unauthorize();
  }
});
