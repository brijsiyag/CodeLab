const express = require("express");
const router = express.Router();
const request = require("request");
require("dotenv").config();
router.post("/run", (req, res) => {
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
        return res.send(data);
      }
    }
  );
});

module.exports = router;
