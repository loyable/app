import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import { store } from "../../store";

import vars from "../../config/styles";

import SearchBar from "../../components/ui/SearchBar";

import MapListItem from "../../components/ui/Map/MapListItem";

import MapViewScreen from "./MapViewScreen";

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
    const { userFiltered } = this.props.user;
    user = userFiltered;
    if (user) {
      const merchants = user.merchants;
    }
    return (
      <SafeAreaView style={styles.mapContainer}>
        <SearchBar
          page="map"
          navigation={this.props.navigation}
          navigateTo="MapView"
          activeArray={[false, true]}
        />
        <ScrollView contentContainerStyle={styles.container}>
          {user.hasOwnProperty("user") ? (
            this.getMerchants(merchants)
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  getMerchants(merchants) {
    return (
      <FlatList
        data={merchants}
        keyExtractor={item => item.merchantID}
        renderItem={({ item }) => (
          <MapListItem
            settings={item}
            navigation={this.props.navigation}
            distance={MapViewScreen.distanceBetweenTwoCoords(
              item.merchant.address.location.coordinates[0],
              item.merchant.address.location.coordinates[1],
              this.props.maps.userLocation.latitude,
              this.props.maps.userLocation.longitude
            )}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#F4F4F4"
  },
  container: {
    flex: 1
  },
  containerText: {
    fontSize: vars.fontSize.title,
    fontFamily: vars.font.regular
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapListScreen);
