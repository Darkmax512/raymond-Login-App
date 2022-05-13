const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your firstName!"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your lastName!"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "You have To Provide a valid Email address!",
      ],
      unique: [true, "This Email is already exist!"],
    },
    password: {
      type: String,
      required: [true, "You have to provide a password."],
      trim: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    emailToken: {
      type: String,
      default: undefined,
    },
    emailTokenExp: {
      type: Date,
      default: undefined,
    },
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJwt = function (twoFA) {
  return jwt.sign(
    { userID: this._id, name: this.name, email: this.email, twoFA },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.Expire_Date}m`,
    }
  );
};

UserSchema.methods.passwordCheck = async function (password) {
  const isPassword = await bcrypt.compare(password, this.password);
  return isPassword;
};

UserSchema.methods.getEmailToken = function () {
  const emailToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");
  this.emailToken = hashedToken;
  this.emailTokenExp = Date.now() + 4 * 1000 * 60 * 60;
  return emailToken;
};

UserSchema.methods.set2FASecret = function () {
  const secret = speakeasy.generateSecret({ name: "2FA-Test" });
  this.twoFactorSecret = secret.base32;
  return QRCode.toDataURL(secret.otpauth_url);
};

UserSchema.methods.verify2FASecret = function (token) {
  try {
    const verified = speakeasy.totp.verify({
      secret: this.twoFactorSecret,
      encoding: "base32",
      token,
      ...(this.twoFactorAuth && { window: 1 }),
    });
    return verified;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
