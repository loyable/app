import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

class Marker extends Component {
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
    let width = this.props.size - 10,
      height = this.props.size - 10;
    if (logo) {
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
