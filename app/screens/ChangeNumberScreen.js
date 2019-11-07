import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from "react-native";

// Import libraries
import axios from "axios";

// Import global variables
import vars from "../config/styles";
import settings from "../config/settings";

// Import components
import PhoneInput from "../components/ui/PhoneInput";

// Import storage
import Storage from "../store/asyncstorage";

const { width } = Dimensions.get("window");

class ChangeNumberScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNumber: "",
      alreadyRegistered: false,
      isCorrect: false,
      verificationNumber: "",
      verificationError: false,
      isComplete: false,
      step1: false,
      step2: false,
      step3: false,
      isLoading: false
    };
  }

  scrollToStep(step) {
    this.steps.scrollTo({ x: width * (step - 1) });
  }

  //Step 1
  getVerificationCode(phone) {
    this.setState({ isLoading: true });

    fetch(`${settings.url.api}/auth/${phone}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ step1: true, isLoading: false });
          this.scrollToStep(2);
          this.verifyInput.focus();
        } else if (data.expired === false) {
          this.setState({ step1: true, isLoading: false });
          this.scrollToStep(2);
          this.verifyInput.focus();
        } else {
          this.setState({ step1: false, isLoading: false });
        }
      });
  }

  //Step 2
  verifyHash(phone) {
    this.setState({ isLoading: true });

    const { verificationNumber } = this.state;

    fetch(`${settings.url.api}/auth/${phone}/verify/${verificationNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.id !== "") {
          this.setState({
            step2: true,
            isLoading: false,
            verificationError: false
          });
          this.scrollToStep(3);
        } else {
          this.setState({ verificationError: true });
        }
      });
  }

  //Reset input field
  resetNumber() {
    this.setState({ newNumber: "", isCorrect: false });
  }

  //Check if phone number is correct
  verifyNumber(newNumber) {
    this.setState({ newNumber });
    if (this.phone.isValidNumber()) {
      this.setState({ isCorrect: true });
    } else {
      this.setState({ isCorrect: false });
    }
  }

  //Check if verification number is correct
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

  //Step 3
  changeNumber(phone) {
    this.setState({ isLoading: true });

    const { newNumber, verificationNumber } = this.state;

    fetch(
      `${settings.url.api}/auth/${phone}/change/${verificationNumber}/${newNumber}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            step3: true,
            isLoading: false,
            alreadyRegistered: false
          });
          Storage.removeItem("userID").then(() => {
            this.props.navigation.navigate("Login");
          });
        } else if (data.success === false) {
          this.setState({ alreadyRegistered: true });
        } else if (data.expired) {
          this.setState({
            step1: false,
            step2: false,
            step3: false,
            isLoading: false
          });
          this.scrollToStep(1);
        } else {
          this.setState({ error: true });
        }
      });
  }

  render() {
    const user = this.props.navigation.getParam("user");

    const styles = StyleSheet.create(this.getStyles());
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Cambia numero</Text>
          <Text style={styles.subtitle}>
            Per cambiare il numero di telefono associato al tuo account
            riceverai un SMS di conferma sul tuo attuale numero.
          </Text>
          <Text style={styles.subtitle}>
            Verrai disconnesso dal tuo account e dovrai nuovamente effettuare il
            login con il nuovo numero.
          </Text>
          <Text style={[styles.subtitle, styles.bold]}>
            Se non hai più accesso al tuo attuale numero di telefono contattaci
          </Text>
        </View>
        <ScrollView
          ref={ref => {
            this.steps = ref;
          }}
          horizontal={true}
          scrollEnabled={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* Step 1 */}
          <View style={styles.step}>
            <View>
              <Text style={styles.stepTitle}>Step 1</Text>
              <Text style={styles.stepSubtitle}>
                Il tuo attuale numero di telefono
              </Text>
            </View>

            <Text style={styles.phone}>{user.phone}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => this.getVerificationCode(user.phone)}
            >
              <Text style={styles.buttonText}>Invia SMS</Text>
            </TouchableOpacity>
          </View>
          {/* Step 2 */}
          <View style={styles.step}>
            <Text style={styles.stepTitle}>Step 2</Text>
            {this.state.verificationError ? (
              <Text style={[styles.stepSubtitle, { color: "red" }]}>
                Codice errato! Riprova
              </Text>
            ) : (
              <Text style={styles.stepSubtitle}>
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
              onPress={() => this.verifyHash(user.phone)}
            >
              <Text style={styles.buttonText}>Verifica</Text>
            </TouchableOpacity>
          </View>
          {/* Step 3 */}
          <View style={styles.step}>
            <Text style={styles.stepTitle}>Step 3</Text>
            {this.state.alreadyRegistered ? (
              <Text style={[styles.stepSubtitle, { color: "red" }]}>
                Numero già esistente, riprova!
              </Text>
            ) : (
              <Text style={styles.stepSubtitle}>
                Inserisci il tuo nuovo numero
              </Text>
            )}
            <View style={styles.verifyInputContainer}>
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                initialCountry="it"
                onChangePhoneNumber={newNumber => this.verifyNumber(newNumber)}
                onSelectCountry={() => this.resetNumber()}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              disabled={!this.state.isCorrect}
              onPress={() => this.changeNumber(user.phone)}
            >
              <Text style={styles.buttonText}>Termina</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Text style={styles.stepInfo}>
          N.B. Completando il processo verrai disconnesso dall’account e non
          potrai più accedere utilizzando il vecchio numero!
        </Text>
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    );
  }
  getStyles() {
    return {
      container: {
        padding: 12
      },
      bold: {
        fontFamily: vars.font.bold,
        color: vars.color.title
      },
      title: {
        fontFamily: vars.font.bold,
        fontSize: 30,
        color: vars.color.title
      },
      subtitle: {
        fontFamily: vars.font.regular,
        fontSize: 20,
        color: vars.color.subtitle,
        marginTop: 5
      },
      step: {
        width,
        height: 200,
        padding: 12,
        justifyContent: "space-between"
      },
      stepTitle: {
        fontFamily: vars.font.bold,
        fontSize: 30,
        color: vars.color.title
      },
      stepSubtitle: {
        fontFamily: vars.font.regular,
        fontSize: 20,
        color: vars.color.title
      },
      stepInfo: {
        fontFamily: vars.font.bold,
        fontSize: 18,
        color: vars.color.primary,
        marginVertical: 20,
        padding: 12
      },
      phone: {
        fontFamily: vars.font.regular,
        fontSize: 40,
        color: vars.color.title
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
        width: 150,
        marginTop: 10
      },
      verifyInputContainer: {
        alignItems: "center"
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
    };
  }
}

export default ChangeNumberScreen;
