import React, { Component } from "react";

import { AppRegistry, AppState, Alert, Linking, Platform } from "react-native";

import App from "./App";

import { name } from "./app.json";

import { store } from "./app/store";

import { Provider } from "react-redux";

import PushController from "./app/config/pushcontroller";

import settings from "./app/config/settings";

class Root extends Component {
  constructor(props) {
    super(props);

    fetch(`${settings.url.api}`)
      .then(res => res.json())
      .then(data => {
        if (data.version !== settings.version) {
          Alert.alert(
            "Aggiornamento disponibile!",
            "Dopo l'aggiornamento potrai continuare ad utilizzare l'app",
            [
              {
                text: "Aggiorna",
                onPress: () => {
                  let storeURL;
                  if (Platform.OS === "ios") {
                    storeURL = data.store.ios;
                  } else {
                    storeURL = data.store.android;
                  }
                  Linking.openURL(storeURL);
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
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
