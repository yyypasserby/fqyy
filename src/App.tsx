import { css, StyleSheet } from "aphrodite";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Battle from "./scenes/Battle";
import Home from "./scenes/Home";
import Paths from "./scenes/Paths";
import Stats from "./scenes/Stats";

function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;

const styles = StyleSheet.create({
  app: {
    backgroundColor: "silver",
  },
});
