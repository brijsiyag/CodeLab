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
app.use(auth);

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
    "SELECT * FROM user WHERE user_name = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (result.length > 0) {
        res
          .status(200)
          .cookie("Auth", true, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 100 * 1000),
          })
          .cookie("user_name", userName, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(new Date().getTime() + 100 * 1000),
          })
          .send(true);
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/logout", (req, res) => {
  res.clearCookie("Auth");
  res.clearCookie("user_name");
  res.sendStatus(200);
});

app.get("/leaderboard", (req, res) => {
  connection.query("SELECT user_name,rating FROM user", (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 10) {
      result.length = 10;
    }
    res.json(
      result.sort((a, b) => {
        return b.rating - a.rating;
      })
    );
  });
});

app.get("/questions", (req, res) => {
  connection.query("SELECT * FROM question", (err, result) => {
    res.json(result);
  });
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
    "SELECT * FROM question_details WHERE user_name = ?",
    ["brijsiyag"],
    (err, result) => {
      console.log(result.length);
      res.send(result);
      for (let i = 0; i < result.length; i++) {}
    }
  );
});

app.post("/addquestion", (req, res) => {
  connection.query(
    `INSERT INTO question VALUES('${req.body.question_id}', '${req.body.question}', '${req.body.output}', '${req.body.tags}', '${req.body.difficulty_level}', '${req.body.input}')`,
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

app.post("/submit", (req, res) => {
  console.log(req.cookies);
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
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}....`);
});
