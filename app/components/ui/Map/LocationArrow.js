import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

//Icon object
import Icon from "../../icons/Icon";

class LocationArrow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon color="#007aff" name="location-arrow" size={20} />
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
  }
});

export default LocationArrow;
