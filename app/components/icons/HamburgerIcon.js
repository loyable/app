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
        style={{ paddingLeft: vars.header.paddingHorizontal }}
        activeOpacity={0.8}
      >
        <SVG
          style={styles.icon}
          source={require("../../assets/icons/hamburger.svg")}
        />
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
    height: 25
  }
});
export default HamburgerIcon;
