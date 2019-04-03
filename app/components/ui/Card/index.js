import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";

import vars from "../../../config/styles";

import Box from "./Box";

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
    if (merchant.cards.length === 1) {
      multiple = false;
    }
    return (
      <FlatList
        data={merchant.cards}
        horizontal={multiple}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CardItem
            settings={item}
            navigation={this.props.navigation}
            multiple={multiple}
          />
        )}
        onEndReached={() => this.setState({ isLoading: false })}
      />
    );
  }

  render() {
    const merchant = this.props.settings;

    const styles = StyleSheet.create(this.getStyles(merchant.merchant));

    return (
      <View>
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
              <Text style={styles.title}>{merchant.merchant.name}</Text>

              <Text style={styles.address}>
                {merchant.merchant.address.value}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  getStyles(merchant) {
    return {
      infoContainer: {
        marginHorizontal: vars.card.infoContainer.marginHorizontal,
        marginTop: vars.card.infoContainer.marginTop,
        marginBottom: vars.card.infoContainer.marginBottom
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
