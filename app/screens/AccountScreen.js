import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

import axios from "axios";

import { connect } from "react-redux";

import vars from "../config/styles";

import settings from "../config/settings";

import Utils from "../config/utils";

import SVG from "react-native-remote-svg";

const { width } = Dimensions.get("window");

import { REQUEST_USER } from "../store/actions/UserActions";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    REQUEST_USER: (id, callback) => {
      dispatch(REQUEST_USER(id, callback));
    }
  };
};
class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      opacity: new Animated.Value(0),
      referral: "",
      isComplete: false
    };
  }

  //Check if verification number is correct
  verifyReferralCode(referral) {
    if (referral.toString().length === 6) {
      this.setState({
        referral,
        isComplete: true
      });
    } else {
      this.setState({
        referral,
        isComplete: false
      });
    }
  }

  verifyReferral() {
    if (this.state.isComplete) {
      const { id, token } = this.props.user.userID;

      axios
        .patch(
          `${settings.url.api}/users/${id}/referee`,
          {
            referee: this.state.referral
          },
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(() => {
          this.setState({ modal: false, isComplete: false });
          this.referralInput.clear();
          this.props.REQUEST_USER(this.props.user.userID);
        });
    }
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
    const user = this.props.user.user;

    let referee = Utils.getNestedObject(user, [
      "user",
      "details",
      "referral",
      "referee"
    ]);

    if (user.hasOwnProperty("user")) {
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>ID account</Text>
                <Text style={styles.text}>{user.user.id}</Text>
              </View>
            </View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>Numero di telefono</Text>
                <Text style={styles.text}>{user.user.phone}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ChangeNumber", {
                      user: user.user
                    });
                  }}
                  activeOpacity={0.8}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>Cambia</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>Data registrazione</Text>
                <Text style={styles.text}>
                  {Utils.parseDate(user.user.created)}
                </Text>
              </View>
            </View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>Codice invito</Text>
                <Text style={styles.text}>
                  {referee ? referee : "Non presente"}
                </Text>
              </View>
              {!referee && (
                <View>
                  <TouchableOpacity
                    onPress={() => this.openModal()}
                    activeOpacity={0.8}
                    style={[styles.actionButton, styles.bgSecondary]}
                  >
                    <Text style={styles.actionButtonText}>Inserisci</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {/* <View>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Elimina account</Text>
            </TouchableOpacity>
          </View> */}
          {/* Modal overlay */}
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
            >
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
                  <Text style={styles.modalTitle}>
                    Inserisci il codice invito
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.closeModal()}
                    activeOpacity={0.8}
                  >
                    <SVG source={require("../assets/icons/times-solid.svg")} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <Text style={styles.modalText}>
                    Grazie al codice invito otterrai un bollino omaggio nel
                    primo esercente che hai in comune con il tuo amico!
                  </Text>
                  <Text style={[styles.modalText, styles.bold, styles.red]}>
                    Una volta inserito il codice non sarà più possibile
                    modificarlo!
                  </Text>
                  <View style={styles.referralInputContainer}>
                    <TextInput
                      ref={ref => {
                        this.referralInput = ref;
                      }}
                      style={styles.referralInput}
                      maxLength={6}
                      autoCapitalize="characters"
                      onChangeText={referral =>
                        this.verifyReferralCode(referral)
                      }
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.verifyReferral()}
                    activeOpacity={0.8}
                    style={[styles.button, styles.bgSecondary]}
                  >
                    <Text style={styles.buttonText}>Inserisci codice</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: "space-between"
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#c4c4c4"
  },
  groupInput: {
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#c4c4c4"
  },
  label: {
    fontFamily: vars.font.bold,
    fontSize: 22,
    color: vars.color.title,
    marginBottom: 7
  },
  text: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: vars.color.description
  },

  title: {
    fontFamily: vars.font.bold,
    fontSize: 30,
    color: vars.color.title
  },
  description: {
    fontFamily: vars.font.regular,
    fontSize: 14,
    color: vars.color.description
  },
  button: {
    paddingVertical: 7,
    backgroundColor: vars.color.primary,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    fontFamily: vars.font.regular,
    fontSize: 21,
    color: "#fff"
  },
  actionButton: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    backgroundColor: "#1681FF",
    borderRadius: 4
  },
  actionButtonText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#fff"
  },
  bgSecondary: {
    backgroundColor: vars.color.secondary
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center"
  },
  referralInputContainer: {
    flex: 1,
    alignItems: "center"
  },
  referralInput: {
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
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },
  modalContainer: {
    position: "absolute",
    top: 15,
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
  },
  red: {
    color: "red"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
