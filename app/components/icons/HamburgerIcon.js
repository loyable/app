import React, { Component } from "react";
import { TouchableOpacity, Animated } from "react-native";
import PropTypes from "prop-types";

//SVG Library
import SVG from "react-native-remote-svg";

/*
  PROPS:
  - navigation: navigation object
*/

class HamburgerIcon extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500 //Opacity animation duration
    }).start();
  }
  render() {
    return (
      <Animated.View style={{ opacity: this.state.opacity }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          activeOpacity={0.8}
        >
          <SVG
            style={{
              width: 30, //Icon width
              height: 25 //Icon height
            }}
            source={require("../../assets/icons/hamburger.svg")}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default HamburgerIcon;
