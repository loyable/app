import { createStackNavigator } from "react-navigation";

import MapViewScreen from "./MapViewScreen";

import MerchantDetailsScreen from "../Cards/MerchantDetailsScreen";
import CardDetailsScreen from "../Cards/CardDetailsScreen";

export default createStackNavigator(
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
