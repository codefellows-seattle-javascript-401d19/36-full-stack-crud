import './_dashboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import ContinentForm from '../continent-form';
import ContinentItem from '../continent-item';
import * as continent from '../../action/continent';

class Dashboard extends React.Component {
  componentWillMount() {
    console.log('component will mount');
    this.props.handleAJAX();
  }

  render() {
    let {
      continents, 
      continentCreate,
      continentUpdate,
      continentDestroy,
      handleAJAX,
    } = this.props;

    return (
      <div className='dashboard'>
        <button className='ajax-button' onClick={handleAJAX}>AJAX YAY</button>
        <ContinentForm onComplete={continentCreate} />
        {
          continents.map((continent, index) => 
            <div key={index}>
              <ContinentItem
                continent={continent}
              />
            </div>
          )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    continents: state.continents,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    continentCreate: (data) => dispatch(continent.postContinents(data)),
    continentUpdate: (data) => dispatch(continent.updateAction(data)),
    continentDestroy: (data) => dispatch(continent.destroyAction(data)),
    handleAJAX: () => dispatch(continent.getContinents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);