import React, { Component } from "react";

import { TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

class BackIcon extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        style={{ marginLeft: 10 }}
        activeOpacity={0.8}
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
