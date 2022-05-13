const jwt = require("jsonwebtoken");
const { Unauthenticated, CustomError } = require("../errors");
const User = require("../models/User");
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) throw new Unauthenticated("Authentication Token Required.");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userID);
    const newToken = user.createJwt(payload.twoFA);
    res.cookie("token", newToken, {
      maxAge: 1000 * 60 * +process.env.Expire_Date,
    });
    if ((req.route.path === "/validate", payload.twoFA)) {
      const result = user.toObject();
      delete result._id;
      delete result.password;
      return res.status(200).json(result);
    }
    payload.user = user;
    req.payload = payload;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(401).json({ message: "Authentication Faild!" });
  }
};

module.exports = auth;
