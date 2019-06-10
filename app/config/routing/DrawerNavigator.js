import { createDrawerNavigator } from "react-navigation";

import StackNavigator from "./StackNavigator";

import Sidebar from "../../components/ui/Sidebar";

export default createDrawerNavigator(
  {
    Home: { screen: StackNavigator }
  },

  {
    contentComponent: Sidebar
  }
);
