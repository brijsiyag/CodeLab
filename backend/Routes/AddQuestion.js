const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
const UpdateActivities = require("../UpdateActivities");
router.post("/addquestion", (req, res) => {
  connection.query(
    "INSERT INTO `question`(`question_id`, `name`, `question`, `output`, `tags`, `difficulty_level`, `input`, `sample_input`, `sample_output`, `input_detail`, `output_detail`, `submissions`, `author`, `date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
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
      0,
      req.body.author,
      new Date(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ ...err, success: false });
      } else {
        UpdateActivities(
          `New Problem ${req.body.name} added with tag ${req.body.tags}`
        );
        return res.send({ ...result, success: true });
      }
    }
  );
});

module.exports = router;
