const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
const UpdateActivities = require("../UpdateActivities");

router.post("/signup", (req, res) => {
  connection.query(
    "SELECT * FROM user WHERE username=? OR email=?",
    [req.body.data.username, req.body.data.email],
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          msg: "Can't Create Account,Please Try Again!!",
        });
      } else {
        if (result.length > 0) {
          return res.send({
            success: false,
            msg: "Duplicate Username or Email",
          });
        } else {
          connection.query(
            "INSERT INTO `user`(`name`, `username`, `gender`,`country`,`state`,`city`,`profession`,`institute`,`email`,`password`,`rating`,`admin`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              req.body.data.name,
              req.body.data.username,
              req.body.data.gender,
              req.body.data.country,
              req.body.data.state,
              req.body.data.city,
              req.body.data.profession,
              req.body.data.institute,
              req.body.data.email,
              req.body.data.password,
              500,
              false,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  msg: "Can't Create Account,Please Try Again!!",
                });
              } else {
                UpdateActivities(`New user ${req.body.data.username} joined.`);
                return res
                  .cookie("Auth", true, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(
                      new Date().getTime() + 15 * 31536000000000
                    ),
                  })
                  .cookie("username", req.body.data.username, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(
                      new Date().getTime() + 15 * 31536000000000
                    ),
                  })
                  .send({ success: true });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
