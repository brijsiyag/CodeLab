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
Axios.defaults.withCredentials = true;

function App() {
  React.useEffect(() => {
    Axios.get("http://localhost:5000/isAuth", {})
      .then((res) => {
        sessionStorage.setItem("LoggedIn", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isAuth = () => {
    console.log(sessionStorage.getItem("LoggedIn"));
    if (sessionStorage.getItem("LoggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/question" component={Questions}></Route>
          <Route
            exact
            path="/question/:question_id"
            component={Question}
          ></Route>
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

          <Route exact path="/ide" component={Ide}></Route>
          <Route path="*" component={Ide}></Route>
        </Switch>
        <Footer />
      </Router>
      <CookieConsent />
    </div>
  );
}
export default App;
