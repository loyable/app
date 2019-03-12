import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";

import vars from "../../../config/styles";

class CardGridItem extends Component {
  getStyles(card) {
    return {
      container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        margin: vars.cardGrid.margin,
        marginRight: this.props.isLastOddItem
          ? vars.cardGrid.margin * 2 + 3
          : vars.cardGrid.margin,
        backgroundColor: card.settings.style.backgroundColor,
        borderRadius: vars.cardGrid.style.borderRadius,
        borderColor: card.settings.style.borderColor,
        borderWidth: card.settings.style.borderWidth,
        height: vars.cardGrid.style.height,
        shadowColor: vars.cardGrid.style.shadow.color,
        shadowOffset: {
          width: vars.cardGrid.style.shadow.offset.width,
          height: vars.cardGrid.style.shadow.offset.height
        },
        shadowOpacity: vars.cardGrid.style.shadow.opacity,
        shadowRadius: vars.cardGrid.style.shadow.radius,
        elevation: vars.cardGrid.style.elevation
      },
      logo: {
        width: card.header.logo.width,
        height: card.header.logo.height
      }
    };
  }
  render() {
    const card = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(card));

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: card.header.logo.src
          }}
        />
      </View>
    );
  }
}

export default CardGridItem;
