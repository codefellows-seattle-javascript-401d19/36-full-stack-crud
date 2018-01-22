import React from 'react';
import { connect } from 'react-redux';
import SchoolForm from '../school-form';
import SchoolItem from '../school-item';
import * as schoolActions from '../../action/school';

class Dashboard extends React.Component {
  componentWillMount() {
    console.log('component will mount');
    this.props.handleAJAX();
  }

  render() {
    let { schools, schoolCreate, schoolUpdate, schoolRemove, handleAJAX } = this.props;

    return (
      <div className="dashboard">
        <button onClick={handleAJAX}> AJAX Stuff </button>
        <SchoolForm onComplete={schoolCreate} />
        <div className="schools">{schools.map((school, i) => <SchoolItem school={school} key={i} />)}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    schools: state.schools,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    schoolCreate: data => dispatch(schoolActions.createAction(data)),
    schoolUpdate: data => dispatch(schoolActions.updateAction(data)),
    schoolRemove: data => dispatch(schoolActions.removeAction(data)),
    handleAJAX: () => dispatch(schoolActions.getSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
