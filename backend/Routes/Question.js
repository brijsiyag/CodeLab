const express = require("express");
const router = express.Router();
const connection = require("../Mysql");

router.get("/question/:id", (req, res) => {
  connection.query(
    "SELECT `question_id`, `name`, `question`, `tags`, `difficulty_level`, `sample_input`, `sample_output`, `input_detail`, `output_detail`, `submissions`, `author`, `date` FROM question WHERE question_id = ?",
    [req.params.id],
    (err, result) => {
      if (err || result.length == 0) {
        console.log(err);
        return res.send({ success: false });
      } else {
        result[0].date = result[0].date.toDateString();
        connection.query(
          "SELECT `username`, `status`, `time`, `space`, `submission_id`, `lang` FROM `question_details` WHERE question_id = ?",
          [req.params.id],
          (err, result1) => {
            if (err) {
              return res.send({ success: false });
            } else {
              result[0].submissions = result1;
              return res.send(result[0]);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
