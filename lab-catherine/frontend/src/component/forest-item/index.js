import './_forest-item.scss';
import React from 'react';
import {connect} from 'react-redux';
import ForestForm from '../forest-form';
import * as forest from '../../action/forest';

class ForestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    let memberFunctions = Object.getOwnPropertyNames(ForestItem.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(forest) {
    this.props.forestUpdate(forest);
    this.setState({editing: false});
  }
  render() {
    let {
      forest, 
      forestDelete,
      forestUpdate,
    } = this.props;

    let contentJSX = 
    <div> 
      <h2>Name: {forest.name}</h2>
      <h2>Location: {forest.location}</h2>
    </div>;  
    let editingJSX = 
    <ForestForm forest={forest} onComplete={this.handleUpdate}/>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div onDoubleClick={() => this.setState({editing: true})} className='forest-item'>
        <button onClick={() => forestDelete(forest)}>X</button>
        {renderJSX}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  forestDelete: (data) => dispatch(forest.removeAction(data)),
  forestUpdate: (data) => dispatch(forest.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForestItem);