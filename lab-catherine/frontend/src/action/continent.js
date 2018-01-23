// import uuidv1 from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({name, population, id}) => ({
  type: 'CONTINENT_CREATE',
  payload: {
    name,
    population,
    id,
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

export const getContinents = () => (dispatch) => {
  return superagent.get('http://localhost:3000/api/continents')
    .then((response) => {
      response.body.forEach(continent => {
        dispatch(createAction({
          name: continent.name, 
          population: continent.population,
          id: continent._id,
        }));
      });
    })
    .catch(error => console.log(error.message));
};

export const postContinents = (continent) => (dispatch) => {
  return superagent.post('http://localhost:3000/api/continents')
    .send({name: continent.name, population: continent.population})
    .then((response) => {
      console.log('AJAX DONE', response);
      dispatch(createAction({
        name: response.body.name, 
        population: response.body.population,
        id: response.body._id,
      }));
    })
    .catch(error => console.log(error.message));
};