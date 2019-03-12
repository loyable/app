import React, { Component } from "react";

import { TouchableOpacity, StyleSheet, Platform } from "react-native";

import PropTypes from "prop-types";

import vars from "../../config/styles";

//SVG Library
import SVG from "react-native-remote-svg";

class QRCodeIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("QRCode")}
        style={styles.icon}
        activeOpacity={0.8}
      >
        <SVG source={require("../../assets/icons/qrcode.svg")} />
      </TouchableOpacity>
    );
  }
}

QRCodeIcon.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    paddingVertical:
      Platform.OS === "android"
        ? vars.header.paddingVerticalAndroid
        : vars.header.paddingVerticalIOS
  }
});
export default QRCodeIcon;
