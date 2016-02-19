import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import pluginApp from "./Reducers/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppContainer from "./containers/AppContainer";

let store = createStore(pluginApp);
const mountNode = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  mountNode
);
