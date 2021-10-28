const express = require("express");
const router = express.Router();
const connection = require("../Mysql");

router.get("/recentactivities", (req, res) => {
  connection.query(
    "SELECT * FROM activities ORDER BY activity_id DESC LIMIT 10 ",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ success: false, err: err.sqlMessage });
      } else {
        return res.send(result);
      }
    }
  );
});

module.exports = router;
