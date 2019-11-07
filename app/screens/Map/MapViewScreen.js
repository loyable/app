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

// Import libraries
import { connect } from "react-redux";
import MapView from "react-native-maps";

// Import redux actions
import {
  SET_USER_LOCATION,
  SET_MAP_LOCATION,
  REQUEST_MERCHANTS,
  LOAD_MERCHANTS,
  SET_ACTIVE_MERCHANT
} from "../../store/actions/MapsActions";

// Import global vars
import Utils from "../../config/utils";

// Import components
import Tooltip from "../../components/ui/Map/Tooltip";
import LocationArrow from "../../components/ui/Map/LocationArrow";
import Marker from "../../components/ui/Map/Marker";

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

  componentDidMount() {
    this.props.REQUEST_MERCHANTS(this.props.user.userID);

    this.changeHeader();

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

    //If user is in the store
    if (user.hasOwnProperty("_id")) {
      merchants = user.merchants;
    }

    //If user has downloaded merchant list
    if (this.props.maps.merchants.length !== 0) {
      merchantsMarkers = this.props.maps.merchants;

      // //Loop on user-associated merchants
      // for (let i = 0; i < merchantsMarkers.length; i++) {
      //   merchants.forEach(item => {
      //     if (merchantsMarkers[i]._id === item.merchant.id) {
      //       merchantsMarkers[i] = item.merchant;
      //     }
      //   });
      // }
      // merchants = merchantsMarkers;
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
          {user.hasOwnProperty("_id") ? (
            <MapView
              ref={map => (this.map = map)}
              initialRegion={this.getUserLocation()}
              style={styles.map}
              loadingEnabled={true}
              showsUserLocation={true}
              userLocationAnnotationTitle=""
              showsCompass={false}
              showsMyLocationButton={false}
            >
              {merchants.map((merchant, index) => {
                if (merchant.hasOwnProperty("merchant")) {
                  return (
                    <MapView.Marker
                      key={`marker-${index}`}
                      coordinate={{
                        latitude: merchant.merchant.location.coordinates[0],
                        longitude: merchant.merchant.location.coordinates[1]
                      }}
                    >
                      <Marker logo={merchant.logo} />

                      <Tooltip
                        merchant={merchant}
                        navigation={this.props.navigation}
                        distance={Utils.distanceBetweenTwoCoords(
                          merchant.merchant.location.coordinates[0],
                          merchant.merchant.location.coordinates[1],
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

  // Change Header State
  changeHeader() {
    this.props.navigation.addListener("didFocus", () => {
      changeHeaderState({
        backArrow: false,
        navigation: this.props.navigation
      });
    });
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
