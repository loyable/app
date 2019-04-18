import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";

import { SET_USER_ID } from "../../store/actions";

import vars from "../../config/styles";

import settings from "../../config/settings";

import Storage from "../../store/asyncstorage";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_USER_ID: id => {
      dispatch(SET_USER_ID(id));
    }
  };
};
class VerifyLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.navigation.getParam("number"),
      verificationNumber: "",
      isComplete: false,
      verificationHash: this.props.navigation.getParam("verificationHash")
    };
  }

  verifyNumber(verificationNumber) {
    if (verificationNumber.toString().length === 6) {
      this.setState({
        verificationNumber,
        isComplete: true
      });
    } else {
      this.setState({
        verificationNumber,
        isComplete: false
      });
    }
  }

  verifyHash() {
    const { number, verificationNumber } = this.state;

    fetch(`${settings.url.api}/auth/${number}/verify/${verificationNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.id !== "") {
          Storage.setItem("userID", data.id)
            .then(() => {
              this.props.SET_USER_ID(data.id);
              this.props.navigation.navigate("CardsList");
            })
            .catch(err => console.log(err));
        }
      });
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
            Inserisci il codice ricevuto via SMS
          </Text>
          <View style={styles.verifyInputContainer}>
            <TextInput
              style={styles.verifyInput}
              keyboardType="phone-pad"
              maxLength={6}
              autoFocus={true}
              onChangeText={number => this.verifyNumber(number)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            disabled={!this.state.isComplete}
            onPress={() => this.verifyHash()}
          >
            <Text style={styles.buttonText}>Verifica numero</Text>
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
    backgroundColor: vars.color.secondary,
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
  },
  verifyInput: {
    fontFamily: vars.font.regular,
    fontSize: 36,
    height: 54,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#e5e5e5",
    padding: 5,
    color: "#525252",
    textAlign: "center",
    width: 150
  },
  verifyInputContainer: {
    alignItems: "center",
    marginTop: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyLoginScreen);
