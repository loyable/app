import React, { Component } from "react";
import { Text, View, ScrollView, Button, StyleSheet } from "react-native";

import MapView from "react-native-maps";

import Card from "../../components/ui/Card";

//global vars
import vars from "../../config/styles";
import CardAnalyticsCircle from "./CardAnalyticsCircle";

class DetailsScreen extends Component {
  render() {
    const card = this.props.navigation.getParam("card");
    console.log(card);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <Card settings={card} showInfo={false} />
        </View>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.title}>{card.settings.text.title.value}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              modi dicta impedit possimus. Repellendus, praesentium.
            </Text>
            <Text style={styles.address}>
              {card.settings.text.address.value}
            </Text>
          </View>
          <MapView
            ref={map => (this.map = map)}
            initialRegion={{
              latitude: 45.466797,
              longitude: 9.190498,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421
            }}
            style={styles.map}
            showsUserLocation={true}
            userLocationAnnotationTitle=""
            showsCompass={false}
            showsMyLocationButton={false}
          />
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.cardAnalyticsTitle}>Dati storici</Text>
            <View style={styles.cardAnalyticsContainer}>
              <View style={styles.cardAnalyticsItem}>
                <CardAnalyticsCircle
                  number={3}
                  color="#fff"
                  backgroundColor="#f00"
                />
                <Text style={styles.cardAnalyticsText}>Tessere</Text>
                <Text style={styles.cardAnalyticsText}>Abbinate</Text>
              </View>
              <View style={styles.cardAnalyticsItem}>
                <CardAnalyticsCircle
                  number={23}
                  color="#fff"
                  backgroundColor="#FFC445"
                />
                <Text style={styles.cardAnalyticsText}>Bollini</Text>
                <Text style={styles.cardAnalyticsText}>Raccolti</Text>
              </View>
              <View style={styles.cardAnalyticsItem}>
                <CardAnalyticsCircle
                  number={2}
                  color="#fff"
                  backgroundColor="#10E5E8"
                />
                <Text style={styles.cardAnalyticsText}>Tessere</Text>
                <Text style={styles.cardAnalyticsText}>Completate</Text>
              </View>
            </View>

            {/* Cronologia */}
            <Text style={styles.cardHistoryTitle}>Cronologia</Text>
            <View style={styles.cardHistoryContainer}>
              <View style={styles.cardHistoryItem}>
                <View style={styles.cardHistoryIcon}>
                  <CardAnalyticsCircle
                    number="+1"
                    size={35}
                    fontSize={22}
                    color="#fff"
                    backgroundColor="#C812FF"
                  />
                </View>
                <View style={styles.cardHistoryTextContainer}>
                  <Text style={styles.cardHistoryText}>Tessera associata</Text>
                </View>
                <View style={styles.cardHistoryDateContainer}>
                  <Text style={styles.cardHistoryDate}>12/01/2019 13:25</Text>
                </View>
              </View>
              <View style={styles.cardHistoryItem}>
                <View style={styles.cardHistoryIcon}>
                  <CardAnalyticsCircle
                    number="+1"
                    size={35}
                    fontSize={22}
                    color="#fff"
                    backgroundColor="#72E81F"
                  />
                </View>
                <View style={styles.cardHistoryTextContainer}>
                  <Text style={styles.cardHistoryText}>Tessera completata</Text>
                </View>
                <View style={styles.cardHistoryDateContainer}>
                  <Text style={styles.cardHistoryDate}>12/01/2019 13:25</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate("CardDetails")}
          title="Go to Card Details"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    padding: 12
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
  cardAnalyticsItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardAnalyticsText: {
    fontSize: 13,
    fontFamily: vars.font.regular
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
  cardHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  cardHistoryIcon: {},
  cardHistoryTextContainer: {
    marginLeft: 12
  },
  cardHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#3c3c3c"
  },
  cardHistoryDateContainer: {
    flex: 1
  },
  cardHistoryDate: {
    fontFamily: vars.font.regular,
    fontSize: 14,
    color: "#7B7B7B",
    textAlign: "right"
  }
});

export default DetailsScreen;
