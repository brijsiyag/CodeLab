const express = require("express");
const app = express();
const PORT = process.env.PORT | 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Importing Routes
const Login = require("./Routes/Login");
const Signup = require("./Routes/Signup");
const Logout = require("./Routes/Logout");
const IsAuth = require("./Routes/IsAuth");
const LeaderBoard = require("./Routes/LeaderBoard");
const Submission = require("./Routes/Submission");
const Questions = require("./Routes/Questions");
const Question = require("./Routes/Question");
const UserInfo = require("./Routes/UserInfo");
const AddQuestion = require("./Routes/AddQuestion");
const Run = require("./Routes/Run");
const Submit = require("./Routes/Submit");
const RelatedQuestion = require("./Routes/RelatedQuestions");
const GetUserName = require("./Routes/GetUserName");
const RecentUpdates = require("./Routes/RecentUpdates");
const Users = require("./Routes/Users");
const DeleteUser = require("./Routes/DeleteUser");
const DeleteQuestion = require("./Routes/DeleteQuestion");
const EditUser = require("./Routes/EditUser");
const EditQuestion = require("./Routes/EditQuestion");
//MiddleWares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes
app.post("/login", Login);
app.post("/signup", Signup);
app.get("/logout", Logout);
app.get("/isAuth", IsAuth);
app.get("/leaderboard", LeaderBoard);
app.get("/submission/:id", Submission);
app.get("/questions", Questions);
app.get("/question/:id", Question);
app.get("/userinfo/:username", UserInfo);
app.post("/addquestion", AddQuestion);
app.post("/run", Run);
app.post("/submit/:question_id", Submit);
app.get("/questionlike/:tag", RelatedQuestion);
app.get("/username", GetUserName);
app.get("/recentactivities", RecentUpdates);
app.get("/users", Users);
app.delete("/user/:username", DeleteUser);
app.delete("/question/:question_id", DeleteQuestion);
app.post("/edituser", EditUser);
app.post("/editquestion", EditQuestion);
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}....`);
});
