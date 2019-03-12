import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import SearchInput from "./SearchInput";
import SearchSwitchItem from "./SearchSwitchItem";

/*
  PROPS:
  - page: cards or map
  - navigation: the navigation object
  - activeArray: array of 2 boolean values
  - navigateTo: screen name to navigate to
*/

class SearchBar extends Component {
  static defaultProps = {
    activeArray: [true, false]
  };
  render() {
    const iconLeft = this.props.page === "cards" ? "bars" : "map";
    const iconRight = this.props.page === "cards" ? "table" : "list-ul";

    return (
      <View style={styles.searchBarContainer}>
        <SearchInput />
        <View style={styles.switchContainer}>
          <SearchSwitchItem
            active={this.props.activeArray[0]}
            icon={iconLeft}
            align="left"
            navigation={this.props.navigation}
            navigateTo={this.props.navigateTo}
          />
          <SearchSwitchItem
            active={this.props.activeArray[1]}
            icon={iconRight}
            align="right"
            navigation={this.props.navigation}
            navigateTo={this.props.navigateTo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 60,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: "#fff",
    zIndex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 12
  },
  switchContainer: {
    paddingLeft: 12,
    flexDirection: "row"
  }
});

export default SearchBar;
