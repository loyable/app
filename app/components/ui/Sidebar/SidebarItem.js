import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";

//Global variables
import vars from "../../../config/styles";

//Import AsyncStorage
import Storage from "../../../store/asyncstorage";

/* 
  PROPS:
  - name: Name of the list item (required)
  - navigation: The navigation object (required)
  - link: The name of the screen to navigate (required)
*/

class SidebarItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
  };

  render() {
    const { name, navigation, link } = this.props;

    return (
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => {
          switch (link) {
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
                        navigation.navigate("Login");
                      });
                    }
                  }
                ],
                { cancelable: false }
              );
              break;
            default:
              navigation.navigate(link);
              break;
          }
        }}
      >
        <Text style={styles.sidebarItem}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  },
  sidebarItem: {
    fontFamily: vars.font.regular,
    fontSize: vars.fontSize.sidebarItem,
    color: vars.color.sidebarItem
  }
});

export default SidebarItem;
