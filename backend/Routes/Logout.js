const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  res.clearCookie("Auth");
  res.clearCookie("username");
  return res.send({ success: true });
});

module.exports = router;
