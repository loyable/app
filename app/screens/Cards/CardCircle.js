import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

//global vars
import vars from "../../config/styles";

class CardAnalyticsCircle extends Component {
  static defaultProps = {
    number: 0,
    size: 60,
    color: "#fff",
    backgroundColor: "#ccc",
    fontSize: 35
  };
  render() {
    const styles = StyleSheet.create({
      circle: {
        width: this.props.size,
        height: this.props.size,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: this.props.size / 2,
        backgroundColor: this.props.backgroundColor,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      number: {
        fontFamily: vars.font.regular,
        fontSize: this.props.fontSize,
        color: this.props.color
      }
    });
    return (
      <View style={styles.circle}>
        <Text style={styles.number}>{this.props.number}</Text>
      </View>
    );
  }
}

export default CardAnalyticsCircle;
