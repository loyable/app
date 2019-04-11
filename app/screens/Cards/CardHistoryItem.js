import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import vars from "../../config/styles";

import CardCircle from "./CardCircle";

/*
  PROPS:
  - history:
    - value:
    - time:
    - type:
*/

class CardHistoryItem extends Component {
  parseDate(time) {
    const date = new Date(time);

    function addLeadingZero(num) {
      return ("0" + num).slice(-2);
    }

    const day = addLeadingZero(date.getDay());
    const month = addLeadingZero(date.getMonth());
    const year = addLeadingZero(date.getFullYear());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());

    const dateString = `${day}/${month}/${year} ${hours}:${minutes}`;

    return dateString;
  }

  render() {
    const { value, time, type } = this.props.history;
    let color, backgroundColor, text;

    switch (type) {
      case "completed":
        color = "#fff";
        backgroundColor = "#10E5E8";
        text = "Tessera completata";
        break;
      case "added":
        color = "#fff";
        backgroundColor = "#F00";
        text = "Tessera associata";
        break;
      case "add":
        (color = "#fff"), (backgroundColor = "#72E81F");
        if (value !== "+1") {
          text = "Bollini aggiunti";
        } else {
          text = "Bollino aggiunto";
        }
        break;
    }

    const dateString = this.parseDate(time);

    return (
      <View style={styles.cardHistoryItem}>
        <View style={styles.cardHistoryIcon}>
          <CardCircle
            number={value}
            size={35}
            fontSize={22}
            color={color}
            backgroundColor={backgroundColor}
          />
        </View>
        <View style={styles.cardHistoryTextContainer}>
          <Text style={styles.cardHistoryText}>{text}</Text>
        </View>
        <View style={styles.cardHistoryDateContainer}>
          <Text style={styles.cardHistoryDate}>{dateString}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  cardHistoryIcon: {},
  cardHistoryTextContainer: {
    marginLeft: 12
  },
  cardHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#3c3c3c"
  },
  cardHistoryDateContainer: {
    flex: 1
  },
  cardHistoryDate: {
    fontFamily: vars.font.regular,
    fontSize: 14,
    color: "#7B7B7B",
    textAlign: "right"
  }
});

export default CardHistoryItem;
