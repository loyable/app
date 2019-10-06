import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

//Icon object
import Icon from "../../icons/Icon";

/*
  PROPS:
  - active: true or false,
  - icon: name of the icon (required)
  - align: "left" or "right"
  - onPress: function onPress (required)
*/

class SearchSwitchItem extends Component {
  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    align: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };
  static defaultProps = {
    active: false,
    align: "left"
  };

  render() {
    const { active, align, icon } = this.props;

    const color = {
      switchActiveBackground: "#0070f5",
      switchActiveIcon: "#fff",
      switchInactiveBackground: "#fff",
      switchInactiveIcon: "#9a9a9a"
    };
    const styles = StyleSheet.create({
      switchContainer: {
        backgroundColor:
          active === true
            ? color.switchActiveBackground
            : color.switchInactiveBackground,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderTopLeftRadius: align === "left" ? 5 : 0,
        borderBottomLeftRadius: align === "left" ? 5 : 0,
        borderTopRightRadius: align === "right" ? 5 : 0,
        borderBottomRightRadius: align === "right" ? 5 : 0
      }
    });

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.switchContainer}>
          <Icon
            name={icon}
            solid
            size={18}
            color={
              active === true
                ? color.switchActiveIcon
                : color.switchInactiveIcon
            }
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SearchSwitchItem;
