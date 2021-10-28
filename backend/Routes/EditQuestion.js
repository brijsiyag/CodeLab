const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
const isAdmin = require("../IsAdmin");
const UpdateActivities = require("../UpdateActivities");
router.post("/editquestion", async (req, res) => {
  let sql =
    "UPDATE `question` SET `question_id`=?,`name`=?,`question`=?,`output`=?,`tags`=?,`difficulty_level`=?,`input`=?,`sample_input`=?,`sample_output`=?,`input_detail`=?,`output_detail`=?,`author`=?,`date`=? WHERE question_id = ?";
  let values = [
    req.body.question_id,
    req.body.name,
    req.body.question,
    req.body.output,
    req.body.tags,
    req.body.difficulty_level,
    req.body.input,
    req.body.sampleInput,
    req.body.sampleOutput,
    req.body.inputDetails,
    req.body.outputDetails,
    req.body.author,
    new Date(),
    req.body.original_question_id,
  ];
  if (req.body.input === "" || req.body.output === "") {
    sql =
      "UPDATE `question` SET `question_id`=?,`name`=?,`question`=?,`tags`=?,`difficulty_level`=?,`sample_input`=?,`sample_output`=?,`input_detail`=?,`output_detail`=?,`author`=?,`date`=? WHERE question_id = ?";
    values = [
      req.body.question_id,
      req.body.name,
      req.body.question,
      req.body.tags,
      req.body.difficulty_level,
      req.body.sampleInput,
      req.body.sampleOutput,
      req.body.inputDetails,
      req.body.outputDetails,
      req.body.author,
      new Date(),
      req.body.original_question_id,
    ];
  }
  console.log(req.body);
  if (await isAdmin(req.cookies.username)) {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ error: err.sqlMessage, success: false });
      } else {
        return res.send({ result: result, success: true });
      }
    });
  }
});

module.exports = router;
