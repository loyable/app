import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

import { connect } from "react-redux";

import {
  SET_USER_LOCATION,
  SET_MAP_LOCATION,
  REQUEST_MERCHANTS,
  LOAD_MERCHANTS,
  SET_ACTIVE_MERCHANT
} from "../../store/actions";

import vars from "../../config/styles";

import Utils from "../../config/utils";

import MapView from "react-native-maps";

import Tooltip from "../../components/ui/Map/Tooltip";

import LocationArrow from "../../components/ui/Map/LocationArrow";

import Marker from "../../components/ui/Map/Marker";

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
    SET_USER_LOCATION: (region, callback) => {
      dispatch(SET_USER_LOCATION(region));
      if (callback) callback();
    },
    SET_MAP_LOCATION: region => {
      dispatch(SET_MAP_LOCATION(region));
    },
    REQUEST_MERCHANTS: (userID, callback) => {
      dispatch(REQUEST_MERCHANTS(userID, callback));
    },
    LOAD_MERCHANTS: merchants => {
      dispatch(LOAD_MERCHANTS(merchants));
    },
    SET_ACTIVE_MERCHANT: (merchant, callback) => {
      dispatch(SET_ACTIVE_MERCHANT(merchant));
      if (callback) callback();
    }
  };
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
    return this.props.maps.initialLocation;
  }

  getUserLocation() {
    const location = {
      ...this.props.maps.userLocation,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    if (location.latitude === 0 && location.longitude === 0) {
      return this.getInitialMapState();
    }

    return location;
  }

  setUserLocation() {
    const location = this.getUserLocation();
    if (location && this.props.user.userFiltered.hasOwnProperty("user")) {
      this.map.animateToRegion(location, 1000);
    }
  }

  // onRegionChangeComplete(region) {
  //   const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

  //   const box = [
  //     [latitude - latitudeDelta, longitude - longitudeDelta],
  //     [latitude + latitudeDelta, longitude + longitudeDelta]
  //   ];

  //   const body = {
  //     box,
  //     zoom: Math.round(Math.log(360 / longitudeDelta) / Math.LN2)
  //   };

  //   console.log(JSON.stringify(body));
  // }

  componentDidMount() {
    this.props.REQUEST_MERCHANTS(this.props.user.userID);

    this.props.navigation.addListener("didFocus", () => {
      //Metodo che cambia l'Header
      changeHeaderState({
        backArrow: false,
        navigation: this.props.navigation
      });
    });

    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.SET_USER_LOCATION(position.coords, () =>
          this.setUserLocation()
        );
      },
      error => {
        Alert.alert(
          "Abilita la localizzazione!",
          "Vai su Impostazioni > Privacy",
          [
            {
              text: "OK",
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { user } = this.props.user;

    let merchants = [],
      merchantsMarkers = [];

    //Se l'utente è presente nello store
    if (user.hasOwnProperty("user")) {
      merchants = user.user.merchants;
    }

    //Se l'utente ha scaricato la lista dei marker
    if (this.props.maps.merchants.length !== 0) {
      merchantsMarkers = this.props.maps.merchants;

      //Loop sull'array degli esercenti associati all'utente
      for (let i = 0; i < merchantsMarkers.length; i++) {
        merchants.filter(item => {
          if (merchantsMarkers[i].id === item.merchant.id) {
            merchantsMarkers[i] = item;
          }
        });
      }
      merchants = merchantsMarkers;
    }

    return (
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.mapContainer}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setUserLocation()}
            >
              <LocationArrow />
            </TouchableOpacity>
          </View>
          {user.hasOwnProperty("user") ? (
            <MapView
              ref={map => (this.map = map)}
              initialRegion={this.getUserLocation()}
              style={styles.map}
              loadingEnabled={true}
              showsUserLocation={true}
              userLocationAnnotationTitle=""
              showsCompass={false}
              showsMyLocationButton={false}
              // onRegionChangeComplete={region =>
              //   this.onRegionChangeComplete(region)
              // }
            >
              {merchants.map((merchant, index) => {
                if (merchant.hasOwnProperty("merchant")) {
                  return (
                    <MapView.Marker
                      key={`marker-${index}`}
                      coordinate={{
                        latitude:
                          merchant.merchant.address.location.coordinates[0],
                        longitude:
                          merchant.merchant.address.location.coordinates[1]
                      }}
                    >
                      <Marker logo={merchant.merchant.logo} />

                      <Tooltip
                        merchant={merchant}
                        navigation={this.props.navigation}
                        distance={Utils.distanceBetweenTwoCoords(
                          merchant.merchant.address.location.coordinates[0],
                          merchant.merchant.address.location.coordinates[1],
                          this.props.maps.userLocation.latitude,
                          this.props.maps.userLocation.longitude
                        )}
                      />
                    </MapView.Marker>
                  );
                } else {
                  return (
                    <MapView.Marker
                      key={`marker-${index}`}
                      coordinate={{
                        latitude: merchant.address.location.coordinates[0],
                        longitude: merchant.address.location.coordinates[1]
                      }}
                    >
                      <Marker />
                      <Tooltip
                        merchant={merchant}
                        navigation={this.props.navigation}
                        distance={Utils.distanceBetweenTwoCoords(
                          merchant.address.location.coordinates[0],
                          merchant.address.location.coordinates[1],
                          this.props.maps.userLocation.latitude,
                          this.props.maps.userLocation.longitude
                        )}
                      />
                    </MapView.Marker>
                  );
                }
              })}
            </MapView>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
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
  locationContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1
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
)(MapViewScreen);
