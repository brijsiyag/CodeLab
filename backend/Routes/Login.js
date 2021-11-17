const express = require("express");
const router = express.Router();
const connection = require("../Mysql");

router.post("/login", (req, res) => {
  const userName = req.body.data.userName,
    password = req.body.data.password;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          err: "Something Went Wrong!! Please Try Again.",
        });
      }
      if (result.length > 0) {
        res
          .cookie("Auth", true, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 15 * 31536000000000),
          })
          .cookie("username", userName, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 15 * 31536000000000),
          })
          .send({ success: true, admin: result[0].admin === 1 ? true : false });
      } else {
        return res.send({
          success: false,
          admin: false,
          err: "Invalid Credentials!!",
        });
      }
    }
  );
});

module.exports = router;
