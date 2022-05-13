const { BadRequest, Unauthenticated } = require("../errors");
const sendMail = require("../helpers/sendMail");
const asyncWrapper = require("../middlewares/asyncWrapper");
const crypto = require("crypto");
const User = require("../models/User");

const createUser = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  // const Token = user.createJwt();
  // res.cookie("token", Token, { maxAge: 1000 * 60 * 30 });
  const emailToken = user.getEmailToken();
  await sendMail(user.email, "Email Verification Test", "verifyEmail", {
    url: `${process.env.BASE_URL}/verify-email?token=${emailToken}`,
  });
  await user.save();
  res.status(201).json({ message: "Please Verify ur Email" });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest("You have to Enter Email and password");
  const user = await User.findOne({ email });
  if (!user) throw new NotFound("This Email dosn't exist!");
  const checkPassword = await user.passwordCheck(password);
  if (!checkPassword) throw new Unauthenticated("That password is incorrect.");
  if (!user.verifiedEmail)
    throw new Unauthenticated("Please Verify Your Email.");
  const Token = user.createJwt(false);
  res.cookie("token", Token, { maxAge: 1000 * 60 * +process.env.Expire_Date });
  if (!user.twoFactorAuth) return res.status(205).json({ twoFA: false });
  res.status(206).json({ twoFA: true });
});

const verifyEmail = asyncWrapper(async (req, res) => {
  const { token } = req.params;
  const emailToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    emailToken,
    emailTokenExp: { $gt: Date.now() },
  });
  if (!user)
    throw new Unauthenticated(
      "Wrong or Expired Token Please ask For Another one!"
    );
  user.verifiedEmail = true;
  user.emailToken = undefined;
  user.emailTokenExp = undefined;
  await user.save();
  res.status(200).json({ message: "Email Has Been Verified Successfuly" });
});

const set2FA = asyncWrapper(async (req, res) => {
  const { userID } = req.payload;
  const user = await User.findById(userID);
  const image = await user.set2FASecret();
  await user.save();
  res.status(200).json({ qrImage: image });
});

const verify2FA = asyncWrapper(async (req, res) => {
  const { userID } = req.payload;
  const { token } = req.body;
  const user = await User.findById(userID);
  const verified = user.verify2FASecret(token);
  if (!verified) throw new Unauthenticated("Wrong Token Setting 2FA failed");
  if (!user.twoFactorAuth) {
    user.twoFactorAuth = true;
    await user.save();
    return res.status(200).json({ message: "You have successfuly set 2FA" });
  }
  const Token = user.createJwt(true);
  res.cookie("token", Token, { maxAge: 1000 * 60 * +process.env.Expire_Date });
  const result = user.toObject();
  delete result.password;
  res.status(200).json(result);
});

const logout = asyncWrapper(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({ msg: "logging out" });
});

module.exports = { createUser, login, verifyEmail, set2FA, verify2FA, logout };
