const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
router.get("/leaderboard", (req, res) => {
  connection.query("SELECT username,rating FROM user", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      if (result.length > 10) {
        result.length = 10;
      }
      res.json(
        result.sort((a, b) => {
          return b.rating - a.rating;
        })
      );
    }
  });
});

module.exports = router;
