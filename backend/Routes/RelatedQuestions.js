const express = require("express");
const router = express.Router();
const connection = require("../Mysql");

router.get("/questionlike/:tag", (req, res) => {
  const tag = req.params.tag;
  console.log(tag);
  connection.query(
    "SELECT question_id FROM `question` WHERE tags LIKE ?",
    ["%" + tag + "%"],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ success: false });
      }
      return res.send(result);
    }
  );
});

module.exports = router;
