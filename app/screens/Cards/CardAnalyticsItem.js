import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import vars from "../../config/styles";

import CardCircle from "./CardCircle";

class CardAnalyticsItem extends Component {
  render() {
    return (
      <View style={styles.cardAnalyticsItem}>
        <CardCircle
          number={this.props.number}
          color={this.props.color}
          backgroundColor={this.props.backgroundColor}
        />
        <Text style={styles.cardAnalyticsText}>{this.props.text[0]}</Text>
        <Text style={styles.cardAnalyticsText}>{this.props.text[1]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardAnalyticsItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardAnalyticsText: {
    fontSize: 13,
    fontFamily: vars.font.regular
  }
});

export default CardAnalyticsItem;
