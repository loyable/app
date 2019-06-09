import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback
} from "react-native";

import { connect } from "react-redux";

import Storage from "../../store/asyncstorage";

import { SET_USER_ID, REQUEST_USER, WATCH_USER } from "../../store/actions";

import vars from "../../config/styles";

import settings from "../../config/settings";

import Card from "../../components/ui/Card";

import CardGrid from "../../components/ui/Card/CardGridItem";

import SearchBar from "../../components/ui/SearchBar";

import { changeHeaderState } from "../../components/ui/Header";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_USER_ID: (id, callback) => {
      dispatch(SET_USER_ID(id));
      if (callback) callback(id);
    },
    REQUEST_USER: (id, callback) => {
      dispatch(REQUEST_USER(id, callback));
    },
    WATCH_USER: (id, callback) => {
      dispatch(WATCH_USER(id, callback));
    }
  };
};

class CardsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false,
      page: "list"
    };

    //Verifica il token utente in AsyncStorage
    Storage.getItem("userID").then(userID => {
      if (userID) {
        this.props.SET_USER_ID(userID, () => {
          this.props.REQUEST_USER(userID, () => {
            this.props.WATCH_USER(userID);
          });
        });
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.REQUEST_USER(this.props.user.userID, () => {
      this.setState({ refreshing: false });
    });
  };

  isOdd(num) {
    if (num % 2 !== 0 && num !== 0) return true;
    else return false;
  }

  getCards(user) {
    let lastItem;
    if (this.isOdd(user.user.merchants.length))
      lastItem = user.user.merchants.length - 1;

    let activeArray;

    switch (this.state.page) {
      case "list":
        activeArray = [true, false];
        break;
      case "grid":
        activeArray = [false, true];
        break;
      default:
        activeArray = [true, false];
    }

    return (
      <ScrollView
        contentContainerStyle={user.user.merchants.length === 0 && { flex: 1 }}
        contentOffset={{ x: 0, y: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <SearchBar
          activeArray={activeArray}
          onPress={() => {
            if (this.state.page === "list") {
              this.setState({ page: "grid" });
            } else {
              this.setState({ page: "list" });
            }
          }}
        />
        {user.user.merchants.length === 0 ? (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsText}>Nessuna tessera</Text>
          </View>
        ) : this.state.page === "list" ? (
          //List view
          <FlatList
            key={this.state.page}
            data={user.user.merchants}
            keyExtractor={item => item.merchantID}
            renderItem={({ item }) => (
              <Card settings={item} navigation={this.props.navigation} />
            )}
            onEndReached={() => this.setState({ isLoading: false })}
          />
        ) : (
          //Grid view
          <FlatList
            key={this.state.page}
            style={styles.cardsContainer}
            data={user.user.merchants}
            keyExtractor={item => item.merchantID}
            renderItem={({ item, index }) => (
              <CardGrid
                settings={item}
                navigation={this.props.navigation}
                isLastOddItem={index === lastItem}
              />
            )}
            numColumns={2}
            onEndReached={() => this.setState({ isLoading: false })}
          />
        )}
      </ScrollView>
    );
  }
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      //Metodo che cambia l'Header
      changeHeaderState({
        backArrow: false,
        navigation: this.props.navigation
      });
    });
  }

  render() {
    const { user, filter, userFiltered } = this.props.user;

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
