const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
router.get("/users", (req, res) => {
  connection.query(
    "SELECT `username`, `name`,`email`,  `rating`, `gender`, `country`, `state`, `city`, `institute`, `profession` FROM user where admin = 0",
    (err, result) => {
      if (err) {
        return res.send({ success: false });
      } else {
        return res.send(result);
      }
    }
  );
});

module.exports = router;
