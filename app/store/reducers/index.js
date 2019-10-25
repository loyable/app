import MapsReducer from "./MapsReducer";
import UserReducer from "./UserReducer";

import { combineReducers } from "redux";

export default combineReducers({
  user: UserReducer,
  maps: MapsReducer
});
