import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import NewTweet from "./pages/NewTweet";

function App() {
  return (
    <div className="App">
      <Router> 
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/profile/:userId" exact component={Profile} />
          <Route path="/new" exact component={NewTweet} />
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
