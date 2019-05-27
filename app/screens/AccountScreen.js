import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import vars from "../config/styles";

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
class AccountScreen extends Component {
  parseDate(time) {
    const date = new Date(time);

    function addLeadingZero(num) {
      return ("0" + num).slice(-2);
    }

    const day = addLeadingZero(date.getDay());
    const month = addLeadingZero(date.getMonth() + 1);
    const year = addLeadingZero(date.getFullYear());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());

    const dateString = `${day}/${month}/${year} ${hours}:${minutes}`;

    return dateString;
  }

  render() {
    const user = this.props.user.user;

    if (user.hasOwnProperty("user")) {
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
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
                style={styles.changeNumberButton}
              >
                <Text style={styles.changeNumberButtonText}>Cambia</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <View>
              <Text style={styles.label}>Data registrazione</Text>
              <Text style={styles.text}>
                {this.parseDate(user.user.created)}
              </Text>
            </View>
          </View>
          {/* <View style={{ marginBottom: 10 }}>
      <Text style={styles.title}>Dati personali</Text>
      <Text style={styles.description}>
        Completa il tuo account con le tue informazioni personali per
        ricevere offerte e promozioni!
      </Text>
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value="Riccardo" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Cognome</Text>
      <TextInput value="Sacco" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Email</Text>
      <TextInput value="rickybag99@gmail.com" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Sesso</Text>
      <TextInput value="Maschio" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Data di nascita</Text>
      <TextInput value="10/03/1999" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Città</Text>
      <TextInput value="Milano" style={styles.text} />
    </View>
    <View style={styles.groupInput}>
      <Text style={styles.label}>Indirizzo</Text>
      <TextInput value="Via Gastone Da Foix 2" style={styles.text} />
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Salva</Text>
    </TouchableOpacity> */}
        </ScrollView>
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
    padding: 15
  },
  group: {
    flex: 1,
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
    backgroundColor: "#68ce00",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    fontFamily: vars.font.regular,
    fontSize: 21,
    color: "#fff"
  },
  changeNumberButton: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    backgroundColor: "#1681FF",
    borderRadius: 4
  },
  changeNumberButtonText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#fff"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
