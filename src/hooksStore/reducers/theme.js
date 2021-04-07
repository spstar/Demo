function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {};
    case 'toggleTheme':
      return action.payload;

    default:
      return state;
  }
}

export default reducer;
