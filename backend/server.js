const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;
const request = require("request");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./Middlewares/auth");
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(auth);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

app.get("/isAuth", (req, res) => {
  if (req.cookies !== undefined && req.cookies.Auth === "true") {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/login", (req, res) => {
  const userName = req.body.data.userName,
    password = req.body.data.password;
  connection.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (result.length > 0) {
        res
          .cookie("Auth", true, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 15 * 31536000000),
          })
          .cookie("username", userName, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 15 * 31536000000),
          })
          .send(true);
      } else {
        res.send(false);
      }
    }
  );
});

app.post("/signup", (req, res) => {
  console.log(req.body.data);
  connection.query(
    "SELECT * FROM user WHERE username=? OR email=?",
    [req.body.data.username, req.body.data.email],
    (err, result) => {
      if (err) {
        res.send({
          success: false,
          msg: "Can't Create Account,Please Try Again!!",
        });
      } else {
        if (result.length > 0) {
          res.send({ success: false, msg: "Duplicate Username or Email" });
        } else {
          connection.query(
            "INSERT INTO `user`(`name`, `username`, `gender`,`country`,`state`,`city`,`profession`,`institute`,`email`,`password`,`rating`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [
              req.body.data.name,
              req.body.data.username,
              req.body.data.gender,
              req.body.data.country,
              req.body.data.state,
              req.body.data.city,
              req.body.data.profession,
              req.body.data.institute,
              req.body.data.email,
              req.body.data.password,
              0,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({
                  success: false,
                  msg: "Can't Create Account,Please Try Again!!",
                });
              } else {
                res
                  .cookie("Auth", true, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(new Date().getTime() + 15 * 31536000000),
                  })
                  .cookie("username", req.body.data.username, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(new Date().getTime() + 15 * 31536000000),
                  })
                  .send({ success: true });
              }
            }
          );
        }
      }
    }
  );
});

app.get("/logout", (req, res) => {
  res.clearCookie("Auth");
  res.clearCookie("username");
  res.sendStatus(200).send(true);
});

app.get("/leaderboard", (req, res) => {
  connection.query("SELECT username,rating FROM user", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 10) {
        result.length = 10;
      }
      res.json(
        result.sort((a, b) => {
          return b.rating - a.rating;
        })
      );
    }
  });
});

app.get("/questions", (req, res) => {
  connection.query(
    "SELECT `question_id`, `name`, `question`, `tags`, `difficulty_level`, `sample_input`, `sample_output`, `input_detail`, `output_detail`, `submissions` FROM `question`",
    (err, result) => {
      res.json(result);
    }
  );
});

app.get("/question/:id", (req, res) => {
  connection.query(
    "SELECT * FROM question WHERE question_id = ?",
    [req.params.id],
    (err, result) => {
      res.send(result[0]);
    }
  );
});

app.get("/submissions", (req, res) => {
  connection.query(
    "SELECT * FROM question_details WHERE username = ?",
    ["brijsiyag"],
    (err, result) => {
      console.log(result.length);
      res.send(result);
      for (let i = 0; i < result.length; i++) {}
    }
  );
});

app.get("/userinfo/:username", (req, res) => {
  const username = req.params.username;
  connection.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    (err, result_user) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else if (result_user.length == 0) {
        res.sendStatus(400);
      } else {
        connection.query(
          "SELECT * FROM question_details WHERE username = ?",
          [username],
          (err, result_question_details) => {
            result_user[0].password = "";
            result_user[0].email = "";
            res.send({
              user: result_user[0],
              question_details: result_question_details,
            });
          }
        );
      }
    }
  );
});

app.post("/addquestion", (req, res) => {
  console.log(req.body);
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
        res.send({ ...err, error: true });
      } else {
        res.send({ ...result, error: false });
      }
    }
  );
});

app.post("/run", (req, res) => {
  const program = {
    script: req.body.code,
    language: req.body.lang,
    stdin: req.body.input,
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
      if (error) {
        console.log(error);
      } else {
        data.date = response.headers.date;
        connection.query(
          "SELECT * FROM questions WHERE question_id = ?",
          [req.body.question_id],
          (err, result) => {
            console.log(result);
          }
        );
        res.send(data);
        console.log(data);
      }
    }
  );
});

app.post("/submit/:question_id", (req, res) => {
  console.log(req.cookies);
  connection.query(
    "SELECT * FROM question WHERE question_id = ?",
    [req.params.question_id],
    (err, result_question) => {
      console.log(result_question);
      if (err || result_question.length === 0) {
        console.log(err);
        res.send({ success: false });
      } else {
        connection.query(
          "SELECT * FROM user WHERE username = ?",
          [req.cookies.username],
          (err, user_result) => {
            if (user_result.length === 0) {
              res.send({ success: false });
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
                    res.send({ success: false });
                  } else {
                    data.date = response.headers.date;
                    connection.query(
                      "UPDATE question SET submissions = submissions + 1 WHERE question_id = ?",
                      [req.params.question_id],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                          res.send({ success: false });
                        } else {
                          connection.query(
                            "INSERT INTO `question_details`(`question_id`, `username`, `status`, `code`, `time`, `space`, `submission_date`,`lang`) VALUES (?,?,?,?,?,?,?,?)",
                            [
                              req.params.question_id,
                              req.cookies.username,
                              JSON.stringify(
                                result_question[0].output.replace(
                                  /(\r\n|\n|\r)/g,
                                  ""
                                )
                              ) ===
                              JSON.stringify(
                                data.output.replace(/(\r\n|\n|\r)/g, "")
                              )
                                ? "AC"
                                : "WA",
                              req.body.code,
                              data.cpuTime,
                              data.memory,
                              new Date(),
                              req.body.lang,
                            ],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                res.send({ success: false });
                              } else {
                                if (
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
                                connection.query(
                                  "SELECT * FROM question_details WHERE question_id = ? AND status = 'AC'",
                                  [req.params.question_id],
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                      res.send({ success: false });
                                    }
                                    if (result.length === 0) {
                                      switch (
                                        result_question[0].difficulty_level
                                      ) {
                                        case "Hard":
                                          data.status === "AC"
                                            ? (rating_changed = 50)
                                            : (rating_changed = -30);
                                          break;

                                        case "Medium":
                                          data.status === "AC"
                                            ? (rating_changed = 30)
                                            : (rating_changed = -20);
                                          break;

                                        case "Easy":
                                          data.status === "AC"
                                            ? (rating_changed = 20)
                                            : (rating_changed = -10);
                                          break;
                                        default:
                                          break;
                                      }
                                    }
                                  }
                                );
                                console.log(rating_changed);
                                connection.query(
                                  "UPDATE user SET rating = rating + ? WHERE username = ?",
                                  [rating_changed, req.cookies.username],
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                      res.send({ success: false });
                                    } else {
                                      console.log(result);
                                      res.send(data);
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
            }
          }
        );
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}....`);
});
