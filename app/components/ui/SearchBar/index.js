import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import SearchInput from "./SearchInput";
import SearchSwitchItem from "./SearchSwitchItem";

/*
  PROPS:
  - shadow: boolean (default: false)
  - activeArray: array of 2 boolean values (default: [true, false])
  - onPress: function onPress (required)
*/

class SearchBar extends Component {
  static propTypes = {
    activeArray: PropTypes.array,
    shadow: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeArray: [true, false],
    shadow: false
  };
  render() {
    const { onPress, activeArray } = this.props;

    const styles = StyleSheet.create(this.getStyles());

    return (
      <View style={styles.searchBarContainer}>
        <SearchInput />
        <View style={styles.switchContainer}>
          <SearchSwitchItem
            active={activeArray[0]}
            icon="bars"
            align="left"
            onPress={onPress}
          />
          <SearchSwitchItem
            active={activeArray[1]}
            icon="table"
            align="right"
            onPress={onPress}
          />
        </View>
      </View>
    );
  }
  getStyles() {
    const { shadow } = this.props;
    return {
      searchBarContainer: {
        height: 60,
        shadowColor: shadow ? "#333" : "transparent",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        backgroundColor: "transparent",
        zIndex: 1,
        justifyContent: "center",
        flexDirection: "row",
        padding: 12
      },
      switchContainer: {
        paddingLeft: 12,
        flexDirection: "row"
      }
    };
  }
}

export default SearchBar;
