const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
router.get("/questions", (req, res) => {
  connection.query(
    "SELECT `question_id`, `name`, `question`, `tags`, `difficulty_level`, `sample_input`, `sample_output`, `input_detail`, `output_detail`,`author`, `submissions` FROM `question`",
    (err, result) => {
      if (err) {
        return res.send({ success: false, err: err.sqlMessage });
      }
      return res.json(result);
    }
  );
});

module.exports = router;
