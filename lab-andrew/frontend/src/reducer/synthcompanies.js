const emptyState = [];

const validateSynthCompany = synthCompany => {
  if (!synthCompany.name || !synthCompany.location){
    throw new Error('synthCompany requires both a name and a location');
  }
};

export default (state = emptyState, {type, payload}) => {
  switch (type){
    case 'SYNTHCOMPANY_CREATE':
      validateSynthCompany(payload);
      return [...state, payload];
    case 'SYNTHCOMPANY_UPDATE':
      return state.map(synthCompany => synthCompany.id === payload.id ? payload : synthCompany);
    case 'SYNTHCOMPANY_REMOVE':
      return state.filter(synthCompany => synthCompany.id !== payload.id);
    case 'SYNTHCOMPANY_CLEAR':
      return emptyState;
    default:
      return state;
  }
};