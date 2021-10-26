const express = require("express");
const isAdmin = require("../IsAdmin");
const connection = require("../Mysql");
const router = express.Router();

router.delete("/user/:username", async (req, res) => {
  if (await isAdmin(req.cookies.username)) {
    connection.query(
      "DELETE FROM `user` WHERE username = ?",
      [req.params.username],
      (err, result) => {
        if (err) {
          return res.send({ success: false });
        }
        res.send({ success: true });
      }
    );
  }
});

module.exports = router;
