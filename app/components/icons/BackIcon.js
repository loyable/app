import React, { Component } from "react";
import { TouchableOpacity, Animated } from "react-native";
import PropTypes from "prop-types";

import Back from "../../assets/icons/back";

/*
  PROPS:
  - navigation: navigation object
*/

class BackIcon extends Component {
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
      duration: 500
    }).start();
  }
  render() {
    return (
      <Animated.View style={{ opacity: this.state.opacity }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          activeOpacity={0.8}
        >
          <Back />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default BackIcon;
