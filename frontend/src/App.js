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
import Question from "./Question/Question";
import Navbar from "./Navbar/Navbar";
import QuestionAdd from "./AdminControls/QuestionAdd";
import Notificaion from "./Notification";
import Footer from "./Footer/Footer";
import Axios from "axios";
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
        <Notificaion />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/questions" component={Question}></Route>
          <Route
            exact
            path="/add-question"
            render={() => (true ? <QuestionAdd /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/ide/:id"
            render={() => (isAuth() ? <Ide /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/login"
            render={() => (isAuth() ? <Redirect to="/" /> : <Login />)}
          />

          <Route exact path="/ide" component={Ide}></Route>
          <Route path="*" component={Ide}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
