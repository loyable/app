import React, { Component } from "react";

import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";

// Import libraries
import { connect } from "react-redux";

// Import global variables
import vars from "../../config/styles";
import Utils from "../../config/utils";

// Import components
import Card from "../../components/ui/Card";
import CardGridItem from "../../components/ui/Card/CardGridItem";
import SearchBar from "../../components/ui/SearchBar";

// Import Storage
import Storage from "../../store/asyncstorage";

// Import redux actions
import { SET_USER_ID, REQUEST_USER } from "../../store/actions";

// Import methods
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
    SET_USER_ID: id => {
      dispatch(SET_USER_ID(id));
    },
    REQUEST_USER: id => {
      dispatch(REQUEST_USER(id));
    }
  };
};

class CardsListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
      page: "list"
    };
  }

  componentDidMount() {
    // Change Header
    this.changeHeader();

    // Load user
    this.loadUser();
  }

  render() {
    const { user, filter, userFiltered } = this.props.user;

    return (
      <SafeAreaView style={styles.cardViewContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          {user.hasOwnProperty("_id") ? (
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

  // Load userID from Storage & REQUEST_USER from API
  async loadUser() {
    try {
      const userID = await Storage.getItem("userID");

      if (userID !== null) {
        this.props.SET_USER_ID(userID);

        this.props.REQUEST_USER(userID);

        this.setState({ isLoading: false });
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Reload user from API
  onRefresh = () => {
    this.setState({ isRefreshing: true });

    this.props.REQUEST_USER(this.props.user.userID);

    this.setState({ isRefreshing: false });
  };

  // Change Header State
  changeHeader() {
    this.props.navigation.addListener("didFocus", () => {
      changeHeaderState({
        backArrow: false,
        navigation: this.props.navigation
      });
    });
  }

  getCards(user) {
    let lastItem;
    if (Utils.isOdd(user.merchants.length))
      lastItem = user.merchants.length - 1;

    let activeTab = [true, false];

    switch (this.state.page) {
      case "list":
        activeTab = [true, false];
        break;
      case "grid":
        activeTab = [false, true];
        break;
    }

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        contentOffset={{ x: 0, y: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <SearchBar
          activeArray={activeTab}
          onPress={() => {
            switch (this.state.page) {
              case "list":
                this.setState({ page: "grid" });
                break;
              case "grid":
                this.setState({ page: "list" });
                break;
            }
          }}
        />
        {user.merchants.length === 0 ? (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsText}>Nessuna tessera</Text>
          </View>
        ) : this.state.page === "list" ? (
          <FlatList
            key={this.state.page}
            data={user.merchants}
            keyExtractor={item => item.merchant.id}
            renderItem={({ item }) => (
              <Card settings={item} navigation={this.props.navigation} />
            )}
            onEndReached={() => this.setState({ isLoading: false })}
          />
        ) : (
          <FlatList
            key={this.state.page}
            style={styles.cardsContainer}
            data={user.merchants}
            keyExtractor={item => item.merchant.id}
            renderItem={({ item, index }) => (
              <CardGridItem
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
    fontSize: 24,
    color: "#696969"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsListScreen);
