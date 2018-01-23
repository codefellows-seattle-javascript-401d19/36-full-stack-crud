import uuid from 'uuid';

export const createAction = ({name, amount, synthCompanyID}) => ({
  type: 'SYNTH_CREATE',
  payload: {
    name,
    amount,
    synthCompanyID,
    id: uuid.v1(),
    createdOn: new Date(),
  },
});

export const updateAction = (synth) => ({
  type: 'SYNTH_UPDATE',
  payload: synth,
});

export const removeAction = (synth) => ({
  type: 'SYNTH_REMOVE',
  payload: synth,
});