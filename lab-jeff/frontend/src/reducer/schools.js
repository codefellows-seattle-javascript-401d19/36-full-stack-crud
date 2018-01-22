const emptyState = [];

const validateSchool = school => {
  if (!school.name) throw new Error('school requires a name');
};

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'SCHOOL_CREATE':
      validateSchool(payload);
      return [...state, payload];
    case 'SCHOOL_UPDATE':
      return state.map(school => (school.id === payload.id ? payload : school));
    case 'SCHOOL_REMOVE':
      return state.filter(school => school.id !== payload.id);
    case 'SCHOOL_CLEAR':
      return emptyState;
    default:
      return state;
  }
};
