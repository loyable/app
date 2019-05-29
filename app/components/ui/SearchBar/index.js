import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import SearchInput from "./SearchInput";
import SearchSwitchItem from "./SearchSwitchItem";

/*
  PROPS:
  - shadow: boolean
  - activeArray: array of 2 boolean values
  - search: if true display search
*/

class SearchBar extends Component {
  static defaultProps = {
    activeArray: [true, false],
    search: true
  };
  render() {
    const iconLeft = "bars";
    const iconRight = "table";

    const styles = StyleSheet.create(this.getStyles());

    return (
      <View style={styles.searchBarContainer}>
        {this.props.search && <SearchInput />}

        <View style={styles.switchContainer}>
          <SearchSwitchItem
            active={this.props.activeArray[0]}
            icon={iconLeft}
            align="left"
            onPress={this.props.onPress}
          />
          <SearchSwitchItem
            active={this.props.activeArray[1]}
            icon={iconRight}
            align="right"
            onPress={this.props.onPress}
          />
        </View>
      </View>
    );
  }
  getStyles() {
    return {
      searchBarContainer: {
        height: 60,
        shadowColor: this.props.shadow ? "#333" : "transparent",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        backgroundColor: "transparent",
        zIndex: 1,
        justifyContent: this.props.search ? "center" : "flex-end",
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
