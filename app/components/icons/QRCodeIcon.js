import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

/*
  PROPS:
  - navigation: navigation object
*/

class QRCodeIcon extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("QRCode")}
        activeOpacity={0.8}
      >
        <SVG
          style={{ width: 32, height: 32 }}
          source={require("../../assets/icons/qrcode.svg")}
        />
      </TouchableOpacity>
    );
  }
}

export default QRCodeIcon;
