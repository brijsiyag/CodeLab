const connection = require("./Mysql");

const UpdateActivities = (activity) => {
  connection.query(
    "INSERT INTO `activities`( `activity`, `activity_date`) VALUES (?,?)",
    [activity, new Date()],
    (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("Activity added successfuly..");
      }
    }
  );
};
module.exports = UpdateActivities;
