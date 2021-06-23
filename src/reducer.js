export const initialState = {
  user: null,
  todos: [],
  open: false,
  message: '',
  severity: '',
};

export const reducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return { ...state, user: action.payload };
  }
  if (action.type === 'SET_TODOS') {
    return { ...state, todos: action.payload };
  }
  if (action.type === 'SET_ALERT') {
    return {
      ...state,
      open: action.payload.open,
      message: action.payload.message,
      severity: action.payload.severity,
    };
  }
  return state;
};
