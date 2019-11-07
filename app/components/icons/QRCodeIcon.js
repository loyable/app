import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import QRCode from "../../assets/icons/qrcode";

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
        <QRCode style={{ width: 32, height: 32 }} />
      </TouchableOpacity>
    );
  }
}

export default QRCodeIcon;
