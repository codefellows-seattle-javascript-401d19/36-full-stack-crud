let emptyState = {};

export default (state = emptyState, {type, payload}) => {
  let countryID, countryExpenses, updatedExpenses;

  switch(type){

    case 'COUNTRY_CREATE':
      return {...state, [payload.id] : []};

    case 'COUNTRY_DESTROY':
      let updatedState = {...state};
      delete updatedState[payload.id];

      return updatedState;

    case 'EXPENSE_CREATE':
      countryID = payload.countryID;
      countryExpenses = state[countryID];
      updatedExpenses = [...countryExpenses, payload];

      return {...state, [countryID] : updatedExpenses};

    case 'EXPENSE_UPDATE':
      countryID = payload.countryID;
      countryExpenses = state[countryID];
      updatedExpenses = countryExpenses.map(card => card.id === payload.id ? payload : card)

      return {...state, [countryID] : updatedExpenses};

    case 'EXPENSE_DESTROY':
    countryID = payload.countryID;
    countryExpenses = state[countryID];
    updatedExpenses = countryExpenses.filter(card => card.id !== payload.id);

    return {...state, [countryID] : updatedExpenses};
    return {...state, [countryID] : updatedExpenses};

    default:
      return state;
  }
}