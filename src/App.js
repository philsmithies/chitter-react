import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Index from './pages/Index';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/" exact component={Index}  />
        <Route path="/signup" exact component={SignUp}  />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
