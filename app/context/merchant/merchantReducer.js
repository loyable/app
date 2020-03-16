import {
  GET_MERCHANTS,
  SET_CURRENT_MERCHANT,
  SET_CURRENT_CARD,
  FILTER_MERCHANTS,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MERCHANTS:
      return {
        ...state,
        merchants: action.payload
      };
    case FILTER_MERCHANTS:
      return {
        ...state,
        filtered: state.merchants.filter(merchant => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            merchant.merchant.name.match(regex) ||
            merchant.merchant.address.value.match(regex)
          );
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case SET_CURRENT_MERCHANT:
      return {
        ...state,
        currentMerchant: action.payload
      };

    case SET_CURRENT_CARD:
      return {
        ...state,
        currentCard: action.payload
      };

    default:
      return state;
  }
};
