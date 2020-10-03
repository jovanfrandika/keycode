import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";

import store from "./store";
import customTheme from "./theme";

import Main from "./pages/Main";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <ColorModeProvider >
            <CSSReset />
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </ColorModeProvider>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
