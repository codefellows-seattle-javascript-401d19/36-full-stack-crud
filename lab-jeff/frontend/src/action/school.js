const superagent = require('superagent');

export const createAction = ({ name, city, state, _id }) => ({
  type: 'SCHOOL_CREATE',
  payload: {
    name,
    city,
    state,
    _id,
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
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/schools').then(response => {
    console.log('AJAX DONE', response.body);
    response.body.map(function(school) {
      console.log('mapped school:', school);
      let name = school.name;
      let city = school.city;
      let state = school.state;
      let _id = school._id;
      dispatch(createAction({ name, city, state, _id }));
    });
  });
};

export const createSchool = school => dispatch => {
  console.log('SCHOOL: ', school);
  return superagent
    .post('http://localhost:3000/api/schools')
    .send(school)
    .then(response => {
      console.log('AJAX DONE: ', response.body);
      dispatch(createAction(response.body));
    });
};

export const removeSchool = school => dispatch => {
  console.log('SCHOOL: ', school);
  return superagent.delete(`http://localhost:3000/api/schools/${school._id}`).then(response => {
    console.log('AJAX DONE: ', response.body);
    dispatch(removeAction(school));
    dispatch(getSchools());
  });
};

export const updateSchool = school => dispatch => {
  console.log('SCHOOL: ', school);
  return superagent
    .put(`http://localhost:3000/api/schools/${school._id}`)
    .send(school)
    .then(response => {
      console.log('AJAX DONE: ', response.body);
      dispatch(removeAction(school));
      dispatch(getSchools());
    });
};
