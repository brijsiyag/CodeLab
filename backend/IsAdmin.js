const connection = require("./Mysql");
module.exports = isAdmin = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT admin FROM user where username = ?",
      [username],
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          return resolve(false);
        }
        if (result.length > 0 && result[0].admin == 1) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      }
    );
  });
};
// module.exports = isAdmin = async (username) => {
//   connection.query(
//     "SELECT admin FROM user where username = ?",
//     [username],
//     (err, result) => {
//       console.log(result);
//       if (err) {
//         console.log(err);
//         return false;
//       }
//       if (result.length > 0 && result[0].admin == 1) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   );
// };
