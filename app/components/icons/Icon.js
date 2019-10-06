import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

//Icon library
import FontAwesome from "react-native-vector-icons/FontAwesome5";

/*
  PROPS:
  - name: FontAwesome icon name (from "solid" library)
  - color: HEX/RGB icon color (default: #000)
  - size: icon size
  - style: style object
*/

class Icon extends Component {
  static defaultProps = {
    color: "#000",
    size: Platform.OS === "android" ? 28 : 26
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object
  };

  render() {
    const { name, color, size, style } = this.props;

    return (
      <FontAwesome name={name} solid style={{ ...style, color }} size={size} />
    );
  }
}

export default Icon;
