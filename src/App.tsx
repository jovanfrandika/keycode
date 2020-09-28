import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import store from "./store";
import Main from "./containers/pages/Main";

import "./App.css";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
