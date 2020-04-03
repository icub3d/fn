import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";

import history from "../history";

import Words from "./functions/Words";
import Sudoku from "./functions/Sudoku";

// Our list of functions.
const functions = [Words.definition, Sudoku.definition];

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Main {...props} functions={functions} />}
              />
              <Route exact path="/words" component={Words} />
              <Route exact path="/sudoku" component={Sudoku} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
