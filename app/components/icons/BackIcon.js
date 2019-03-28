import React, { Component } from "react";

import { TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

import vars from "../../config/styles";

class BackIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        activeOpacity={0.8}
        style={{ paddingLeft: vars.header.paddingLeftBackArrow }}
      >
        <SVG source={require("../../assets/icons/back.svg")} />
      </TouchableOpacity>
    );
  }
}

BackIcon.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default BackIcon;
