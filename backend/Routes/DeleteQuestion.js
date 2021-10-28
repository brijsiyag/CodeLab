const express = require("express");
const isAdmin = require("../IsAdmin");
const connection = require("../Mysql");
const router = express.Router();

router.delete("/question/:question_id", async (req, res) => {
  if (await isAdmin(req.cookies.username)) {
    connection.query(
      "DELETE FROM `question` WHERE question_id = ?",
      [req.params.question_id],
      (err, result) => {
        if (err) {
          return res.send({ success: false, err: err.sqlMessage });
        }
        res.send({ success: true });
      }
    );
  }
});

module.exports = router;
