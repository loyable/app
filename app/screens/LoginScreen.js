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

// Import libraries
import axios from "axios";
import { connect } from "react-redux";
import SVG from "react-native-remote-svg";

// Import components
import PhoneInput from "../components/ui/PhoneInput";

// Import Storage
import Storage from "../store/asyncstorage";

// Import global variables
import vars from "../config/styles";
import settings from "../config/settings";
import text from "../config/text";

// Import redux actions
import { SET_USER_ID } from "../store/actions/UserActions";

// Set screen width constant
const { width } = Dimensions.get("window");

// Map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

// Map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_USER_ID: userID => {
      dispatch(SET_USER_ID(userID));
    }
  };
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Phone number
      phone: "",
      isValidPhone: false,
      phoneError: "",
      // SMS Code
      code: "",
      isValidCode: false,
      verificationError: "",
      // Globals
      isLoading: false
    };
  }
  componentDidMount() {
    // If user is logged in redirect
    this.isLoggedUser();
  }

  async isLoggedUser() {
    try {
      // Verify if user is logged in
      const token = await Storage.getItem("userID");

      // If logged redirect
      if (token) {
        this.props.navigation.navigate("DrawerNavigator");
      }
    } catch (err) {
      console.log(err);
    }
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
        {/* Step Horizontal ScrollView Container */}
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
            {/* Step 1: send SMS code */}
            <View style={styles.step}>
              {this.state.phoneError !== "" ? (
                <Text style={[styles.subtitle, { color: "red" }]}>
                  {this.state.phoneError}
                </Text>
              ) : (
                <Text style={styles.subtitle}>{text.login.step1.text}</Text>
              )}
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                initialCountry="it"
                onChangePhoneNumber={phone => this.verifyPhone(phone)}
                onSelectCountry={() => this.resetNumber()}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                disabled={!this.state.isValidPhone}
                onPress={() => this.sendSMSCode()}
              >
                <Text style={styles.buttonText}>{text.login.step1.button}</Text>
              </TouchableOpacity>
            </View>
            {/* Step 2: verify SMS code */}
            <View style={styles.step}>
              {this.state.verificationError !== "" ? (
                <Text style={[styles.subtitle, { color: "red" }]}>
                  {this.state.verificationError}
                </Text>
              ) : (
                <Text style={styles.subtitle}>{text.login.step2.text}</Text>
              )}
              {/* SMS Code input */}
              <View style={styles.verifyInputContainer}>
                <TextInput
                  ref={ref => {
                    this.smsCode = ref;
                  }}
                  style={styles.verifyInput}
                  keyboardType="phone-pad"
                  maxLength={6}
                  onChangeText={code => this.verifyCode(code)}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                disabled={!this.state.isValidCode}
                onPress={() => this.verifySMSCode()}
              >
                <Text style={styles.buttonText}>{text.login.step2.button}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* Footer Text */}
        <View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{text.login.footer[0].title}</Text>
            <Text style={styles.description}>
              {text.login.footer[0].description}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>{text.login.footer[1].title}</Text>
            <Text style={styles.description}>
              {text.login.footer[1].description}
            </Text>
          </View>
        </View>
        {/* Display loader */}
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </SafeAreaView>
    );
  }

  // Verify if phone number is valid
  verifyPhone(phone) {
    this.setState({ phone });
    if (this.phone.isValidNumber()) {
      this.setState({ isValidPhone: true });
    } else {
      this.setState({ isValidPhone: false });
    }
  }

  // Verify if smsCode has 6 digits
  verifyCode(code) {
    if (code.toString().length === 6) {
      this.setState({
        code,
        isValidCode: true
      });
    } else {
      this.setState({
        code,
        isValidCode: false
      });
    }
  }

  // Clear Phone Input component
  clearPhoneInput() {
    this.setState({ phone: "", isValidPhone: false });
  }

  // Step 1: send SMS Code
  async sendSMSCode() {
    const { phone } = this.state;

    // Display loader
    this.setState({ isLoading: true });

    try {
      await axios.post(`${settings.url.api}/auth/register`, {
        phone
      });

      // Remove loader & eventual error
      this.setState({ isLoading: false, phoneError: "" });

      // Go to step 2
      this.scrollToStep(2);

      // Focus on smsCode input
      this.smsCode.focus();
    } catch (err) {
      const error = err.response.data.error;

      if (error.includes("not expired")) {
        // Remove loader
        this.setState({ isLoading: false });

        // Go to step 2
        this.scrollToStep(2);

        // Focus on smsCode input
        this.smsCode.focus();
      }
      console.log(error);
    }
  }

  // Step 2: verify SMS Code
  async verifySMSCode() {
    const { phone, code } = this.state;

    // Display loader
    this.setState({ isLoading: true, verificationError: "" });

    try {
      // POST request to verify the SMS Code
      const res = await axios.post(`${settings.url.api}/auth/login`, {
        phone,
        smsCode: code
      });

      // Set key "token" in AsyncStorage
      await Storage.setItem("userID", res.data.data);

      // Set USER ID in Redux State
      this.props.SET_USER_ID(res.data.data);

      // Remove loader
      this.setState({ isLoading: false });

      // Navigate to Instructions Screen
      this.props.navigation.navigate("Instructions");
    } catch (err) {
      const error = err.response.data.error;

      // Remove loader
      this.setState({ isLoading: false });

      // Clear SMS Code input
      this.smsCode.clear();

      if (error.includes("expired")) {
        // Set error
        this.setState({
          phoneError: text.login.step1.error
        });

        // Return to step 1
        this.scrollToStep(1);
      } else if (error.includes("invalid")) {
        // Set error
        this.setState({ verificationError: text.login.step2.error });

        // Focus on SMS Code input
        this.smsCode.focus();
      } else {
        // Return to step 1
        this.scrollToStep(1);
      }
      console.log(error);
    }
  }

  // Scroll to Login Step 1, 2, 3
  scrollToStep(step) {
    this.loginSteps.scrollTo({ x: width * (step - 1) });
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
