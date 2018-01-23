let emptyState = {};

export default(state = emptyState, {type, payload}) => {
  let continentID, continentForests, updatedForests, updatedState;

  switch(type) {
    case 'CONTINENT_CREATE':
      return {...state, [payload.id] : [] };

    case 'CONTINENT_REMOVE': 
      updatedState = {...state};
      delete updatedState[payload.id];
      return updatedState;
    
    case 'FOREST_CREATE': 
      continentID = payload.continentID;
      continentForests = state[continentID];
      updatedForests = [...continentForests, payload];
      return {...state, [continentID] : updatedForests};

    case 'FOREST_UPDATE': 
      continentID = payload.continentID;
      continentForests = state[continentID];
      updatedForests = continentForests.map(forest => forest.id === payload.id ? payload : forest);
      return {...state, [continentID] : updatedForests};

    case 'FOREST_DELETE': 
      continentID = payload.continentID;
      continentForests = state[continentID];
      updatedForests = continentForests.filter(forest => forest.id !== payload.id);
      return {...state, [continentID]: updatedForests};

    default: 
      return state;
  }
};