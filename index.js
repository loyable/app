import React, { Component } from "react";
import { AppRegistry } from "react-native";

import App from "./App";

//Import app name
import { name } from "./app.json";

//Import Redux store
import { store } from "./app/store";

//Import Redux Provider component
import { Provider } from "react-redux";

//Import Utils component
import Utils from "./app/config/utils";

class Root extends Component {
  componentDidMount() {
    //Check for updates
    Utils.checkUpdate();
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
