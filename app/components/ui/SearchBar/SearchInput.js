import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";

//Redux actions
import { SET_FILTER, FILTER_MERCHANTS } from "../../../store/actions";

//Icon object
import Icon from "../../icons/Icon";

//Global variables
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
    const { user } = this.props;

    return (
      <View style={styles.inputContainer}>
        <Icon name="search" size={18} color="#7b7b7b" style={{ padding: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Cerca"
          placeholderTextColor="#7b7b7b"
          autoCorrect={false}
          value={user.filter}
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
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    paddingVertical: 7,
    flex: 1,
    fontSize: 18,
    fontFamily: vars.font.regular,
    color: "#7b7b7b"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
