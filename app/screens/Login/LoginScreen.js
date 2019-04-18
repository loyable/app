import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";

import { connect } from "react-redux";

import vars from "../../config/styles";

import settings from "../../config/settings";

import PhoneInput from "../../components/react-native-phone-input";

import Storage from "../../store/asyncstorage";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {};
};
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      isCorrect: false
    };

    //verifica se l'utente è loggato
    Storage.getItem("userID").then(userID => {
      if (userID) {
        this.props.navigation.navigate("DrawerNavigator");
      }
    });
  }

  verifyNumber(number) {
    this.setState({ number });
    if (this.phone.isValidNumber()) {
      this.setState({ isCorrect: true });
    } else {
      this.setState({ isCorrect: false });
    }
  }

  resetNumber() {
    this.setState({ number: "", isCorrect: false });
  }

  getVerificationCode() {
    const { number, isCorrect } = this.state;

    if (isCorrect) {
      fetch(`${settings.url.api}/auth/${number}`)
        .then(res => res.json())
        .then(data => {
          this.props.navigation.navigate("VerifyLogin", {
            number,
            verificationHash: data.verificationHash
          });
        });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.subtitle}>
            Inserisci il tuo numero di cellulare
          </Text>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="it"
            onChangePhoneNumber={number => this.verifyNumber(number)}
            onSelectCountry={() => this.resetNumber()}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            disabled={!this.state.isCorrect}
            onPress={() => this.getVerificationCode()}
          >
            <Text style={styles.buttonText}>Continua</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>Se ti devi registrare</Text>
            <Text style={styles.description}>
              Ci vogliono pochi secondi ed è completamente gratis
            </Text>
          </View>
          <View>
            <Text style={styles.title}>Se sei già registrato</Text>
            <Text style={styles.description}>
              Per effettuare il login ti basterà inserire il codice che
              riceverai via SMS
            </Text>
          </View>
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
    justifyContent: "space-around"
  },
  logoContainer: {
    marginTop: 0
  },
  logo: {
    width: 250,
    height: 150
  },
  title: {
    fontFamily: vars.font.bold,
    color: vars.color.title,
    fontSize: vars.fontSize.title,
    textAlign: "center"
  },
  subtitle: {
    fontFamily: vars.font.regular,
    color: vars.color.subtitle,
    fontSize: vars.fontSize.subtitle,
    textAlign: "center"
  },
  description: {
    fontFamily: vars.font.regular,
    color: vars.color.description,
    fontSize: vars.fontSize.description,
    textAlign: "center"
  },
  textBlock: {
    marginBottom: 10
  },
  button: {
    marginTop: 13,
    padding: 12,
    backgroundColor: vars.color.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: vars.font.regular,
    fontSize: vars.fontSize.button
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
