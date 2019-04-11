import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import { store } from "../../store";

import { SET_LOCATION } from "../../store/actions";

import vars from "../../config/styles";

import SearchBar from "../../components/ui/SearchBar";

import MapView from "react-native-maps";

import Tooltip from "../../components/ui/Map/Tooltip";

import LocationArrow from "../../components/ui/Map/LocationArrow";

import Marker from "../../components/ui/Map/Marker";

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

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMarkerIndex: undefined
    };
  }

  getInitialMapState() {
    let { latitude, longitude } = this.props.maps.location;

    return {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
  }

  getCurrentLocation() {
    const { latitude, longitude } = this.props.maps.currentLocation;

    //se l'utente non ha abilitato la localizzazione
    if (latitude === 0 && longitude === 0) {
      return;
    }

    return {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
  }

  setCurrentLocation() {
    let location = this.getCurrentLocation();

    if (location) {
      this.map.animateToRegion(this.getCurrentLocation(), 1000);
    }
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      position => {
        store.dispatch(SET_LOCATION(position.coords));
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    const { user } = this.props.user;
    return (
      <SafeAreaView style={styles.pageContainer}>
        <SearchBar
          page="map"
          navigation={this.props.navigation}
          navigateTo="MapList"
          activeArray={[true, false]}
        />
        <View style={styles.mapContainer}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setCurrentLocation()}
            >
              <LocationArrow />
            </TouchableOpacity>
          </View>
          <MapView
            ref={map => (this.map = map)}
            initialRegion={this.getInitialMapState()}
            region={this.getCurrentLocation()}
            style={styles.map}
            showsUserLocation={true}
            userLocationAnnotationTitle=""
            showsCompass={false}
            showsMyLocationButton={false}
          >
            {user.user.merchants.map((merchant, index) => (
              <MapView.Marker
                key={`marker-${index}`}
                coordinate={{
                  latitude: merchant.merchant.address.coordinate.lat,
                  longitude: merchant.merchant.address.coordinate.lng
                }}
              >
                <Marker logo={merchant.merchant.logo} />

                <Tooltip
                  merchant={merchant}
                  navigation={this.props.navigation}
                />
              </MapView.Marker>
            ))}
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#7cc639",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.1
  },
  markerImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#343434",
    alignItems: "center",
    justifyContent: "center"
  },
  markerImage: {
    width: 40,
    height: 12
  },
  locationContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapViewScreen);
