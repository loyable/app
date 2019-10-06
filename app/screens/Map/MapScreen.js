import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MapViewScreen from "./MapViewScreen";

import DetailsScreen from "../Cards/DetailsScreen";
import CardDetailsScreen from "../Cards/CardDetailsScreen";

const MapViewDetailsStack = createStackNavigator(
  {
    MapView: {
      screen: MapViewScreen
    },
    DetailsMapView: {
      screen: DetailsScreen
    },
    CardMapViewDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "MapView",
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    MapView: {
      screen: MapViewDetailsStack
    }
  },
  {
    headerMode: "none",
    initialRouteName: "MapView"
  }
);
