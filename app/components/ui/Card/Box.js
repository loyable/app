import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

// Import global variables
import vars from "../../../config/styles";

/*
  PROPS:
  - marks: object
  - marked: boolean (if mark is marked)
*/

class Box extends Component {
  static defaultProps = {
    marked: false
  };

  static propTypes = {
    marks: PropTypes.object.isRequired,
    marked: PropTypes.bool
  };

  render() {
    const { marks, marked } = this.props;

    const styles = StyleSheet.create(this.getStyles(marks));

    if (marked) {
      return (
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <Image
              style={{
                width: marks.mark.image.hasOwnProperty("width")
                  ? marks.mark.image.width
                  : 30,
                height: marks.mark.image.hasOwnProperty("height")
                  ? marks.mark.image.height
                  : 30
              }}
              source={{
                uri: marks.mark.image.src
              }}
            />
          </View>
        </View>
      );
    } else {
      return <View style={styles.box} />;
    }
  }
  getStyles(marks) {
    return {
      box: {
        width: marks.style.hasOwnProperty("width") ? marks.style.width : 50,
        height: marks.style.hasOwnProperty("height") ? marks.style.height : 50,
        backgroundColor: marks.style.hasOwnProperty("backgroundColor")
          ? marks.style.backgroundColor
          : "#ffffff",
        borderRadius: marks.style.hasOwnProperty("borderRadius")
          ? marks.style.borderRadius
          : 0,
        borderWidth: marks.style.hasOwnProperty("borderWidth")
          ? marks.style.borderWidth
          : 0,
        borderColor: marks.style.hasOwnProperty("borderColor")
          ? marks.style.borderColor
          : "#ffffff",
        padding: marks.style.hasOwnProperty("padding") ? marks.style.padding : 1
      },
      boxContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: marks.mark.style.hasOwnProperty("backgroundColor")
          ? marks.mark.style.backgroundColor
          : "#000000",
        borderRadius: marks.mark.style.hasOwnProperty("borderRadius")
          ? marks.mark.style.borderRadius
          : 0,
        borderWidth: marks.mark.style.hasOwnProperty("borderWidth")
          ? marks.mark.style.borderWidth
          : 0,
        borderColor: marks.mark.style.hasOwnProperty("borderColor")
          ? marks.mark.style.borderColor
          : 0
      }
    };
  }
}

export default Box;
