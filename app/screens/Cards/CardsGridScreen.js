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
      lastItem = user.user.merchants.length - 1;

    if (user.user.merchants.length === 0) {
      return (
        <View style={styles.noCardsContainer}>
          <Text style={styles.noCardsText}>Nessuna tessera</Text>
        </View>
      );
    }
    return (
      <ScrollView contentOffset={{ x: 0, y: 55 }}>
        <SearchBar
          page="cards"
          navigation={this.props.navigation}
          navigateTo="CardsList"
          activeArray={[false, true]}
        />
        <FlatList
          style={styles.cardsContainer}
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
      </ScrollView>
    );
  }

  render() {
    const { user, userFiltered } = this.props.user;

    return (
      <SafeAreaView style={styles.cardViewContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {user.hasOwnProperty("user") ? (
            this.getCards(userFiltered)
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
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
    flex: 1
  },
  cardsContainer: {
    paddingHorizontal: vars.cardGrid.padding
  },
  containerText: {
    fontSize: vars.fontSize.title,
    fontFamily: vars.font.regular
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
)(CardsGridScreen);
