const initialState = {
  userID: "",
  user: {},
  filter: "",
  userFiltered: {}
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userID: action.payload
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "FILTER_MERCHANTS":
      if (state.filter === "") {
        return {
          ...state,
          userFiltered: state.user
        };
      }
      merchantsFiltered = state.user.user.merchants.filter(merchant => {
        if (
          merchant.merchant.name
            .toLowerCase()
            .indexOf(state.filter.toLowerCase()) > -1 ||
          merchant.merchant.address.value
            .toLowerCase()
            .indexOf(state.filter.toLowerCase()) > -1
        ) {
          return merchant;
        }
      });

      userFiltered = {
        ...state.user,
        user: {
          merchants: merchantsFiltered
        }
      };

      return {
        ...state,
        userFiltered
      };
    case "LOAD_USER":
      return { ...state, user: action.payload, userFiltered: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
