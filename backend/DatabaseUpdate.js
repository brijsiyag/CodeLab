const mysql = require("mysql");
const data = require("./Codeforces.json");
const UpdateActivity = require("./UpdateActivities");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

// for (let i = 0; i < 200; i++) {
//   let username = `test${i + 1}`;
//   let cIndex = Math.floor(Math.random() * countries.length);
//   let country = countries[cIndex].name;
//   let sIndex = Math.floor(Math.random() * countries[cIndex].states.length);
//   let state = countries[cIndex].states[sIndex].name;
//   let ciIndex = Math.floor(
//     Math.random() * countries[cIndex].states[sIndex].cities.length
//   );
//   let city = countries[cIndex].states[sIndex].cities[ciIndex];
//   console.log(country, state, city);
//   connection.query(
//     "INSERT INTO `user`(`username`, `name`, `password`, `rating`, `gender`, `country`, `state`, `city`, `institute`, `profession`, `email`, `admin`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
//     [
//       username,
//       `Test${i + 1}`,
//       username,
//       500,
//       Math.floor(Math.random() * 1000) % 2 === 1 ? "Male" : "Female",
//       country,
//       state,
//       city,
//       "National Institute of " + city + "," + state + "," + country,
//       Math.floor(Math.random() * 1000) % 2 === 1 ? "Student" : "Professional",
//       username + "@gmail.com",
//       0,
//     ]
//   );
// }

// for (let i = 0; i < data.length; i++) {
//   let rating = parseInt(data[i].tags[data[i].tags.length - 1].slice(1, 100));
//   let difficulty_level;
//   if (rating < 1000) {
//     difficulty_level = "Easy";
//   } else if (rating >= 1000 && rating <= 1200) {
//     difficulty_level = "Medium";
//   } else {
//     difficulty_level = "Hard";
//   }
//   data[i].tags.splice(data[i].tags.length - 1, 1);
//   connection.query(
//     "INSERT INTO `question`(`question_id`, `name`, `question`, `output`, `tags`, `difficulty_level`, `input`, `sample_input`, `sample_output`, `input_detail`, `output_detail`, `submissions`, `author`, `date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//     [
//       data[i].question_id,
//       data[i].name,
//       data[i].question,
//       data[i].sample_output,
//       JSON.stringify(data[i].tags),
//       difficulty_level,
//       data[i].sample_input,
//       data[i].sample_input,
//       data[i].sample_output,
//       data[i].input_details,
//       data[i].output_details,
//       0,
//       "Admin",
//       new Date(),
//     ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     }
//   );
// }

for (let i = 0; i < 100; i++) {
  if (Math.floor(Math.random() * 1000) % 2 === 0) {
    UpdateActivity(`New user ${"Test" + i}(${"test" + i}) joined.`);
  } else {
    UpdateActivity(
      `New Problem ${data[i].name}(${
        data[i].question_id
      }) added with tags ${data[i].tags.slice(0, data[i].tags.length - 2)}.`
    );
  }
}
