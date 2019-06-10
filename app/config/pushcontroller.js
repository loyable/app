import React, { Component } from "react";
import PushNotification from "react-native-push-notification";

import { AppState } from "react-native";

import { connect } from "react-redux";

import { SET_DEVICE } from "../store/actions";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_DEVICE: (userID, device, callback) => {
      dispatch(SET_DEVICE(userID, device, callback));
    }
  };
};
class PushController extends Component {
  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = appState => {
    if (appState === "active") {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  render() {
    const { userID } = this.props.user;

    if (userID.hasOwnProperty("id")) {
      PushNotification.configure({
        onRegister: device => {
          this.props.SET_DEVICE(userID, device);
        },
        onNotification: notification => {
          console.log("Notification:", notification);
        }
      });
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushController);
