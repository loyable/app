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

import { WATCH_CARDS } from "../../store/actions";

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
  return {
    WATCH_CARDS: () => {
      dispatch(WATCH_CARDS());
    }
  };
};

class CardsGridScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    props.WATCH_CARDS();
  }

  isOdd(num) {
    if (num % 2 !== 0 && num !== 0) return true;
    else return false;
  }

  getCards(cards) {
    let lastItem;
    if (this.isOdd(cards.length)) lastItem = cards.length - 1;

    return (
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
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
    const { cards, cardsFiltered, filter } = this.props.cards;

    return (
      <SafeAreaView style={styles.cardViewContainer}>
        <SearchBar
          page="cards"
          navigation={this.props.navigation}
          navigateTo="CardsList"
          activeArray={[false, true]}
        />
        {cards.length === 0 ||
        (filter.length !== 0 && cardsFiltered.length === 0) ? (
          this.state.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={vars.color.activityIndicator}
              />
            </View>
          ) : (
            <View style={styles.noCardsContainer}>
              <Text style={styles.noCardsText}>
                {settings.locale.it.noCardsText}
              </Text>
            </View>
          )
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            {filter.length === 0
              ? cards.length !== 0 && this.getCards(cards)
              : cardsFiltered.length !== 0 && this.getCards(cardsFiltered)}
          </ScrollView>
        )}
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
