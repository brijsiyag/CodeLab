import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login/Login"
import Ide from "./Ide/Ide"
import Question from "./Question/Question";
import Navbar from "./Navbar/Navbar";
import QuestionAdd from "./AdminControls/QuestionAdd"
import Notificaion from "./Notification"
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Notificaion />
        <Switch>
          <Route exact path='/' component={Question}></Route>
          <Route exact path='/add-question' component={QuestionAdd}></Route>
          <Route exact path='/ide' component={Ide}></Route>
          <Route exact path='/ide/:id' component={Ide}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route path='*' component={Ide}></Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;