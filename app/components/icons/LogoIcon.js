import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Logo from "../../assets/icons/logo";

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
        <Logo style={{ width: 110, height: 50 }} />
      </TouchableOpacity>
    );
  }
}

export default LogoIcon;
