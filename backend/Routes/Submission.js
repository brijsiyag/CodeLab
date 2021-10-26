const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
router.get("/submission/:id", (req, res) => {
  connection.query(
    "SELECT * FROM question_details WHERE submission_id = ?",
    [req.params.id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.send({ success: false });
      } else {
        connection.query(
          "SELECT * FROM question_details WHERE question_id = ? AND username = ? AND status = ?",
          [result[0].question_id, req.cookies.username, "AC"],
          (err, result1) => {
            if (err || result1.length === 0) {
              return res.send({ success: false });
            } else {
              return res.send(result[0]);
            }
          }
        );
      }
    }
  );
});

module.exports = router;