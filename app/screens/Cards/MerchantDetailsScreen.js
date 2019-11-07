import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking
} from "react-native";

// Import libraries
import { connect } from "react-redux";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";

// Import global vars
import vars from "../../config/styles";

// Import icons
import Chiama from "../../assets/icons/chiama";
import Indicazioni from "../../assets/icons/indicazioni";
import SitoWeb from "../../assets/icons/sitoweb";

// Import components
import Card from "../../components/ui/Card";
import CardAnalyticsItem from "../../components/ui/Cards/CardAnalyticsItem";
import CardHistoryItem from "../../components/ui/Cards/CardHistoryItem";
import Marker from "../../components/ui/Map/Marker";

// Import methods
import { changeHeaderState } from "../../components/ui/Header";

// Map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class DetailsScreen extends Component {
  componentDidMount() {
    this.changeHeader();
  }

  render() {
    //Ricevo l'oggetto merchantObject
    const merchantObject = this.props.user.activeMerchant;

    //Inizializzo la variabile merchant
    let merchant = merchantObject;

    //Se l'utente NON ha associata la tessera
    if (!merchantObject.hasOwnProperty("merchant")) {
      merchant = { merchant: merchantObject };
    }

    //Calcolo delle statistiche
    const { added, completed, marked } = this.getAnalytics(merchantObject);

    //Nome dello screen a cui navigare
    const navigateTo = this.props.navigation.getParam("navigateTo");

    return (
      <ScrollView style={styles.container}>
        {/* //Se l'utente NON ha associata la tessera */}
        {merchantObject.hasOwnProperty("merchant") ? (
          <View style={styles.cardContainer}>
            <Card
              settings={merchant}
              showInfo={false}
              navigation={this.props.navigation}
              navigateTo={navigateTo}
            />
          </View>
        ) : (
          <View style={styles.cardContainer} />
        )}
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.title}>{merchant.merchant.name}</Text>
            <Text style={styles.description}>
              {merchant.merchant.description}
            </Text>
            <Text style={styles.address}>{merchant.merchant.address}</Text>
          </View>
          {merchant.merchant.hasOwnProperty("details") && (
            <View style={styles.merchantDetailsContainer}>
              {merchant.merchant.details.hasOwnProperty("phone") && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.merchantDetails}
                  onPress={() =>
                    Linking.openURL(`tel:${merchant.merchant.details.phone}`)
                  }
                >
                  <Chiama />
                  <Text style={styles.merchantDetailsText}>Chiama</Text>
                </TouchableOpacity>
              )}
              {(merchant.merchant.details.hasOwnProperty("phone") ||
                merchant.merchant.details.hasOwnProperty("website")) && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.merchantDetails}
                  onPress={() =>
                    openMap({
                      latitude: merchant.merchant.location.coordinates[0],
                      longitude: merchant.merchant.location.coordinates[1],
                      query: merchant.merchant.address,
                      zoom: 10
                    })
                  }
                >
                  <Indicazioni />
                  <Text style={styles.merchantDetailsText}>Indicazioni</Text>
                </TouchableOpacity>
              )}
              {merchant.merchant.details.hasOwnProperty("website") && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.merchantDetails}
                  onPress={() =>
                    Linking.openURL(merchant.merchant.details.website)
                  }
                >
                  <SitoWeb />
                  <Text style={styles.merchantDetailsText}>Sito Web</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <MapView
            ref={map => (this.map = map)}
            initialRegion={{
              latitude: merchant.merchant.location.coordinates[0],
              longitude: merchant.merchant.location.coordinates[1],
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
                latitude: merchant.merchant.location.coordinates[0],
                longitude: merchant.merchant.location.coordinates[1]
              }}
              onPress={() =>
                openMap({
                  latitude: merchant.merchant.location.coordinates[0],
                  longitude: merchant.merchant.location.coordinates[1],
                  query: merchant.merchant.address,
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
            <Text style={styles.cardHistoryTitle}>Cronologia</Text>

            {/* Cronologia */}
            <View style={styles.cardHistoryContainer}>
              {this.getHistory(merchant)}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  getHistory(merchant) {
    let history = [];
    if (merchant.hasOwnProperty("history")) {
      history = merchant.history;
    }

    //Se l'utente NON ha associato l'esercente
    if (history.length === 0) {
      return (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>Nessun movimento</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={merchant.history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CardHistoryItem history={item} />}
      />
    );
  }

  getAnalytics(merchant) {
    let added = 0,
      completed = 0,
      marked = 0;

    if (merchant.hasOwnProperty("merchant")) {
      merchant.cards.forEach(card => {
        added++;
        marked += card.marked;
        if (card.marked === card.card.marks.total) {
          completed++;
        }
      });
    }

    return {
      added,
      completed,
      marked
    };
  }

  // Change Header State
  changeHeader() {
    this.props.navigation.addListener("didFocus", () => {
      changeHeaderState({
        backArrow: true,
        navigation: this.props.navigation
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  cardContainer: {
    paddingTop: 12
  },
  cardInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1
  },
  cardDetailsContainer: {
    padding: 12
  },
  title: {
    fontSize: 25,
    fontFamily: vars.font.regular,
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
  },
  merchantDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12
  },
  merchantDetails: {
    alignItems: "center"
  },
  merchantDetailsText: {
    fontFamily: vars.font.bold,
    fontSize: 16,
    color: "#007AFF"
  }
});

export default connect(mapStateToProps)(DetailsScreen);
