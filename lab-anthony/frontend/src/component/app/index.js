import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Dashboard from '../dashboard';
import './_app.scss';


class App extends React.Component{
  render(){
    return(
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
