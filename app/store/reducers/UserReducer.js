const initialState = {
    user: {},
    filter: "",
    userFiltered: {}
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FILTER_MERCHANT":
      userFiltered = state.cards.filter(card => {
          if (
            card.settings.text.title.value
              .toLowerCase()
              .indexOf(state.filter.toLowerCase()) > -1 ||
            card.settings.text.address.value
              .toLowerCase()
              .indexOf(state.filter.toLowerCase()) > -1
          ) {
            return card;
          }
        });
        return {
          ...state,
          userFiltered
        };
      case "SET_FILTER":
        return {
          ...state,
          filter: action.payload
        };
      case "LOAD_USER":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export default UserReducer;
  