import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import vars from "../config/styles";

import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");
class AccountScreen extends Component {
  render() {
    return (
      <ScrollView
        horizontal={true}
        style={styles.scrollview}
        pagingEnabled={true}
      >
        <ImageBackground
          source={require("../assets/img/instructions1.jpg")}
          style={{ width: width, height: "100%" }}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.container}>
              <View style={styles.logoContainer}>
                <SVG
                  style={styles.logo}
                  source={require("../assets/icons/logobianco.svg")}
                />
              </View>
              <View>
                <Text style={styles.title}>L'applicazione</Text>
                <Text style={styles.description}>
                  Loyable semplifica la gestione delle tessere fedeltà da parte
                  dell'utente che potrà averle sempre a portata di smartphone.
                </Text>
              </View>
              <View>
                <Text>Salta</Text>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/img/instructions1.jpg")}
          style={{ width: width, height: "100%" }}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.container}>
              <View style={styles.logoContainer}>
                <SVG
                  style={styles.logo}
                  source={require("../assets/icons/logobianco.svg")}
                />
              </View>
              <View>
                <Text style={styles.title}>Come funziona?</Text>
                <Text style={styles.description}>
                  Gli esercenti convenzionati presenti sulla mappa possono
                  associare al tuo account la loro tessera fedeltà.
                </Text>
              </View>
              <View>
                <Text>Salta</Text>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  container: {
    margin: 15
  },
  logoContainer: {
    marginVertical: 50
  },
  logo: {
    width: 120,
    height: 60
  },
  title: {
    fontFamily: vars.font.regular,
    fontSize: 36,
    color: "#fff"
  },
  description: {
    fontFamily: vars.font.regular,
    fontSize: 22,
    color: "#fff"
  }
});

export default AccountScreen;
