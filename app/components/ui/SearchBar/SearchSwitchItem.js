import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import vars from "../../../config/styles";

import Icon from "react-native-vector-icons/FontAwesome5";

/*
  PROPS:
  - active: true or false,
  - icon: name of the icon
  - align: left or right
*/

class SearchSwitchItem extends Component {
  render() {
    const styles = StyleSheet.create({
      switchContainer: {
        backgroundColor:
          this.props.active === true
            ? vars.color.switchActiveBackground
            : vars.color.switchInactiveBackground,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderTopLeftRadius: this.props.align === "left" ? 5 : 0,
        borderBottomLeftRadius: this.props.align === "left" ? 5 : 0,
        borderTopRightRadius: this.props.align === "right" ? 5 : 0,
        borderBottomRightRadius: this.props.align === "right" ? 5 : 0
      },
      switchIcon: {
        color:
          this.props.active === true
            ? vars.color.switchActiveIcon
            : vars.color.switchInactiveIcon
      }
    });

    return (
      <TouchableOpacity
        style={styles.switchContainer}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate(this.props.navigateTo)}
      >
        <Icon
          name={this.props.icon}
          solid
          size={18}
          style={styles.switchIcon}
        />
      </TouchableOpacity>
    );
  }
}

SearchSwitchItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  align: PropTypes.string
};

export default SearchSwitchItem;
