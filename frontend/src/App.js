// eslint-disable-next-line no-unused-vars

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Ide from "./Ide/Ide";
import Questions from "./Questions/Questions";
import Navbar from "./Navbar/Navbar";
import QuestionAdd from "./AdminControls/QuestionAdd";
import Footer from "./Footer/Footer";
import Axios from "axios";
import Question from "./Question/Question";
import SignUp from "./SignUp/SignUp";
import CookieConsent from "./Cookie_Consent";
import Profile from "./Profile/Profile";
import PageNotFound_404 from "./PageNotFound_404";
import Submission from "./Submission/Submission";
import AdminPage from "./AdminControls/AdminPage";
Axios.defaults.withCredentials = true;

console.log(process.env);
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [Admin, setAdmin] = React.useState(false);
  React.useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/isAuth`, {})
      .then((res) => {
        sessionStorage.setItem("LoggedIn", res.data.auth);
        sessionStorage.setItem("isAdmin", res.data.admin);
        setLoggedIn(res.data.auth);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const isAdmin = () => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setAdmin(true);
      return true;
    } else {
      setAdmin(false);
      return false;
    }
  };
  const isAuth = () => {
    sessionStorage.getItem("isAdmin") === "true"
      ? setAdmin(true)
      : setAdmin(false);
    if (sessionStorage.getItem("LoggedIn") === "true") {
      setLoggedIn(true);
      return true;
    } else {
      setLoggedIn(false);
      return false;
    }
  };
  return (
    <div>
      <Router>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          isAdmin={Admin}
          setIsAdmin={setAdmin}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/question" component={Questions}></Route>
          <Route exact path="/users/:username" component={Profile}></Route>
          <Route
            exact
            path="/question/:question_id"
            component={Question}
          ></Route>
          <Route
            exact
            path="/admin"
            render={() =>
              isAdmin() ? <AdminPage /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/add-question"
            render={() =>
              isAuth() ? <QuestionAdd /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/ide/:question_id"
            render={() => (isAuth() ? <Ide /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/login"
            render={() => (isAuth() ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (isAuth() ? <Redirect to="/" /> : <SignUp />)}
          />
          <Route
            exact
            path="/submission/:submission_id"
            component={Submission}
          />
          <Route exact path="/ide" component={Ide}></Route>
          <Route path="*" component={PageNotFound_404}></Route>
        </Switch>
        <Footer />
      </Router>
      <CookieConsent />
    </div>
  );
}
export default App;
