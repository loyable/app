const initialState = {
  currentLocation: {
    latitude: 0,
    longitude: 0
  },
  location: {
    latitude: 45.466797,
    longitude: 9.190498,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421
  },
  merchants: []
};

const MapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        currentLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
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
