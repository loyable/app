import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class Dot extends Component {
  render() {
    const styles = StyleSheet.create(this.getStyles());
    return <View style={styles.dot} />;
  }
  getStyles() {
    return {
      dot: {
        width: 10,
        height: 10,
        backgroundColor: this.props.active ? "#fff" : "rgba(255,255,255,0.2)",
        borderRadius: 5,
        marginRight: 10
      }
    };
  }
}

export default Dot;
