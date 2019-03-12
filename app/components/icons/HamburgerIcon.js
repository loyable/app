import React, { Component } from "react";

import { TouchableOpacity, Platform, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import vars from "../../config/styles";

//SVG Library
import SVG from "react-native-remote-svg";

class HamburgerIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.openDrawer()}
        style={styles.icon}
        activeOpacity={0.8}
      >
        <SVG source={require("../../assets/icons/hamburger.svg")} />
      </TouchableOpacity>
    );
  }
}

HamburgerIcon.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: Platform.OS === "android" ? 30 : 25,
    marginLeft: 20,
    paddingVertical:
      Platform.OS === "android"
        ? vars.header.paddingVerticalAndroid
        : vars.header.paddingVerticalIOS
  }
});
export default HamburgerIcon;
