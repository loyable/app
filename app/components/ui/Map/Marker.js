import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

/*
  PROPS:
  - size: marker size (default: 30)
  - logo.width: width of marker logo
  - logo.height: height of marker logo
  - logo.src: file source of marker logo
  - logo.backgroundColor: marker background color
*/

class Marker extends Component {
  static propTypes = {
    size: PropTypes.number,
    logo: PropTypes.object
  };

  static defaultProps = {
    size: 30
  };

  render() {
    const { logo } = this.props;

    const styles = StyleSheet.create(this.getStyles(logo));

    if (logo) {
      return (
        <View style={styles.marker}>
          <Image
            style={styles.markerImage}
            source={{
              uri: logo.src
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.markerNoImage} />;
    }
  }

  getStyles(logo) {
    const { size } = this.props;

    let width = size - 10,
      height = size - 10;
    if (logo) {
      if (logo.width >= logo.height) {
        height = (width * logo.height) / logo.width;
      } else {
        width = (height * logo.width) / logo.height;
      }
      return {
        marker: {
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: size / 2,
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
    } else {
      return {
        markerNoImage: {
          width,
          height,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#fff",
          backgroundColor: "#7cc639",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 0.1
        }
      };
    }
  }
}

export default Marker;
