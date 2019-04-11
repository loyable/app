import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList
} from "react-native";

import { connect } from "react-redux";

import { store } from "../../store";

import vars from "../../config/styles";

import SearchBar from "../../components/ui/SearchBar";

import MapListItem from "../../components/ui/Map/MapListItem";

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
    const merchants = this.props.user.userFiltered.user.merchants;
    return (
      <SafeAreaView style={styles.mapContainer}>
        <SearchBar
          page="map"
          navigation={this.props.navigation}
          navigateTo="MapView"
          activeArray={[false, true]}
        />
        <ScrollView contentContainerStyle={styles.container}>
          {this.getMerchants(merchants)}
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
          <MapListItem settings={item} navigation={this.props.navigation} />
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapListScreen);
