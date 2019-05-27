import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions
} from "react-native";

import vars from "../config/styles";

import settings from "../config/settings";

import PhoneInput from "../components/react-native-phone-input";

const { width, height } = Dimensions.get("window");

class ChangeNumberScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNumber: "",
      isCorrect: false,
      verificationNumber: "",
      isComplete: false,
      step1: false,
      step2: false,
      step3: false
    };
  }

  scrollToStep(step) {
    this.steps.scrollTo({ x: width * (step - 1) });
  }

  //Step 1
  getVerificationCode(phone) {
    fetch(`${settings.url.api}/auth/${phone}`)
      .then(res => res.json())
      .then(data => {
        if (data.verificationHash) {
          this.setState({ step1: true });
        }
      });
    this.scrollToStep(2);
  }

  //Step 2
  verifyHash(phone) {
    const { verificationNumber } = this.state;
    fetch(`${settings.url.api}/auth/${phone}/verify/${verificationNumber}`)
      .then(res => res.json())
      .then(data => {
        if (data.id !== "") {
          this.setState({ step2: true });
          this.scrollToStep(3);
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
    const { newNumber, verificationNumber } = this.state;

    fetch(
      `${
        settings.url.api
      }/auth/${phone}/change/${verificationNumber}/new/${newNumber}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.id !== "") {
          this.setState({ step3: true });
          this.scrollToStep(1);
        }
      });
  }

  render() {
    const user = this.props.navigation.getParam("user");

    const styles = StyleSheet.create(this.getStyles());
    return (
      <View style={styles.container}>
        <View style={{ padding: 12 }}>
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
            N.B. Se non hai più accesso al tuo attuale numero di telefono
            contattaci
          </Text>
        </View>
        <ScrollView
          ref={ref => {
            this.steps = ref;
          }}
          style={{ flex: 1 }}
          horizontal={true}
          scrollEnabled={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* Step 1 */}
          <View style={styles.step}>
            <Text style={styles.stepTitle}>Step 1</Text>
            <Text style={styles.stepSubtitle}>
              Il tuo attuale numero di telefono
            </Text>
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
            <Text style={styles.stepSubtitle}>
              Inserisci il codice di conferma
            </Text>
            <View style={styles.verifyInputContainer}>
              <TextInput
                style={styles.verifyInput}
                keyboardType="phone-pad"
                maxLength={6}
                autoFocus={true}
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
            <Text style={styles.stepSubtitle}>
              Inserisci il tuo nuovo numero
            </Text>
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
            <Text style={styles.stepInfo}>
              N.B. Completando il processo verrai disconnesso dall’account e non
              potrai più accedere utilizzando il vecchio numero!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  getStyles() {
    return {
      container: {
        flex: 1,
        justifyContent: "space-around"
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
        padding: 12
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
        fontSize: 15,
        color: vars.color.primary,
        marginVertical: 20
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
        width: 150
      },
      verifyInputContainer: {
        alignItems: "center",
        marginTop: 10
      }
    };
  }
}

export default ChangeNumberScreen;
