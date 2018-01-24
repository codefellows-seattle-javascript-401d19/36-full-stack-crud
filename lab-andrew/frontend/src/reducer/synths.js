const emptyState = {};

export default (state = emptyState, {type, payload}) => {
  let synthCompanyID, synthCompanySynths, updatedSynths, updatedState;
  
  switch (type) {
    case 'SYNTHCOMPANY_CREATE':
      return {...state, [payload.id]: []};
    
    case 'SYNTHCOMPANY_REMOVE':
      updatedState = {...state};
      delete updatedState[payload.id];

      return updatedState;

    case 'SYNTH_CREATE':
      synthCompanyID = payload.synthCompanyID;
      synthCompanySynths = state[synthCompanyID];
      updatedSynths = [...synthCompanySynths, payload];

      return {...state, [synthCompanyID]: updatedSynths};

    case 'SYNTH_UPDATE':
      synthCompanyID = payload.synthCompanyID;
      synthCompanySynths = state[synthCompanyID];
      updatedSynths = synthCompanySynths.map(synth => synth.id === payload.id ? payload : synth);

      return {...state, [synthCompanyID]: updatedSynths};

    case 'SYNTH_REMOVE':
      synthCompanyID = payload.synthCompanyID;
      synthCompanySynths = state[synthCompanyID];
      updatedSynths = synthCompanySynths.filter(synth => synth.id !== payload.id);

      return {...state, [synthCompanyID]: updatedSynths};

    default:
      return state;
  }
};