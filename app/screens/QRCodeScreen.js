import React, { Component } from "react";
import vars from "../config/styles";

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Dimensions,
  Animated
} from "react-native";

import { connect } from "react-redux";

import QRCode from "react-native-qrcode";

import Utils from "../config/utils";

//SVG Library
import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class QRCodeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      opacity: new Animated.Value(0)
    };
  }

  share(referralCode) {
    Share.share({
      title: "Loyable",
      message: `Scarica Loyable! L'app che digitalizza le tessere fedeltà a bollini! Guadagna un bollino gratis inserendo dopo la registrazione il codice: ${referralCode} nella sezione "Il mio account"!`
    });
  }
  openModal() {
    this.setState({ modal: true });
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200
    }).start();
  }
  closeModal() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 500
    }).start();
    this.setState({ modal: false });
  }
  render() {
    const { id } = this.props.user.userID;
    const { user } = this.props.user;
    let referralCode = "";

    //Access user.user.details.referral.code
    if (Utils.getNestedObject(user, ["user", "details", "referral", "code"])) {
      referralCode = user.user.details.referral.code;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mostra il codice QR</Text>
        <View style={styles.qrcode}>
          <QRCode value={id} size={250} bgColor="black" fgColor="white" />
        </View>
        {referralCode !== "" && (
          <View style={styles.referralContainer}>
            <View style={styles.referralTitleContainer}>
              <Text style={styles.referralTitle}>Il tuo codice invito</Text>
              <TouchableOpacity onPress={() => this.openModal()}>
                <SVG
                  source={require("../assets/icons/question-circle-regular.svg")}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity
              onPress={() => this.share(referralCode)}
              activeOpacity={0.8}
            >
              <View style={styles.referralButton}>
                <Text style={styles.referralButtonText}>Condividi</Text>
                <SVG
                  source={require("../assets/icons/share-square-solid.svg")}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            this.closeModal();
          }}
        >
          <View
            style={[
              styles.modalOverlay,
              {
                display: this.state.modal ? "flex" : "none"
              }
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              display: this.state.modal ? "flex" : "none",
              opacity: this.state.opacity
            }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Porta un amico!</Text>
            <TouchableOpacity
              onPress={() => this.closeModal()}
              activeOpacity={0.8}
            >
              <SVG source={require("../assets/icons/times-solid.svg")} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
              Condividi il codice invito con i tuoi amici!
            </Text>
            <Text style={styles.modalText}>
              Otterrai un <Text style={styles.bold}>bollino omaggio</Text> nel
              primo esercente che avete in comune e loro riceveranno un bollino
              extra al loro primo acquisto!
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Ma non finisce qui!</Text>
            </Text>
            <Text style={styles.modalText}>
              Per ogni tessera completata dai tuoi amici nello stesso esercente
              ricevi sempre un bollino omaggio!
            </Text>
            <Text style={styles.modalText}>
              Cosa aspetti?! Invita più amici possibili!
            </Text>
          </View>
        </Animated.View>
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
  },
  referralContainer: {
    alignItems: "center"
  },
  referralTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  referralTitle: {
    fontFamily: vars.font.bold,
    fontSize: 26,
    color: vars.color.title,
    marginRight: 8
  },
  referralCode: {
    fontFamily: vars.font.regular,
    fontSize: 45,
    color: vars.color.subtitle,
    marginVertical: 10
  },
  referralButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: vars.color.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  referralButtonText: {
    fontFamily: vars.font.regular,
    fontSize: 25,
    color: "#fff",
    marginRight: 15
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    borderRadius: 10,
    width: width - 25,
    padding: 12
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalTitle: {
    fontFamily: vars.font.bold,
    fontSize: 26,
    color: vars.color.title
  },
  modalBody: {},
  modalText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: vars.font.description,
    marginTop: 10
  },
  bold: {
    fontFamily: vars.font.bold
  }
});

export default connect(mapStateToProps)(QRCodeScreen);
