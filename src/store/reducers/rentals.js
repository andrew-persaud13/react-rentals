const rentals = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RENTALS':
      return action.payload;
    case 'CREATE_RENTAL':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default rentals;
