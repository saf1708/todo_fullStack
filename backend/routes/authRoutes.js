const express = require("express");
const router = express.Router();

const {
  sendOTP,
  signup,
  login,
  logout,
} = require("../controller/authController");

router.post("/sendotp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;