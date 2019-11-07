import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import PropTypes from "prop-types";

//Global variables
import vars from "../../../config/styles";
import text from "../../../config/text";

//Import Storage
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

  async logout() {
    // Remove from AsyncStorage
    await Storage.removeItem("userID");

    // Redirect to Login Screen
    this.props.navigation.navigate("Login");
  }

  render() {
    const { name, navigation, link } = this.props;

    return (
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => {
          switch (link) {
            case "Logout":
              Alert.alert(
                text.sidebar.logout.title,
                text.sidebar.logout.subtitle,
                [
                  {
                    text: text.sidebar.logout.cancel,
                    style: "cancel"
                  },
                  {
                    text: text.sidebar.logout.button,
                    onPress: () => this.logout()
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
