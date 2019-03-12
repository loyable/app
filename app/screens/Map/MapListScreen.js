import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";

import vars from "../../config/styles";

import SearchBar from "../../components/ui/SearchBar";

class MapListScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mapContainer}>
        <SearchBar
          page="map"
          navigation={this.props.navigation}
          navigateTo="MapView"
          activeArray={[false, true]}
        />

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.containerText}>Map - List View</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerText: {
    fontSize: vars.fontSize.title,
    fontFamily: vars.font.regular
  }
});

export default MapListScreen;
