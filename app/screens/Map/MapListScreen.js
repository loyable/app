import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import { connect } from "react-redux";

import { store } from "../../store";

import vars from "../../config/styles";

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

class MapListScreen extends Component {
  render() {
    const cards = this.props.cards.cardsFiltered;
    return (
      <SafeAreaView style={styles.mapContainer}>
        <SearchBar
          page="map"
          navigation={this.props.navigation}
          navigateTo="MapView"
          activeArray={[false, true]}
        />

        <ScrollView contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate("DetailsMapList", {
                card: cards[0],
                navigateTo: "CardMapListDetails"
              })
            }
          >
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png"
                  }}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>MiNi Sushi</Text>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ipsam minus harum neque nobis velit distinctio enim aliquid
                  amet debitis ratione.
                </Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.distance}>3,7 km</Text>
                  <Text style={styles.info}>Info</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#F4F4F4"
  },
  container: {
    flex: 1,
    padding: 12
  },
  containerText: {
    fontSize: vars.fontSize.title,
    fontFamily: vars.font.regular
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderRadius: 8
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#343434",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  icon: {
    width: 80,
    height: 25
  },
  textContainer: {
    flex: 1,
    padding: 5
  },
  title: {
    fontFamily: vars.font.bold,
    color: vars.color.title,
    fontSize: 20
  },
  description: {
    color: vars.color.subtitle,
    fontFamily: vars.font.regular,
    fontSize: 14
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  distance: {
    color: vars.color.description,
    fontFamily: vars.font.regular,
    fontSize: 16
  },
  info: {
    color: "#0070F5",
    fontFamily: vars.font.bold,
    fontSize: 16
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapListScreen);
