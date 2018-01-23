import './_continent_item.scss';
import React from 'react';
import ContinentForm from '../continent-form';
import * as continentActions from '../../action/continent';
import * as forestActions from '../../action/forest';
import {connect} from 'react-redux';
import ForestItem from '../forest-item';
import ForestForm from '../forest-form';

class ContinentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    let memberFunctions = Object.getOwnPropertyNames(ContinentItem.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(continent) {
    this.props.continentUpdate(continent);
    this.setState({editing: false});
  }

  render() {
    let {continent, continentDestroy, continentUpdate, forests, forestCreate} = this.props;

    let continentForests = forests[continent.id];

    let editingJSX = <ContinentForm continent={continent} onComplete={this.handleUpdate} />;
    let contentJSX =
    <div className='new-item'>
      <div onDoubleClick={() => this.setState({editing: true})} className='headers'>
        <h2>Name: {continent.name}</h2>
        <h2>Population: {continent.population}</h2>
      </div>
      <button className='delete' onClick={() => continentDestroy(continent)}>X</button>
    </div>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className='continent-item'>
        {renderJSX}
        <ForestForm continent={continent} onComplete={forestCreate} />
        {
          continentForests.map((forest, index) => <ForestItem  key={index} forest={forest} />
          )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    forests: state.forests,
  };
};

let mapDispatchToProps = (dispatch) => ({
  forestCreate: (data) => dispatch(forestActions.createAction(data)),
  continentUpdate: (data) => dispatch(continentActions.updateAction(data)),
  continentDestroy: (data) => dispatch(continentActions.destroyAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContinentItem);