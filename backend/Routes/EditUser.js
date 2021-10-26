const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
const isAdmin = require("../IsAdmin");
const UpdateActivities = require("../UpdateActivities");
router.post("/edituser", async (req, res) => {
  console.log(req.body.data);
  if (
    (await isAdmin(req.cookies.username)) ||
    req.cookies.username === req.body.data.username
  ) {
    connection.query(
      "UPDATE `user` SET `name`=?,`gender`=?,`country`=?,`state`=?,`city`=?,`institute`=?,`profession`=?,`email`=? WHERE username = ?",
      [
        req.body.data.name,
        req.body.data.gender,
        req.body.data.country,
        req.body.data.state,
        req.body.data.city,
        req.body.data.institute,
        req.body.data.profession,
        req.body.data.email,
        req.body.data.username,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            msg: err.sqlMessage,
          });
        } else {
          return res.send({ success: true, result: result });
        }
      }
    );
  }
});

module.exports = router;
