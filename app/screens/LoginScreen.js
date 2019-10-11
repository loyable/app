import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import { SET_USER_ID } from "../store/actions";

import vars from "../config/styles";

import settings from "../config/settings";

import PhoneInput from "../components/ui/PhoneInput";

import Storage from "../store/asyncstorage";

import SVG from "react-native-remote-svg";

const { width } = Dimensions.get("window");

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
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Phone number
      number: "",
      isCorrect: false,
      error: false,
      //Verification number
      verificationNumber: "",
      isComplete: false,
      verificationError: false,
      isLoading: false,
      expired: false
    };

    //verify if user is logged in
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

  // Step 1
  getVerificationCode() {
    const { number, isCorrect } = this.state;

    this.setState({ isLoading: true });

    if (isCorrect) {
      fetch(`${settings.url.api}/auth/${number}`)
        .then(res => res.json())
        .then(data => {
          if (data.success === true) {
            this.setState({ isLoading: false, error: false });
            this.scrollToStep(2);
            this.verifyInput.focus();
          } else if (data.expired === false) {
            this.setState({ isLoading: false, error: false });
            this.scrollToStep(2);
            this.verifyInput.focus();
          } else {
            this.setState({ error: true });
          }
        });
    }
  }

  // Check if verification number has 6 digits
  verifyVerificationNumber(verificationNumber) {
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

  // Step 2
  verifyHash() {
    const { number, verificationNumber } = this.state;

    this.setState({ isLoading: true });

    fetch(`${settings.url.api}/auth/${number}/verify/${verificationNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.id !== "") {
          Storage.setItem("userID", data)
            .then(() => {
              this.props.SET_USER_ID(data);
              this.props.navigation.navigate("Instructions");
            })
            .catch(err => console.log(err));
        } else if (data.id === "") {
          // Set error message & clear input
          this.setState({ verificationError: true, isLoading: false });
          this.verifyInput.clear();
          this.verifyInput.focus();
        } else if (data.expired) {
          // Back to phone input
          this.setState({ isLoading: false });
          this.verifyInput.clear();
          this.scrollToStep(1);
        }
      });
  }

  scrollToStep(step) {
    this.loginSteps.scrollTo({ x: width * (step - 1) });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <SVG
            style={styles.logo}
            source={require("../assets/icons/logo.svg")}
          />
        </View>
        <View style={{ height: 160 }}>
          <ScrollView
            ref={ref => {
              this.loginSteps = ref;
            }}
            horizontal={true}
            scrollEnabled={false}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.step}>
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
            <View style={styles.step}>
              {this.state.verificationError ? (
                <Text style={[styles.subtitle, { color: "red" }]}>
                  Codice errato! Riprova
                </Text>
              ) : (
                <Text style={styles.subtitle}>
                  Inserisci il codice di conferma
                </Text>
              )}

              <View style={styles.verifyInputContainer}>
                <TextInput
                  ref={ref => {
                    this.verifyInput = ref;
                  }}
                  style={styles.verifyInput}
                  keyboardType="phone-pad"
                  maxLength={6}
                  onChangeText={verificationNumber =>
                    this.verifyVerificationNumber(verificationNumber)
                  }
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
          </ScrollView>
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
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
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
  },
  step: {
    width,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  loading: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.1)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
