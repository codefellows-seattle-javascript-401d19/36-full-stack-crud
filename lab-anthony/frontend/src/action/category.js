import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload : {
    name,
    budget,
    id: uuid.v1(),
    timestamp: new Date(),
  },
});

export const updateAction = (category) => ({
  type : 'CATEGORY_UPDATE',
  payload : category,
});

export const removeAction = (category) => ({
  type : 'CATEGORY_REMOVE',
  payload : category,
});

export const getBeers = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/beers/')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({name: 'Celebration!', budget: 'hi'}));
    });
};
