import { createStackNavigator } from "react-navigation";

import CardsListScreen from "./CardsListScreen";
import DetailsScreen from "./DetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";

export default (CardDetailsStack = createStackNavigator(
  {
    CardsList: {
      screen: CardsListScreen
    },
    Details: {
      screen: DetailsScreen
    },
    CardDetails: {
      screen: CardDetailsScreen
    }
  },
  {
    initialRouteName: "CardsList",
    headerMode: "none"
  }
));
