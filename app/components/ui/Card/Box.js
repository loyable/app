import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import vars from "../../../config/styles";

class Box extends Component {
  render() {
    const { card, marked } = this.props;

    const styles = StyleSheet.create(this.getStyles(card));

    if (marked) {
      return (
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <Image
              style={{
                width: card.mark.image.width,
                height: card.mark.image.height
              }}
              source={{
                uri: card.mark.image.src
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
        width: marks.style.width,
        height: marks.style.height,
        backgroundColor: marks.style.backgroundColor
          ? marks.style.backgroundColor
          : vars.color.cardBoxBackgroundColor,
        borderRadius:
          marks.style.shape.type !== "circle"
            ? marks.style.shape.value
            : marks.style.width / 2,
        borderWidth: marks.style.borderWidth,
        borderColor: marks.style.borderColor,
        padding: marks.style.padding
          ? marks.style.padding
          : vars.card.marks.style.padding
      },
      boxContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: marks.mark.style.backgroundColor
          ? marks.mark.style.backgroundColor
          : card.marks.mark.style.backgroundColor,
        borderRadius:
          marks.mark.style.shape.type !== "circle"
            ? marks.mark.style.shape.value
            : marks.style.width / 2,
        borderWidth: marks.mark.style.borderWidth,
        borderColor: marks.mark.style.borderColor
      }
    };
  }
}

export default Box;
