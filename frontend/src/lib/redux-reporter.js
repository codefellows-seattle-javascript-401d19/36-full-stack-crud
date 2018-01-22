export default store => next => action => {
  try{
    console.log('_ACTION_ ', action);
    let result = next(action);
    console.log('_STATE_ ', store.getState());
    return result;
  }catch(error){
    console.error(error);
    action.error = error;
    return action;
  }
};
