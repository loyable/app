import React, { Component } from "react";

import { TouchableOpacity, StyleSheet, Animated } from "react-native";

import PropTypes from "prop-types";

import vars from "../../config/styles";

//SVG Library
import SVG from "react-native-remote-svg";

class HamburgerIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500
    }).start();
  }
  render() {
    return (
      <Animated.View style={{ opacity: this.state.opacity }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={{ paddingLeft: vars.header.paddingHorizontal }}
          activeOpacity={0.8}
        >
          <SVG
            style={styles.icon}
            source={require("../../assets/icons/hamburger.svg")}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 25
  }
});

HamburgerIcon.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default HamburgerIcon;
