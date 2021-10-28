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
            if (err) {
              return res.send({ success: false, err: err.sqlMessage });
            }
            result_user[0].password = "";
            if (username !== req.cookies.username) {
              result_user[0].email = "";
            }
            connection.query(
              "SELECT username,rank() OVER (ORDER by rating desc ) AS 'rank' FROM user",
              (err, rank_result) => {
                if (err) {
                  return res.send({ success: false, err: err.sqlMessage });
                }
                rank_result = rank_result.filter((element) => {
                  return element.username === username;
                });
                result_user[0].global_rank = rank_result[0].rank;
                return res.send({
                  user: result_user[0],
                  question_details: result_question_details,
                });
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
