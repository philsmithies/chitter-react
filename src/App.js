import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <Router> 
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/user" exact component={User} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
