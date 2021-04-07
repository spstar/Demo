function reducer(state, action) {
  console.log('second action:', action);
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
