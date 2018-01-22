export default store => next => action => {
  const result = next(action);
  const state = store.getState();

  for (let key in state) {
    sessionStorage[key] = JSON.stringify(state[key]);
  }

  return result;
};
