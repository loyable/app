import React, { Component } from "react";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MapListScreen from "./MapListScreen";
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

const MapListDetailsStack = createStackNavigator(
  {
    MapList: {
      screen: MapListScreen
    },
    DetailsMapList: {
      screen: DetailsScreen
    },
    CardMapListDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "MapList",
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    MapView: {
      screen: MapViewDetailsStack
    },
    MapList: {
      screen: MapListDetailsStack
    }
  },
  {
    headerMode: "none",
    initialRouteName: "MapView"
  }
);
