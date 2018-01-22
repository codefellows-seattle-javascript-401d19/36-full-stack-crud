import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    id: uuid.v1(),
    createdOn: new Date(),
  },
});

export const updateAction = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const removeAction = (category) => ({
  type: 'CATEGORY_REMOVE',
  payload: category,
});

export const getSynth = () => (dispatch) => {
  return superagent.get('http://localhost:3000/api/synth/')
    .then(response => {
      console.log(response);
      dispatch(createAction({name: 'Celebration!', budget: '99999999'}));
    })
    .catch(err => console.log(err.message));
};