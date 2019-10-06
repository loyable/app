import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

/*
  PROPS:
  - active: boolean (if slide is active) (default: false)
*/

class Dot extends Component {
  static propTypes = {
    active: PropTypes.bool
  };
  static defaultProps = {
    active: false
  };
  render() {
    return (
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: this.props.active ? "#fff" : "rgba(255,255,255,0.2)",
          borderRadius: 5,
          marginRight: 10
        }}
      />
    );
  }
}

export default Dot;
