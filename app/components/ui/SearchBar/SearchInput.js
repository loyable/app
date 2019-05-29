import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { connect } from "react-redux";

import { SET_FILTER, FILTER_MERCHANTS } from "../../../store/actions";

import Icon from "react-native-vector-icons/FontAwesome5";

import vars from "../../../config/styles";

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SET_FILTER: text => {
      dispatch(SET_FILTER(text));
    },
    FILTER_MERCHANTS: () => {
      dispatch(FILTER_MERCHANTS());
    }
  };
};

class SearchInput extends Component {
  //Call redux action to filter user merchants
  onChangeText(text) {
    this.props.SET_FILTER(text);
    this.props.FILTER_MERCHANTS();
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <Icon name="search" size={18} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Cerca"
          placeholderTextColor={vars.color.searchInputText}
          autoCorrect={false}
          value={this.props.user.filter}
          onChangeText={text => this.onChangeText(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 36,
    backgroundColor: vars.color.searchInputBackground,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    paddingVertical: 7,
    flex: 1,
    fontSize: vars.fontSize.searchInput,
    fontFamily: vars.font.regular,
    color: vars.color.searchInputText
  },
  icon: { color: vars.color.searchInputText, padding: 8 }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
