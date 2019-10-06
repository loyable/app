import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

/*
  PROPS:
  - link: screen name as string (to navigate if clicked)
  - navigation: navigation object
*/

class LogoIcon extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(this.props.link)}
        activeOpacity={0.8}
      >
        <SVG
          style={{ width: 110, height: 50 }}
          source={require("../../assets/icons/logo.svg")}
        />
      </TouchableOpacity>
    );
  }
}

export default LogoIcon;
