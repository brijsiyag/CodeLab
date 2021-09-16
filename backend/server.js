const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;
const request = require('request');
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "DbmsProject"
});


app.get("/", (req, res) => {
    res.send("Hiii");
});

app.get("/questions", (req, res) => {
    connection.query("SELECT * FROM question", (err, result) => {
        res.json(result);
    });
});
app.post("/addQuestion", (req, res) => {
    connection.query(`INSERT INTO question VALUES('${req.body.question_id}', '${req.body.question}', '${req.body.output}', '${req.body.tags}', '${req.body.difficulty_level}', '${req.body.input}')`, (err, result) => {
        if (err) {
            res.send({ ...err, error: true });
        }
        else {
            res.send({ ...result, error: false });
        }
    })
})

app.post("/submit", (req, res) => {
    res.redirect("/");
    const program = {
        script: req.body.code,
        language: req.body.lang,
        stdin: req.body.input,
        versionIndex: "0",
        clientId: "f78c1fad61223d9d89c6f7cc12803ca0",
        clientSecret: "9e5cf482484e8d00ef5e450194a30af12694f5f5c433f31fcaf2302c2086e450"
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
        function (error, response, body) {
            let data = { ...body };
            if (error) {
                console.log(error);
            }
            else {
                data.date = response.headers.date;
                res.send(data);
                console.log(data);
            }
        });
})

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})