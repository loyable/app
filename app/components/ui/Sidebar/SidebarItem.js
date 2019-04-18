import React, { Component } from "react";

import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import PropTypes from "prop-types";

import vars from "../../../config/styles";

import Storage from "../../../store/asyncstorage";

/* 
  PROPS:
  - name: Name of the list item
  - navigation: The navigation object
  - link: The name of the screen to navigate
*/

class SidebarItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => {
          switch (this.props.link) {
            case "Logout":
              Alert.alert(
                "Sei sicuro di voler fare il logout?",
                "Dovrai rieffettuare la verifica SMS",
                [
                  {
                    text: "Annulla",
                    style: "cancel"
                  },
                  {
                    text: "Logout",
                    onPress: () => {
                      Storage.removeItem("userID").then(() => {
                        this.props.navigation.navigate("Login");
                      });
                    }
                  }
                ],
                { cancelable: false }
              );
              break;
            default:
              this.props.navigation.navigate(this.props.link);
              break;
          }
        }}
      >
        <Text style={styles.sidebarItem}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 15
  },
  sidebarItem: {
    fontFamily: vars.font.regular,
    fontSize: vars.fontSize.sidebarItem,
    color: vars.color.sidebarItem
  }
});

SidebarItem.propTypes = {
  name: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
};

export default SidebarItem;
