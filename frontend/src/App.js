import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login/Login"
import Ide from "./Ide/Ide"
import Question from "./Question/Question";
import Navbar from "./Navbar/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={Question}></Route>
          <Route exact path='/ide/sum' component={Ide}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='*' component={Ide}></Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;