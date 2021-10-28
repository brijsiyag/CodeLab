const express = require("express");
const router = express.Router();
const connection = require("../Mysql");
const request = require("request");
require("dotenv").config();
router.post("/submit/:question_id", (req, res) => {
  connection.query(
    "SELECT * FROM question WHERE question_id = ?",
    [req.params.question_id],
    (err, result_question) => {
      if (err) {
        console.log(err);
        return res.send({ success: false, err: err.sqlMessage });
      } else if (result_question.length === 0) {
        return res.send({ success: false, err: "No Question Found!!" });
      } else {
        connection.query(
          "SELECT * FROM user WHERE username = ?",
          [req.cookies.username],
          (err, user_result) => {
            if (user_result.length === 0) {
              return res.send({ success: false, err: "User not found!!" });
            } else {
              const program = {
                script: req.body.code,
                language: req.body.lang,
                stdin: result_question[0].input,
                versionIndex: "0",
                clientId: process.env.JDoodle_Client_Id,
                clientSecret: process.env.JDoodle_Client_Secret,
              };
              request(
                {
                  url: "https://api.jdoodle.com/v1/execute",
                  method: "POST",
                  json: program,
                },
                function (error, response, body) {
                  let data = { ...body };
                  console.log(data);
                  if (error) {
                    console.log(error);
                    return res.send({ success: false, err: error.sqlMessage });
                  } else {
                    data.date = response.headers.date;
                    connection.query(
                      "UPDATE question SET submissions = submissions + 1 WHERE question_id = ?",
                      [req.params.question_id],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                          return res.send({
                            success: false,
                            err: err.sqlMessage,
                          });
                        } else {
                          connection.query(
                            "SELECT * FROM question_details WHERE question_id = ? AND status = 'AC' AND username = ?",
                            [req.params.question_id, req.cookies.username],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                return res.send({
                                  success: false,
                                  err: err.sqlMessage,
                                });
                              }
                              if (
                                result_question[0].output !== null &&
                                data.output !== null &&
                                JSON.stringify(
                                  result_question[0].output.replace(
                                    /(\r\n|\n|\r)/g,
                                    ""
                                  )
                                ) ===
                                  JSON.stringify(
                                    data.output.replace(/(\r\n|\n|\r)/g, "")
                                  )
                              ) {
                                data.status = "AC";
                              } else {
                                data.status = "WA";
                              }
                              let rating_changed = 0;
                              if (result.length === 0) {
                                if (
                                  result_question[0].difficulty_level === "Hard"
                                ) {
                                  data.status === "AC"
                                    ? (rating_changed = 50)
                                    : (rating_changed = -30);
                                } else if (
                                  result_question[0].difficulty_level ===
                                  "Medium"
                                ) {
                                  data.status === "AC"
                                    ? (rating_changed = 30)
                                    : (rating_changed = -20);
                                } else {
                                  data.status === "AC"
                                    ? (rating_changed = 20)
                                    : (rating_changed = -10);
                                }
                              }
                              connection.query(
                                "UPDATE user SET rating = rating + ? WHERE username = ?",
                                [rating_changed, req.cookies.username],
                                (err, result) => {
                                  if (err) {
                                    console.log(err);
                                    return res.send({
                                      success: false,
                                      err: err.sqlMessage,
                                    });
                                  }
                                }
                              );
                              connection.query(
                                "INSERT INTO `question_details`(`question_id`, `username`, `status`, `code`, `time`, `space`, `submission_date`,`lang`) VALUES (?,?,?,?,?,?,?,?)",
                                [
                                  req.params.question_id,
                                  req.cookies.username,
                                  data.status,
                                  req.body.code,
                                  data.cpuTime,
                                  data.memory,
                                  new Date(),
                                  req.body.lang,
                                ],
                                (err, result) => {
                                  if (err) {
                                    console.log(err);
                                    return res.send({
                                      success: false,
                                      err: err.sqlMessage,
                                    });
                                  } else {
                                    return res.send(data);
                                  }
                                }
                              );
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
