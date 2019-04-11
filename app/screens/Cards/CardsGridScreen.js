import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";

import { connect } from "react-redux";

import vars from "../../config/styles";

import settings from "../../config/settings";

import Card from "../../components/ui/Card/CardGridItem";

import SearchBar from "../../components/ui/SearchBar";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {};
};

class CardsGridScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  isOdd(num) {
    if (num % 2 !== 0 && num !== 0) return true;
    else return false;
  }

  getCards(user) {
    let lastItem;
    if (this.isOdd(user.user.merchants.length))
      lastItem = user.user.merchants - 1;

    return (
      <FlatList
        data={user.user.merchants}
        keyExtractor={item => item.merchantID}
        renderItem={({ item, index }) => (
          <Card
            settings={item}
            navigation={this.props.navigation}
            navigateTo="DetailsGrid"
            isLastOddItem={index === lastItem}
          />
        )}
        numColumns={2}
        onEndReached={() => this.setState({ isLoading: false })}
      />
    );
  }

  render() {
    const { user, userFiltered } = this.props.user;

    return (
      <SafeAreaView style={styles.cardViewContainer}>
        <SearchBar
          page="cards"
          navigation={this.props.navigation}
          navigateTo="CardsList"
          activeArray={[false, true]}
        />
        <ScrollView contentContainerStyle={styles.container}>
          {user.hasOwnProperty("user") && this.getCards(userFiltered)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardViewContainer: {
    flex: 1
  },
  container: {
    padding: vars.cardGrid.padding
  },
  containerText: {
    fontSize: vars.fontSize.title,
    fontFamily: vars.font.regular
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
)(CardsGridScreen);
