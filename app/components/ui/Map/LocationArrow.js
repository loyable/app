import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

class LocationArrow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.arrow} name="location-arrow" solid />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.1
  },
  arrow: {
    fontSize: 20,
    color: "#007aff"
  }
});

export default LocationArrow;
