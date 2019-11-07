import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

// Import libraries
import { connect } from "react-redux";

// Import global variables
import vars from "../config/styles";
import Utils from "../config/utils";

// Map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class AccountScreen extends Component {
  render() {
    const { user } = this.props.user;

    if (user.hasOwnProperty("_id")) {
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>ID account</Text>
                <Text style={styles.text}>{user._id}</Text>
              </View>
            </View>
            <View style={styles.group}>
              <View>
                <Text style={styles.label}>Numero di telefono</Text>
                <Text style={styles.text}>{user.phone}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ChangeNumber", {
                      user
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
                  {Utils.parseDate(user.createdAt)}
                </Text>
              </View>
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
  }
});

export default connect(mapStateToProps)(AccountScreen);
