import uuid from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({name, budget, period}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    period,
    uuid: uuid(),
    timeStamp: new Date(),
  },
});
export const updateAction = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});
export const removeAction = (category) => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});
 

// asynchronous action creators
export const getExpenses = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:7000/api/expenses')
    .then((response) => {
      console.log('AJAX DONE', response);
      // let count = response.body.count;
      let data = response.body.data;
      if(!data){
        dispatch(createAction({ name: 'Sample', budget: 50, period: 'month' }));
        console.log('No Data From DB, returning Sample');
      }
      else{
        //Map over data to append each one to the page?
        // dispatch(createAction({ name: 'Sample', budget: 50, period: 'month' }));
        console.log('Need to get data!');
      }
        
    });
};

