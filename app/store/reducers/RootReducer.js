import MapsReducer from "./MapsReducer";
import UserReducer from "./UserReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  user: UserReducer,
  maps: MapsReducer
});

export default RootReducer;
