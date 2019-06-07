import React, { Component } from "react";

import { AppRegistry, AppState } from "react-native";

import App from "./App";

import { name } from "./app.json";

import { store } from "./app/store";

import { Provider } from "react-redux";

import PushController from "./app/config/pushcontroller";

import PushNotification from "react-native-push-notification";

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
        <PushController />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(name, () => Root);
