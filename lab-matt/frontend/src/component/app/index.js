import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../dashboard/index';
import * as category from '../../action/category';


class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0" 
        />
        <BrowserRouter>
          <div>
            <nav>
              <Link to='/'> Home </Link>
            </nav>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }

  componentWillMount() {
    console.log('MOUNTING DATABASE');
    this.props.getCategories();
  }

}

let mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(category.getCategories()),
  };
};

export default connect(null, mapDispatchToProps)(App);