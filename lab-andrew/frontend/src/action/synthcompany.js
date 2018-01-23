import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({name, synth}) => ({
  type: 'SYNTHCOMPANY_CREATE',
  payload: {
    name,
    synth,
    id: uuid.v1(),
    createdOn: new Date(),
  },
});

export const updateAction = synthCompany => ({
  type: 'SYNTHCOMPANY_UPDATE',
  payload: synthCompany,
});

export const removeAction = synthCompany => ({
  type: 'SYNTHCOMPANY_REMOVE',
  payload: synthCompany,
});

export const getSynthCompanies = () => dispatch => {
  return superagent.get('http://localhost:3000/api/synth/')
    .then(response => {
      console.log(response);
      dispatch(createAction({name: 'Celebration!', synth: '99999999'}));
    })
    .catch(err => console.log(err.message));
};