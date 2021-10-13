import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import New from "./pages/New";
import Test from "./pages/Test.js";
import Footer from "./components/Footer";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  // memo prevents the change unless anything else changes.
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={providerValue}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/new" component={New} />
            <Route path="/test" component={Test} />
            <Route path="/users" component={admin ? "" : LogIn} />
            <Route path="/tweets" component={admin ? "" : LogIn} />
          </Switch>
        </UserContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
