import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import SearchInput from "./SearchInput";
import SearchSwitchItem from "./SearchSwitchItem";

/*
  PROPS:
  - page: cards or map
  - shadow: boolean
  - navigation: the navigation object
  - activeArray: array of 2 boolean values
  - navigateTo: screen name to navigate to
  - search: if true display search
*/

class SearchBar extends Component {
  static defaultProps = {
    activeArray: [true, false],
    search: true
  };
  render() {
    const iconLeft = this.props.page === "cards" ? "bars" : "map";
    const iconRight = this.props.page === "cards" ? "table" : "list-ul";

    const styles = StyleSheet.create(this.getStyles());

    return (
      <View style={styles.searchBarContainer}>
        {this.props.search && <SearchInput />}

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
