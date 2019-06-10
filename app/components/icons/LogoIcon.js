import React, { Component } from "react";

import { TouchableOpacity, StyleSheet } from "react-native";

import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

class LogoIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(this.props.link)}
        activeOpacity={0.8}
      >
        <SVG
          style={styles.icon}
          source={require("../../assets/icons/logo.svg")}
        />
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
    width: 110,
    height: 50
  }
});
export default LogoIcon;
