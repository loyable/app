import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, FlatList } from "react-native";

import MapView from "react-native-maps";

import openMap from "react-native-open-maps";

import Card from "../../components/ui/Card";

import BackIcon from "../../components/icons/BackIcon";

import Marker from "../../components/ui/Map/Marker";

//global vars
import vars from "../../config/styles";

import CardAnalyticsItem from "./CardAnalyticsItem";
import CardHistoryItem from "./CardHistoryItem";

class DetailsScreen extends Component {
  getAnalytics(merchant) {
    let added = 0,
      completed = 0,
      marked = 0;

    merchant.cards.forEach(card => {
      added++;
      marked += card.marked;
      if (card.marked === card.card.settings.marks.total) {
        completed++;
      }
    });

    return {
      added,
      completed,
      marked
    };
  }

  render() {
    const merchant = this.props.navigation.getParam("merchant");

    const { added, completed, marked } = this.getAnalytics(merchant);

    const navigateTo = this.props.navigation.getParam("navigateTo");
    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <Card
            settings={merchant}
            showInfo={false}
            navigation={this.props.navigation}
            navigateTo={navigateTo}
          />
        </View>

        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.title}>{merchant.merchant.name}</Text>
            <Text style={styles.description}>
              {merchant.merchant.description}
            </Text>
            <Text style={styles.address}>
              {merchant.merchant.address.value}
            </Text>
          </View>
          <MapView
            ref={map => (this.map = map)}
            initialRegion={{
              latitude: merchant.merchant.address.coordinate.lat,
              longitude: merchant.merchant.address.coordinate.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            style={styles.map}
            showsUserLocation={true}
            userLocationAnnotationTitle=""
            showsCompass={false}
            showsMyLocationButton={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: merchant.merchant.address.coordinate.lat,
                longitude: merchant.merchant.address.coordinate.lng
              }}
              onPress={() =>
                openMap({
                  latitude: merchant.merchant.address.coordinate.lat,
                  longitude: merchant.merchant.address.coordinate.lng,
                  query: merchant.merchant.address.value,
                  zoom: 10
                })
              }
            >
              <Marker logo={merchant.merchant.logo} size={50} />
            </MapView.Marker>
          </MapView>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.cardAnalyticsTitle}>Dati storici</Text>
            <View style={styles.cardAnalyticsContainer}>
              <CardAnalyticsItem
                number={added}
                color="#fff"
                backgroundColor="#f00"
                text={["Tessere", "Abbinate"]}
              />
              <CardAnalyticsItem
                number={marked}
                color="#fff"
                backgroundColor="#FFC445"
                text={["Bollini", "Raccolti"]}
              />
              <CardAnalyticsItem
                number={completed}
                color="#fff"
                backgroundColor="#10E5E8"
                text={["Tessere", "Completate"]}
              />
            </View>

            {/* Cronologia */}
            <Text style={styles.cardHistoryTitle}>Cronologia</Text>
            <View style={styles.cardHistoryContainer}>
              {this.getHistory(merchant.history)}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  getHistory(history) {
    if (history.length === 0) {
      return (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>Nessun movimento</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CardHistoryItem history={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    paddingBottom: 12
  },
  cardInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: vars.cardDetails.style.shadow.color,
    shadowOffset: vars.cardDetails.style.shadow.offset,
    shadowOpacity: vars.cardDetails.style.shadow.opacity,
    shadowRadius: vars.cardDetails.style.shadow.radius,
    elevation: 1
  },
  cardDetailsContainer: {
    padding: 12
  },
  title: {
    fontSize: 25,
    fontFamily: vars.font.bold,
    color: vars.color.title
  },
  description: {
    fontSize: 16,
    fontFamily: vars.font.regular,
    color: vars.color.subtitle,
    marginTop: 5
  },
  address: {
    fontSize: 16,
    fontFamily: vars.font.regular,
    color: vars.color.description,
    marginTop: 10
  },
  map: {
    height: 150
  },
  cardAnalyticsContainer: {
    padding: 12,
    flexDirection: "row"
  },
  cardAnalyticsTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryContainer: {
    padding: 12
  },
  noHistoryContainer: {
    alignItems: "center"
  },
  noHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 16
  }
});

export default DetailsScreen;
