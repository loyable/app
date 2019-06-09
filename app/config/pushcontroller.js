import React, { Component } from "react";
import PushNotification from "react-native-push-notification";

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
    const { userID } = this.props.user;

    PushNotification.configure({
      onRegister: device => {
        this.props.SET_DEVICE(userID, device, () => {
          console.log("Device:", device);
        });
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushController);
