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

import { WATCH_CARDS } from "../../store/actions";

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
    WATCH_CARDS: () => {
      dispatch(WATCH_CARDS());
    }
  };
};

class CardsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    props.WATCH_CARDS();
  }

  getCards(cards) {
    return (
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card settings={item} navigation={this.props.navigation} />
        )}
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
          navigateTo="CardsGrid"
          activeArray={[true, false]}
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
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  container: {
    padding: 12
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

const cardProto = {
  id: "", //card design id
  marked: 3,
  settings: {
    design: "horizontal",
    text: {
      title: {
        value: "MiNi Sushi", //required
        fontSize: 22,
        fontFamily: "custom",
        color: "custom",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 22, //default == fontSize
        letterSpacing: 0
      },
      address: {
        value: "Via Emilio Morosini, 5, 20135 Milano MI", //required
        fontSize: 16,
        fontFamily: "custom",
        color: "custom",
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 16, //default == fontSize
        letterSpacing: 0
      }
    },
    style: {
      height: 200, //default == 200
      backgroundColor: "#000", //default == #000
      borderRadius: 10, //default == 10
      marginBottom: 5, //default == 5
      shadow: {
        color: "#333",
        offset: {
          width: 3,
          height: 0
        },
        opacity: 0.1,
        radius: 4
      },
      borderWidth: 0, //default == 0
      borderColor: "", //default == undefined,
      elevation: 1 //default == 1
    },
    marks: {
      total: 10, //required, default == 10
      marked: 3, //required, default == 0
      rows: 2, //required, default == 2
      rowSpacing: 10, //default 20
      style: {
        shape: {
          //required
          type: "round", //required
          value: 12 //default
        },
        width: 50, //required
        height: 50, //required
        backgroundColor: "#fff", //default = #fff
        padding: 1,
        justifyContent: "space-evenly", //default space-evenly
        padding: 1, //default == 1
        borderWidth: 0,
        borderColor: ""
      },
      mark: {
        image: {
          src:
            "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png",
          width: 38,
          height: 11
        },
        style: {
          shape: {
            //required
            type: "circle",
            value: ""
          },
          backgroundColor: "#000", //default = #000
          borderWidth: 0,
          borderColor: ""
        }
      }
    }
  },
  header: {
    logo: {
      src: "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png",
      width: 112,
      height: 35,
      position: "left",
      verticalPosition: "top",
      marginRight: 0,
      marginBottom: 0
    },
    text1: {
      value: "Tessera Pranzo", //required
      fontSize: 20,
      fontFamily: "custom",
      color: "custom", //default #fff
      textAlign: "left",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: 22, //default == fontSize
      letterSpacing: 0
    },
    text2: {
      value: "Descrizione", //required
      fontSize: 16,
      fontFamily: "custom",
      color: "custom", //default #fff
      textAlign: "left",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: 16, //default == fontSize
      letterSpacing: 0
    }
  },
  footer: {
    value: "Via Emilio Morosini, 5, 20135 Milano MI", //required
    fontSize: 14,
    fontFamily: "custom",
    color: "custom",
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 14, //default == fontSize
    letterSpacing: 0
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsListScreen);
