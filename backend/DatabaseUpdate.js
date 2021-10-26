const mysql = require("mysql");
const data = require("./Codeforces.json");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

for (let i = 0; i < data.length; i++) {
  let rating = parseInt(data[i].tags[data[i].tags.length - 1].slice(1, 100));
  let difficulty_level;
  if (rating < 1000) {
    difficulty_level = "Easy";
  } else if (rating >= 1000 && rating <= 1200) {
    difficulty_level = "Medium";
  } else {
    difficulty_level = "Hard";
  }
  connection.query(
    "INSERT INTO `question`(`question_id`, `name`, `question`, `output`, `tags`, `difficulty_level`, `input`, `sample_input`, `sample_output`, `input_detail`, `output_detail`, `submissions`, `author`, `date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      data[i].question_id,
      data[i].name,
      data[i].question,
      data[i].sample_output,
      JSON.stringify(data[i].tags),
      difficulty_level,
      data[i].sample_input,
      data[i].sample_input,
      data[i].sample_output,
      data[i].input_details,
      data[i].output_details,
      0,
      "Admin",
      new Date(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
}
