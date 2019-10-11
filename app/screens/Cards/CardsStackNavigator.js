import { createStackNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import MerchantDetailsScreen from "./MerchantDetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";

export default CardDetailsStack = createStackNavigator(
  {
    CardsList: {
      screen: CardsListScreen
    },
    MerchantDetails: {
      screen: MerchantDetailsScreen
    },
    CardDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "CardsList",
    headerMode: "none"
  }
);
