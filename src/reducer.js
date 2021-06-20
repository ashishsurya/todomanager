export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return { ...state, user: action.payload };
  }
  return state;
};
