import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { store } from "./redux";
import * as ROUTES from "./constants/routes";
import Home from "./components/Home";
import Landing from "./components/Landing";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.HOME} component={Home} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
