import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from "./Components/Login"
import Ide from "./Components/Ide"
import GetOutput from "./GetOutput";

function App() {
  const [code, setCode] = React.useState("");
  const codeChange = (e) => {
    setCode(e.target.value);
    console.log(code);
  }
  const getAns = async () => {
    const output = await GetOutput(code, "cpp17");
  }
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/ide'>
            <Ide />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;