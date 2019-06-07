import React, { Component } from "react";
import PushNotification from "react-native-push-notification";

class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: token => {
        console.log("TOKEN:", token);
      },
      onNotification: notification => {
        console.log("Notification:", notification);
      }
    });
  }

  render() {
    return null;
  }
}

export default PushController;
