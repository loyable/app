import React, { Component } from "react";
import vars from "../config/styles";

import { Text, View, SafeAreaView, StyleSheet } from "react-native";

import uuid from "uuid/v4";

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
    const { user } = this.props.user;
    const uuid = user.user.id;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mostra il codice QR</Text>
        <View style={styles.qrcode}>
          <QRCode value={uuid} size={250} bgColor="black" fgColor="white" />
        </View>

        <Text style={styles.subtitle}>Il tuo identificativo:</Text>
        <Text style={styles.description}>{uuid}</Text>
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
  subtitle: {
    fontFamily: vars.font.bold,
    fontSize: 25,
    color: vars.color.subtitle
  },
  description: {
    fontFamily: vars.font.regular,
    fontSize: 16,
    color: vars.color.description
  },
  qrcode: {
    paddingVertical: 40
  }
});

export default connect(mapStateToProps)(QRCodeScreen);
