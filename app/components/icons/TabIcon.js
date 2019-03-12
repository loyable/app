import React, { Component } from "react";

import { Platform } from "react-native";

import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/FontAwesome5";

class TabIcon extends Component {
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
TabIcon.defaultProps = {
  color: "#000"
};

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default TabIcon;
