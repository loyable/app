import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import { WATCH_USER } from "../../store/actions";

import vars from "../../config/styles";

import settings from "../../config/settings";

import Card from "../../components/ui/Card";

import SearchBar from "../../components/ui/SearchBar";

import TabNavigator from "../../config/routing/TabNavigator";

import Header from "../../components/ui/Header";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    WATCH_USER: () => {
      dispatch(WATCH_USER());
    }
  };
};

class CardsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
    props.WATCH_USER();
  }

  getCards(user) {
    return (
      <FlatList
        data={user.user.merchants}
        keyExtractor={item => item.merchantID}
        renderItem={({ item }) => (
          <Card settings={item} navigation={this.props.navigation} />
        )}
        onEndReached={() => this.setState({ isLoading: false })}
      />
    );
  }

  render() {
    const { user, filter, userFiltered } = this.props.user;

    return (
      <SafeAreaView style={styles.cardViewContainer}>
        <SearchBar
          page="cards"
          navigation={this.props.navigation}
          navigateTo="CardsGrid"
          activeArray={[true, false]}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {user.hasOwnProperty("user") && this.getCards(user)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardViewContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  container: {
    paddingTop: 12
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noCardsText: {
    fontFamily: vars.font.bold,
    fontSize: vars.fontSize.noCardsText,
    color: vars.color.noCardsText
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsListScreen);
