const initialState = {
  userID: {},
  user: {},
  filter: "",
  userFiltered: {},
  activeMerchant: {},
  activeCard: {}
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
      let activeMerchant = {},
        activeCard = {};
      if (state.activeMerchant.hasOwnProperty("merchantID")) {
        const activeMerchantArray = action.payload.user.merchants.filter(
          merchant => {
            if (merchant.merchantID === state.activeMerchant.merchantID)
              return true;
          }
        );
        activeMerchant = activeMerchantArray[0];
      }

      if (state.activeCard.hasOwnProperty("id")) {
        const activeCardArray = action.payload.user.merchants.map(merchant => {
          const activeMerchantArray = merchant.cards.filter(card => {
            if (card.id === state.activeCard.id) return true;
          });
          return activeMerchantArray[0];
        });
        activeCard = activeCardArray[0];
      }
      return {
        ...state,
        user: action.payload,
        userFiltered: action.payload,
        activeMerchant,
        activeCard
      };
    case "SET_ACTIVE_MERCHANT":
      return { ...state, activeMerchant: action.payload };
    case "SET_ACTIVE_CARD":
      return { ...state, activeCard: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
