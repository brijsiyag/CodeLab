const express = require("express");
const router = express.Router();

router.get("/username", (req, res) => {
  console.log(req.cookies.username);
  if (req.cookies !== undefined) {
    return res.send(req.cookies.username);
  } else {
    return res.send({ success: false });
  }
});

module.exports = router;
