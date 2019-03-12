import React, { Component } from "react";

import { TouchableOpacity, Platform, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import vars from "../../config/styles";

//SVG Library
import SVG from "react-native-remote-svg";

class LogoIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(this.props.link)}
        style={styles.icon}
        activeOpacity={0.8}
      >
        <SVG source={require("../../assets/icons/logo.svg")} />
      </TouchableOpacity>
    );
  }
}

LogoIcon.propTypes = {
  link: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 50,
    paddingVertical:
      Platform.OS === "android"
        ? vars.header.paddingVerticalAndroid
        : vars.header.paddingVerticalIOS
  }
});
export default LogoIcon;
