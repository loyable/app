import React, { Component } from "react";
import { Text, View, Button } from "react-native";

import BackIcon from "../../components/icons/BackIcon";

class DetailsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate("CardDetails")}
          title="Go to Card Details"
        />
      </View>
    );
  }
}

export default DetailsScreen;
