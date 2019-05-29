import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
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
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.switchContainer}>
          <Icon
            name={this.props.icon}
            solid
            size={18}
            style={styles.switchIcon}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

SearchSwitchItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  align: PropTypes.string
};

export default SearchSwitchItem;
