import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MapViewScreen from "./MapViewScreen";

import MerchantDetailsScreen from "../Cards/MerchantDetailsScreen";
import CardDetailsScreen from "../Cards/CardDetailsScreen";

const MapViewDetailsStack = createStackNavigator(
  {
    MapView: {
      screen: MapViewScreen
    },
    MerchantDetailsMapView: {
      screen: MerchantDetailsScreen
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
