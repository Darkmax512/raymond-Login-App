const express = require("express");
const {
  createUser,
  login,
  set2FA,
  verify2FA,
  verifyEmail,
  logout,
} = require("../controllers/auth");
const auth = require("../middlewares/authentication");
const router = express.Router();

router.route("/signup").post(createUser);
router.route("/signin").post(login);
router.route("/validate").get(auth);
router.patch("/set-2fa", auth, set2FA);
router.patch("/verify-2fa", auth, verify2FA);
router.patch("/verify-email/:token", verifyEmail);
router.route("/logout").get(auth, logout);

module.exports = router;
