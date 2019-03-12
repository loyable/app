import React, { Component } from "react";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

import vars from "../../../config/styles";

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
          this.props.navigation.navigate(this.props.link);
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
    margin: 10
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
