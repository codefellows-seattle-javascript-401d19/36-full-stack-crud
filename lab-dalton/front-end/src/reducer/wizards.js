let emptyState = {};

export default(state = emptyState, {type, payload}) => {
  let categoryID, categoryWizards, updatedWizards, updatedState;

  switch(type) {
    case 'CATEGORY_CREATE':
      return {...state, [payload.id] : [] };

    case 'CATEGORY_REMOVE': 
      updatedState = {...state};
      delete updatedState[payload.id];
      return updatedState;
    
    case 'WIZARD_CREATE': 
      categoryID = payload.categoryID;
      categoryWizards = state[categoryID];
      updatedWizards = [...categoryWizards, payload];
      return {...state, [categoryID] : updatedWizards};

    case 'WIZARD_UPDATE': 
      categoryID = payload.categoryID;
      categoryWizards = state[categoryID];
      updatedWizards = categoryWizards.map(wizard => wizard.id === payload.id ? payload : wizard);
      return {...state, [categoryID] : updatedWizards};

    case 'WIZARD_DELETE': 
      categoryID = payload.categoryID;
      categoryWizards = state[categoryID];
      updatedWizards = categoryWizards.filter(wizard => wizard.id !== payload.id);
      return {...state, [categoryID]: updatedWizards};

    default: 
      return state;
  }
};