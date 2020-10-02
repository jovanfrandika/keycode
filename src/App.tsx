import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import store from "./store";
import customTheme from "./theme";


import Main from "./pages/Main";

import "./App.css";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
