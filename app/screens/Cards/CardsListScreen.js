import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";

import Storage from "../../store/asyncstorage";

import { SET_USER_ID, REQUEST_USER } from "../../store/actions";

import vars from "../../config/styles";

import settings from "../../config/settings";

import Card from "../../components/ui/Card";

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
    SET_USER_ID: (id, callback) => {
      dispatch(SET_USER_ID(id));
      if (callback) callback(id);
    },
    REQUEST_USER: (id, callback) => {
      dispatch(REQUEST_USER(id, callback));
    }
  };
};

class CardsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false
    };

    Storage.getItem("userID").then(userID => {
      if (userID) {
        this.props.SET_USER_ID(userID, id => {
          this.props.REQUEST_USER(id);
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

  getCards(user) {
    if (user.user.merchants.length === 0) {
      return (
        <View style={styles.noCardsContainer}>
          <Text style={styles.noCardsText}>Nessuna tessera</Text>
        </View>
      );
    }

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

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          contentContainerStyle={styles.container}
        >
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
