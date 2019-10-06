import React, { Component } from "react";

import { Platform } from "react-native";

import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/FontAwesome5";

class TabIcon extends Component {
  static defaultProps = {
    color: "#000"
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  };

  render() {
    return (
      <Icon
        name={this.props.name}
        solid
        style={{ color: this.props.color }}
        size={Platform.OS === "android" ? 28 : 26}
      />
    );
  }
}

export default TabIcon;
