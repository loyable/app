import React, { Component } from "react";
import vars from "../config/styles";

import { Text, View, SafeAreaView, StyleSheet } from "react-native";

import { connect } from "react-redux";

import QRCode from "react-native-qrcode";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class QRCodeScreen extends Component {
  render() {
    const { id } = this.props.user.userID;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mostra il codice QR</Text>
        <View style={styles.qrcode}>
          <QRCode value={id} size={250} bgColor="black" fgColor="white" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: vars.font.bold,
    fontSize: 30,
    color: vars.color.title
  },
  qrcode: {
    paddingVertical: 40
  }
});

export default connect(mapStateToProps)(QRCodeScreen);
