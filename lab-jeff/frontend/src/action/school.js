const superagent = require('superagent');

export const createAction = ({ name, city, state }) => ({
  type: 'SCHOOL_CREATE',
  payload: {
    name,
    city,
    state,
  },
});

export const updateAction = school => ({
  type: 'SCHOOL_UPDATE',
  payload: school,
});

export const removeAction = school => ({
  type: 'SCHOOL_REMOVE',
  payload: school,
});

export const getSchools = () => dispatch => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/schools').then(response => {
    console.log('AJAX DONE', response);
    let name = response.body.name;
    let city = response.body.city;
    let state = response.body.state;
    dispatch(createAction({ name, city, state }));
  });
};
