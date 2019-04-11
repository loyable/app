import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

import vars from "../../../config/styles";

class CardGridItem extends Component {
  static defaultProps = {
    navigateTo: "Details"
  };

  getStyles(merchant) {
    let width = 130,
      height = 80;
    if (merchant.logo.width >= merchant.logo.height) {
      height = (width * merchant.logo.height) / merchant.logo.width;
    } else {
      width = (height * merchant.logo.width) / merchant.logo.height;
    }

    return {
      container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        margin: vars.cardGrid.margin,
        marginRight: this.props.isLastOddItem
          ? vars.cardGrid.margin * 2 + 3
          : vars.cardGrid.margin,
        backgroundColor: merchant.logo.backgroundColor,
        borderRadius: vars.cardGrid.style.borderRadius,
        borderColor: merchant.logo.borderColor,
        borderWidth: merchant.logo.borderWidth,
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
        width: width,
        height: height
      }
    };
  }
  render() {
    const merchant = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(merchant.merchant));

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate(this.props.navigateTo, {
            merchant,
            navigateTo: "CardGridDetails"
          })
        }
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri: merchant.merchant.logo.src
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default CardGridItem;
