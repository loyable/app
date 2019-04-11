import React, { Component } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import vars from "../../../config/styles";

import { Callout } from "react-native-maps";

/*
  PROPS:
  - tooltip.title
  - tooltip.description
  - tooltip.distance
  - tooltip.info

  - navigation
  - merchant
*/

class Tooltip extends Component {
  render() {
    const styles = StyleSheet.create(this.getStyles());

    const { merchant } = this.props;

    return (
      <Callout
        tooltip={true}
        onPress={() =>
          this.props.navigation.navigate("DetailsMapView", {
            merchant,
            navigateTo: "CardMapViewDetails"
          })
        }
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{merchant.merchant.name}</Text>
            <Text style={styles.description}>
              {merchant.merchant.description}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.distance}>3,7 km</Text>
            <Text style={styles.info}>Info</Text>
          </View>
        </View>
      </Callout>
    );
  }

  getStyles() {
    return {
      container: {
        width: 169,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      title: {
        fontSize: 16,
        color: "#3c3c3c",
        fontFamily: vars.font.bold
      },
      description: {
        fontSize: 12,
        color: "#696969",
        fontFamily: vars.font.regular
      },
      footer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      distance: {
        fontSize: 10,
        color: "#8e8e8e",
        fontFamily: vars.font.regular
      },
      info: {
        color: "#0070F5",
        fontSize: 12,
        fontFamily: vars.font.bold
      }
    };
  }
}

export default Tooltip;
