import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { connect } from "react-redux";

import { SET_FILTER, FILTER_CARDS } from "../../../store/actions";

import Icon from "react-native-vector-icons/FontAwesome5";

import vars from "../../../config/styles";

const mapStateToProps = state => {
  return {
    filter: state.cards.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SET_FILTER: text => {
      dispatch(SET_FILTER(text));
    },
    FILTER_CARDS: () => {
      dispatch(FILTER_CARDS());
    }
  };
};

class SearchInput extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  onChangeText(text) {
    this.props.SET_FILTER(text);
    this.props.FILTER_CARDS();
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <Icon name="search" size={18} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Cerca"
          placeholderTextColor={vars.color.searchInputText}
          value={this.props.filter}
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
