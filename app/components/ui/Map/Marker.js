import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";

class Marker extends Component {
  static defaultProps = {
    selected: false,
    size: 30
  };

  render() {
    const { logo, selected } = this.props;

    const styles = StyleSheet.create(this.getStyles(logo));

    return (
      <Animated.View style={[styles.marker]}>
        <Image
          style={styles.markerImage}
          source={{
            uri: logo.src
          }}
        />
      </Animated.View>
    );
  }

  getStyles(logo) {
    let width = this.props.size - 10,
      height = this.props.size - 10;
    if (logo.width >= logo.height) {
      height = (width * logo.height) / logo.width;
    } else {
      width = (height * logo.width) / logo.height;
    }

    return {
      marker: {
        width: this.props.size,
        height: this.props.size,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: this.props.size / 2,
        backgroundColor: logo.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      markerImage: {
        width,
        height
      }
    };
  }
}

export default Marker;
