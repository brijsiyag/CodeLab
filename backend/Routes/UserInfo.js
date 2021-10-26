const express = require("express");
const router = express.Router();
const connection = require("../Mysql");

router.get("/userinfo/:username", (req, res) => {
  const username = req.params.username;
  connection.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    (err, result_user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      } else if (result_user.length == 0) {
        return res.sendStatus(400);
      } else {
        connection.query(
          "SELECT  `question_id`, `username`, `status`, `time`, `space`, `submission_id`, `submission_date`, `lang` FROM question_details WHERE username = ?",
          [username],
          (err, result_question_details) => {
            result_user[0].password = "";
            if (username !== req.cookies.username) {
              result_user[0].email = "";
            }
            return res.send({
              user: result_user[0],
              question_details: result_question_details,
            });
          }
        );
      }
    }
  );
});

module.exports = router;
