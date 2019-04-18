const initialState = {
  userLocation: {
    latitude: 0,
    longitude: 0
  },
  mapLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  },
  initialLocation: {
    latitude: 42.444999,
    longitude: 12.248431,
    latitudeDelta: 14.308762,
    longitudeDelta: 13.013736
  },
  merchants: []
};

const MapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_LOCATION":
      return {
        ...state,
        userLocation: {
          ...action.payload
        }
      };
    case "SET_MAP_LOCATION":
      return {
        ...state,
        mapLocation: {
          ...action.payload
        }
      };
    case "LOAD_MERCHANTS":
      return {
        ...state,
        merchants: action.payload
      };
    case "GET_MERCHANTS":
      return state.merchants;
    default:
      return state;
  }
};

export default MapsReducer;
