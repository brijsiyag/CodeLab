const express = require("express");
const connection = require("../Mysql");
const router = express.Router();

router.get("/isAuth", (req, res) => {
  connection.query(
    "SELECT admin FROM user where username = ?",
    [req.cookies.username],
    (err, result) => {
      if (err) {
        return res.send({ auth: false, admin: false });
      }
      if (
        req.cookies !== undefined &&
        req.cookies.Auth === "true" &&
        result.length > 0 &&
        result[0].admin === 1
      ) {
        return res.send({ auth: true, admin: true });
      } else if (req.cookies !== undefined && req.cookies.Auth === "true") {
        res.send({ auth: true, admin: false });
      } else {
        return res.send({ auth: false, admin: false });
      }
    }
  );
});

module.exports = router;
