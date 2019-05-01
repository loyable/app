import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class AccountScreen extends Component {
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
        <Text>AccountScreen</Text>
      </View>
    );
  }
}

export default AccountScreen;
