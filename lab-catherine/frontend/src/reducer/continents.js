const emptyState = [];

const validateContinent = (continent) => {
  if(!continent.name)
    throw new Error ('continent requires a name');
};

export default (state = emptyState, {type, payload}) => {
  switch(type) {
    case 'CONTINENT_CREATE':
      validateContinent(payload);
      return [...state, payload];
    case 'CONTINENT_UPDATE':
      return state.map(continent => continent.id === payload.id ? payload : continent);
    case 'CONTINENT_DESTROY':
      return state.filter(continent => continent.id !== payload.id);
    default: 
      return state;
  }
};