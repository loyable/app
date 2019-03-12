import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class SettingsScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff"
        }}
      >
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

export default SettingsScreen;
