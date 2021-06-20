import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Home from "./components/Home";
import MovieInfo from "./components/MovieInfo";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  useComponentWillMount(() =>
    sessionStorage.setItem("loggedInUser", "defaultUser")
  );
  useComponentDidMount(() => {});

  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/movieinfo">
              <MovieInfo />
            </Route>
            <Route path="/userprofile">
              <UserProfile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const useComponentWillMount = (func) => {
  const willMount = useRef(true);
  if (willMount.current) {
    func();
  }
  useComponentDidMount(() => {
    willMount.current = false;
  });
};

const useComponentDidMount = (func) => useEffect(func, []);

export default App;
