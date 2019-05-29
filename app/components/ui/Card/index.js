import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";

import vars from "../../../config/styles";

import SVG from "react-native-remote-svg";

import CardItem from "./CardItem";

/*
  PROPS:
  - settings: object
  - showInfo: boolean (not showing title and address) for details screens
*/

class Card extends Component {
  static defaultProps = {
    showInfo: true
  };

  getCards(merchant) {
    let multiple = true;
    let length = 0;

    merchant.cards.forEach(card => {
      if (card.hidden !== true) {
        length++;
      }
    });

    if (length === 1) {
      multiple = false;
    }

    return (
      <FlatList
        data={merchant.cards}
        horizontal={multiple}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (item.hidden === true) {
            return;
          }
          return (
            <CardItem
              settings={item}
              navigation={this.props.navigation}
              multiple={multiple}
            />
          );
        }}
        onEndReached={() => this.setState({ isLoading: false })}
      />
    );
  }

  render() {
    const merchant = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(merchant.merchant));

    return (
      <View style={styles.container}>
        {this.getCards(merchant)}

        {this.props.showInfo && (
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.props.navigateTo !== "none") {
                this.props.navigation.navigate("Details", {
                  merchant
                });
              }
            }}
          >
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.title}>{merchant.merchant.name}</Text>

                <Text style={styles.address}>
                  {merchant.merchant.address.value}
                </Text>
              </View>
              <SVG
                style={styles.infoIcon}
                source={require("../../../assets/icons/info.svg")}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  getStyles(merchant) {
    return {
      container: {
        marginTop: vars.card.container.marginTop,
        marginBottom: vars.card.container.marginBottom
      },
      infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: vars.card.infoContainer.marginHorizontal,
        marginTop: vars.card.infoContainer.marginTop,
        paddingTop: vars.card.infoContainer.paddingTop,
        paddingBottom: vars.card.infoContainer.paddingBottom,
        paddingLeft: vars.card.infoContainer.paddingLeft,
        paddingRight: vars.card.infoContainer.paddingRight,
        borderRadius: vars.card.infoContainer.borderRadius,
        backgroundColor: vars.card.infoContainer.backgroundColor,
        zIndex: -1,
        shadowOffset: {
          width: vars.card.infoContainer.shadow.offset.width,
          height: vars.card.infoContainer.shadow.offset.height
        },
        shadowColor: vars.card.infoContainer.shadow.color,
        shadowOpacity: vars.card.infoContainer.shadow.opacity,
        shadowRadius: vars.card.infoContainer.shadow.radius
      },
      title: {
        fontSize: merchant.style.title.fontSize
          ? merchant.style.title.fontSize
          : vars.fontSize.cardTitle,
        fontFamily: merchant.style.title.fontFamily
          ? merchant.style.title.fontFamily
          : vars.font.bold,
        color: merchant.style.title.color
          ? merchant.style.title.color
          : vars.color.cardTitle,
        textAlign: merchant.style.title.textAlign
          ? merchant.style.title.textAlign
          : "left",
        fontStyle: merchant.style.title.fontStyle
          ? merchant.style.title.fontStyle
          : "normal",
        fontWeight: merchant.style.title.fontWeight
          ? merchant.style.title.fontWeight
          : "normal",
        lineHeight: merchant.style.title.lineHeight
          ? merchant.style.title.lineHeight
          : merchant.style.title.fontSize
          ? merchant.style.title.fontSize
          : vars.fontSize.cardTitle + 5,
        letterSpacing: merchant.style.title.letterSpacing
          ? merchant.style.title.letterSpacing
          : 0
      },
      address: {
        fontSize: merchant.style.address.fontSize
          ? merchant.style.address.fontSize
          : vars.fontSize.cardAddress,
        fontFamily: merchant.style.address.fontFamily
          ? merchant.style.address.fontFamily
          : vars.font.regular,
        color: merchant.style.address.color
          ? merchant.style.address.color
          : vars.color.cardAddress,
        textAlign: merchant.style.address.textAlign
          ? merchant.style.address.textAlign
          : "left",
        fontStyle: merchant.style.address.fontStyle
          ? merchant.style.address.fontStyle
          : "normal",
        fontWeight: merchant.style.address.fontWeight
          ? merchant.style.address.fontWeight
          : "normal",
        lineHeight: merchant.style.address.lineHeight
          ? merchant.style.address.lineHeight
          : merchant.style.address.fontSize
          ? merchant.style.address.fontSize
          : vars.fontSize.cardAddress,
        letterSpacing: merchant.style.address.letterSpacing
          ? merchant.style.address.letterSpacing
          : 0
      }
    };
  }
}

export default Card;
