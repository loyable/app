import AuthReducer from "./AuthReducer";
import MapsReducer from "./MapsReducer";
import UserReducer from "./UserReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  auth: AuthReducer,
  maps: MapsReducer,
  user: UserReducer
});

export default RootReducer;
