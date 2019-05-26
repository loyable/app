import React, { Component } from "react";

import { AppRegistry } from "react-native";

import App from "./App";

import { name } from "./app.json";

import { store } from "./app/store";

import { Provider } from "react-redux";

class Root extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(name, () => Root);
