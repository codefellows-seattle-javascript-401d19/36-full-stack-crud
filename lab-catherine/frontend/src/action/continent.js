import uuidv1 from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({name, population}) => ({
  type: 'CONTINENT_CREATE',
  payload: {
    name,
    population,
    id: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = (continent) => ({
  type: 'CONTINENT_UPDATE',
  payload: continent,
});

export const destroyAction = (continent) => ({
  type: 'CONTINENT_DESTROY',
  payload: continent,
});

// asynchronous action creators
export const getContinents = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/forests')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({name: 'Whoville', population: 25}));
    });
};