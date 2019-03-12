const initialState = {
  filter: "",
  cardsFiltered: [],
  cards: []
};

const CardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_CARDS":
      cardsFiltered = state.cards.filter(card => {
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
        cardsFiltered
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "GET_CARDS":
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};

export default CardsReducer;
