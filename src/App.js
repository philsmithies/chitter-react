import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Index from './pages/Index/Index.js';

function App() {
  return (
    <div className="App">
      <h2>chitter</h2>
      <Router>
      <Switch>
        <Route path="/" exact component={Index}  />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
