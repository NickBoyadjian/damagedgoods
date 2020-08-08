const initialState = [];

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        {
          id: state.length,
          item: action.item
        }
      ]
    default:
      return state
  }
}

export default cart;