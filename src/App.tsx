import { StyleSheet, css } from "aphrodite";
import Home from "./Home";
import Stats from "./Stats";
import Battle from "./Battle";
import Paths from "./Paths";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={css(styles.app)}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/battle">Battle</Link>
            </li>
            <li>
              <Link to="/paths">Paths</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/battle">
            <Battle />
          </Route>
          <Route path="/paths">
            <Paths />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

const styles = StyleSheet.create({
  app: {
    backgroundColor: "red",
    height: 1000,
    width: 1000,
  },
});
