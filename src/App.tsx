import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Main from "./pages/Main";
import "./styles/global.css";

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
